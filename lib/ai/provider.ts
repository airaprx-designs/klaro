/**
 * Active AI provider.
 *
 * Consumers (UI components, flow code) import `provider` from here and
 * depend on the `AIProvider` interface — never on a concrete implementation.
 *
 * Selection is driven by `NEXT_PUBLIC_AI_PROVIDER`:
 *   - "anthropic" → real provider (calls /api/ai/generate)
 *   - anything else (default) → MockProvider, no API key needed
 *
 * The env var is `NEXT_PUBLIC_` so it's available in the client bundle.
 * The actual `ANTHROPIC_API_KEY` stays server-side (read inside the route).
 */

import type { AIProvider } from "./types";
import { mockProvider } from "./mock-provider";
import { anthropicProvider } from "./anthropic-provider";

const PROVIDER_NAME = process.env.NEXT_PUBLIC_AI_PROVIDER ?? "mock";

export const provider: AIProvider =
  PROVIDER_NAME === "anthropic" ? anthropicProvider : mockProvider;
