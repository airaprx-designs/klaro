import type { AIProvider, AIRequest, AIResponse } from "./types";

/**
 * AnthropicProvider — client-side adapter for real AI.
 *
 * This adapter never touches the Anthropic API directly. It calls our own
 * server route at `/api/ai/generate`, which holds the API key and makes
 * the upstream call. So `ANTHROPIC_API_KEY` never reaches the browser
 * bundle.
 *
 * Implements the same `AIProvider` interface as `MockProvider`, so swapping
 * between mock and real is a one-line change in `lib/ai/provider.ts`.
 */
export class AnthropicProvider implements AIProvider {
  async generate(request: AIRequest): Promise<AIResponse> {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });

    if (!res.ok) {
      let detail = "";
      try {
        const data = (await res.json()) as { error?: string };
        detail = data.error ?? "";
      } catch {
        detail = await res.text().catch(() => "");
      }
      throw new Error(
        `AI request failed (${res.status})${detail ? `: ${detail}` : ""}`
      );
    }

    return (await res.json()) as AIResponse;
  }
}

export const anthropicProvider: AIProvider = new AnthropicProvider();
