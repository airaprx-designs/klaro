import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getTaskBySlug } from "@/lib/tasks/config";
import type { AIRequest, AIResponse } from "@/lib/ai/types";

/**
 * POST /api/ai/generate
 *
 * Server-side bridge to Anthropic Claude. The API key never leaves this
 * environment — the client adapter (lib/ai/anthropic-provider.ts) only
 * makes a fetch to this route.
 *
 * Structured output is enforced via Claude's tool-use mechanism: we
 * declare a single tool whose input schema is the AIResponse shape, and
 * force the model to use it (`tool_choice: { type: "tool", name: ... }`).
 * The four sections come back as a typed object, not free-form text we
 * have to parse.
 */

export const runtime = "nodejs";

// Anthropic retired the claude-3-5-sonnet-* aliases. Pin to the current
// Sonnet 4.6 model. To downgrade for cost (Klaro's responses are short),
// swap to "claude-haiku-4-5-20251001".
const MODEL = "claude-sonnet-4-6";

const STRUCTURED_RESPONSE_TOOL: Anthropic.Messages.Tool = {
  name: "klaro_response",
  description:
    "Return your response to the user in the four-section Klaro format.",
  input_schema: {
    type: "object",
    properties: {
      answer: {
        type: "string",
        description:
          "The clear, calm, plain-language answer. 3 to 5 short sentences. No jargon. No hype."
      },
      aiHelpedBy: {
        type: "array",
        items: { type: "string" },
        description:
          "Exactly 3 short statements describing what you did to help. Each at most 12 words. Plain English."
      },
      considerChecking: {
        type: "array",
        items: { type: "string" },
        description:
          "2 or 3 things the user might want to verify or compare. Frame as awareness, not distrust. Each at most 14 words."
      },
      nextStep: {
        type: "string",
        description:
          "One concrete next thing to try. Encourages thoughtful continuation."
      }
    },
    required: ["answer", "aiHelpedBy", "considerChecking", "nextStep"]
  }
};

const SYSTEM_PROMPT = `You are the AI inside Klaro, a product that helps adults who are new to AI build confidence through small, guided everyday tasks.

You speak in a neutral, calm, informative voice. You do NOT sound like a coach, friend, teacher, or productivity assistant. You do NOT flatter, joke, encourage, or sound human-like. The product UI provides the warmth; you provide the substance.

You always respond by calling the klaro_response tool. The four fields each have a purpose:

- answer: A clear, plain-language response. Avoid jargon. Avoid being overly conversational. Use analogies sparingly when they aid understanding. Aim for 3 to 5 short sentences.

- aiHelpedBy: Three short statements describing what you did to help, in plain English not technical terms. Examples: "Breaking down a technical term into simpler language", "Using an analogy to explain a concept", "Comparing two related ideas". Each at most 12 words.

- considerChecking: Two or three things the user might want to verify or compare. Frame as awareness, not warnings or distrust. Examples: "Whether another source explains it similarly", "Whether the answer fully matches your situation". Each at most 14 words.

- nextStep: One concrete, action-oriented suggestion. Encourages thoughtful continuation, not endless prompting. Example: "Try comparing this with a quick web search".

Avoid: em dashes, exclamation marks, hype words (unlock, master, magical, exciting, dive in), AI marketing language, productivity framing.`;

const DEPTH_INSTRUCTIONS: Record<string, string> = {
  brief:
    "User prefers brief responses. Keep the answer to 2 short sentences. Skip analogies. The aiHelpedBy and considerChecking lists stay the same length.",
  standard:
    "User prefers standard depth. Use 3 to 5 sentences for the answer, with analogies sparingly.",
  "in-depth":
    "User prefers in-depth responses. Use up to 6 sentences for the answer. Include an analogy if it aids understanding. Still avoid jargon."
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "ANTHROPIC_API_KEY is not configured. Add it to your .env.local."
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as AIRequest;
    const task = getTaskBySlug(body.taskSlug);
    if (!task) {
      return NextResponse.json(
        { error: `Unknown task: ${body.taskSlug}` },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey });

    // Build the user message. Mix text + (optionally) image content blocks.
    //
    // SDK 0.27 does not export a `ContentBlockParam` union; the union lives
    // inline inside `MessageParam.content`. We only push text and image
    // blocks here, so we type the array as just those two members — both
    // are exported by `Anthropic.Messages`.
    type UserContentBlock =
      | Anthropic.Messages.TextBlockParam
      | Anthropic.Messages.ImageBlockParam;
    const userContent: UserContentBlock[] = [];

    userContent.push({
      type: "text",
      text: `Task: ${task.title}
Intent: ${body.intent || "(not specified)"}

User input:
${body.userInput}`
    });

    if (body.attachments?.length) {
      for (const att of body.attachments) {
        if (att.kind !== "image") continue;
        const match = att.dataUrl.match(/^data:(image\/(?:png|jpeg));base64,(.+)$/);
        if (!match) continue;
        userContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: match[1] as "image/png" | "image/jpeg",
            data: match[2]
          }
        });
      }
    }

    const depthInstruction =
      DEPTH_INSTRUCTIONS[body.explanationDepth ?? "standard"] ??
      DEPTH_INSTRUCTIONS.standard;
    const systemPrompt = `${SYSTEM_PROMPT}\n\n${depthInstruction}`;

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      tools: [STRUCTURED_RESPONSE_TOOL],
      tool_choice: { type: "tool", name: "klaro_response" },
      messages: [{ role: "user", content: userContent }]
    });

    const toolUse = response.content.find(
      (block): block is Anthropic.Messages.ToolUseBlock =>
        block.type === "tool_use"
    );
    if (!toolUse) {
      return NextResponse.json(
        { error: "AI response missing the expected tool-use block." },
        { status: 502 }
      );
    }

    const parsed = toolUse.input as Partial<AIResponse>;
    if (
      typeof parsed.answer !== "string" ||
      !Array.isArray(parsed.aiHelpedBy) ||
      !Array.isArray(parsed.considerChecking) ||
      typeof parsed.nextStep !== "string"
    ) {
      return NextResponse.json(
        { error: "AI response had an unexpected shape." },
        { status: 502 }
      );
    }

    const aiResponse: AIResponse = {
      answer: parsed.answer,
      aiHelpedBy: parsed.aiHelpedBy.filter(
        (s): s is string => typeof s === "string"
      ),
      considerChecking: parsed.considerChecking.filter(
        (s): s is string => typeof s === "string"
      ),
      nextStep: parsed.nextStep
    };

    return NextResponse.json(aiResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("AI route error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
