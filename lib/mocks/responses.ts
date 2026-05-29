/**
 * Mock AI responses.
 *
 * Keyed by `mockResponseId` from lib/tasks/config.ts.
 * Each entry mirrors the final AI contract exactly (`AIResponse` from
 * lib/ai/types.ts), so Phase 8 swaps the data source behind the AIProvider
 * adapter without changing any consumer code.
 *
 * Voice rules (from docs/TONE_AND_PRINCIPLES.md "How AI speaks"):
 *   - Neutral, clear, calm, informative
 *   - Never coach, never flatter, never sound human-like
 *   - The product UI provides warmth; these responses provide clarity
 *
 * "ask-question-default" is populated verbatim from docs/golden_path_ask_question.md.
 * Other entries are drafts (user edits expected).
 */

import type { AIResponse } from "@/lib/ai/types";

export const MOCK_RESPONSES: Record<string, AIResponse> = {
  // ── Level 1 ───────────────────────────────────────────────────────────
  "get-ideas-default": {
    answer:
      "A small herb garden is a good starter project. Three simple options for a windowsill: basil grows quickly and is easy from seed. Mint is hardy but needs its own pot. Chives forgive most beginner mistakes. Pick one or two to start, and add more later.",
    aiHelpedBy: [
      "Narrowing a broad topic down to a few options",
      "Pointing out which choices are easiest for beginners",
      "Suggesting an order to try things in"
    ],
    considerChecking: [
      "How much sunlight your space actually gets",
      "Whether you have time to water regularly"
    ],
    nextStep: "Try asking the same question with a specific space in mind"
  },

  "ask-question-default": {
    answer:
      "LLMs (large language models) are AI systems trained on text. Chatbots are the interfaces people interact with. Think of the LLM as the engine, and the chatbot as the car.",
    aiHelpedBy: [
      "Breaking down a technical term into simpler language",
      "Using an analogy to explain a concept",
      "Comparing two related ideas"
    ],
    considerChecking: [
      "Whether another source explains it similarly",
      "Whether the definition has changed recently",
      "Whether the answer fully matches your situation"
    ],
    nextStep: "Try comparing this with a quick web search"
  },

  "write-greeting-default": {
    answer:
      "Happy birthday, [name]. Twelve is a big year. I hope it brings good books, late summers, and people who make you laugh. Thinking of you today. Love, [your name].",
    aiHelpedBy: [
      "Suggesting a short, personal opening line",
      "Picking warm words that don't feel exaggerated",
      "Leaving placeholders for the names"
    ],
    considerChecking: [
      "Whether the tone matches how you usually write",
      "Whether anything could be added that feels more like you"
    ],
    nextStep: "Try rewriting one sentence in your own voice"
  },

  "plan-event-or-trip-default": {
    answer:
      "A two-day weekend in a walkable city gives you about four meals and two long walks. A simple shape: Saturday morning coffee, a long afternoon walk, and a relaxed dinner. Sunday brunch, a museum or park, and a coffee before goodbye. Build around the meals. They'll be the easiest part to plan.",
    aiHelpedBy: [
      "Turning a broad idea into a day-by-day shape",
      "Picking anchors (meals, walks) to plan around",
      "Suggesting a calm pace rather than a packed schedule"
    ],
    considerChecking: [
      "Whether anyone has dietary needs or strong preferences",
      "How far you want to walk in a day",
      "What time you'd want to be home on Sunday"
    ],
    nextStep:
      "Try sharing this draft with your friends and see what they would change"
  },

  // ── Level 2 ───────────────────────────────────────────────────────────
  "write-first-email-default": {
    answer:
      "Hi [name], I hope you're well. I was looking at our meeting time for Thursday at 3pm and something has come up. Would Friday at the same time work for you instead? Let me know what suits. Thanks, [your name].",
    aiHelpedBy: [
      "Keeping the opening short and polite",
      "Stating the reason clearly without over-explaining",
      "Offering a specific alternative instead of leaving it open"
    ],
    considerChecking: [
      "Whether the new time actually works for you",
      "Whether to mention the reason for the change"
    ],
    nextStep: "Try editing the greeting to match how you usually write"
  },

  "explain-screenshot-default": {
    answer:
      "This looks like an error saying a program could not find a file it needs. The missing file is part of a toolkit some software uses. This usually means the program did not install fully, or part of it was deleted by accident.",
    aiHelpedBy: [
      "Reading the error message and naming what it is about",
      "Translating a technical filename into plain words",
      "Suggesting why it might be happening"
    ],
    considerChecking: [
      "Whether the program was recently installed or updated",
      "Whether reinstalling fixes it",
      "Whether the answer matches your version of the software"
    ],
    nextStep:
      "Try copying the file name into a search to see how others resolved it"
  },

  "understand-document-default": {
    answer:
      "This letter is from your bank asking you to confirm your address. They send these about once a year to keep their records correct. The deadline is at the bottom of the page. You can confirm online, by phone, or by sending the form back in the included envelope.",
    aiHelpedBy: [
      "Identifying the type of letter (a routine address check)",
      "Pointing out the deadline and what to look for",
      "Listing the ways you can respond"
    ],
    considerChecking: [
      "Whether the letter is really from your bank (compare with a phone number you already trust)",
      "Whether anything personal has changed since they last had your address"
    ],
    nextStep: "Try calling your bank using a number you already know"
  },

  "compare-products-default": {
    answer:
      "Both laptops are reasonable in this price range. The first has a faster processor but a smaller screen. The second has more memory and a longer battery, but is a little heavier. If you mostly write and browse, either works. If you carry it around a lot, the lighter one matters more than the faster one.",
    aiHelpedBy: [
      "Listing the two or three things that actually differ",
      "Connecting features to how you would use them",
      "Avoiding a strong recommendation so the choice stays yours"
    ],
    considerChecking: [
      "Reviews from people who use the laptop daily, not just on day one",
      "Whether either model has a known issue (battery life, screen flicker)",
      "What the return policy is"
    ],
    nextStep:
      "Try looking up each model alongside the word \"review\" to compare opinions"
  },

  "fact-check-default": {
    answer:
      "The claim that drinking lemon water detoxes your body is not supported by what we know about how the body works. Your liver and kidneys do that on their own. Lemon water can be a healthy habit for hydration and a small amount of vitamin C, but it does not remove toxins.",
    aiHelpedBy: [
      "Saying clearly which part of the claim is supported and which is not",
      "Pointing to how the body actually does this job",
      "Keeping the answer short and free of jargon"
    ],
    considerChecking: [
      "Whether the article cited a study or a source you can find",
      "Whether two or three other sources say something similar",
      "Who wrote the original article, and whether they sell something"
    ],
    nextStep: "Try searching for the source the article quoted, if there is one"
  }
};

export function getMockResponse(id: string): AIResponse | undefined {
  return MOCK_RESPONSES[id];
}
