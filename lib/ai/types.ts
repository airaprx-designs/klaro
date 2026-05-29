/**
 * Provider-agnostic AI adapter interface.
 *
 * - Phase 05 ships a MockProvider implementing this interface.
 * - Phase 08 adds OpenAI or Anthropic adapters behind the same interface (TBD).
 * - Consumers (UI components, flow code) never import a concrete provider.
 *   They depend on `AIProvider` only.
 *
 * The response shape mirrors the final AI contract exactly, so swapping the
 * provider in Phase 08 changes no consumer code.
 */

export type AIRequest = {
  taskSlug: string;
  intent: string;
  userInput: string;
  attachments?: Array<{ kind: "image"; dataUrl: string }>;
  // Phase 11: read from preferences.explanationDepth so AI replies match
  // the user's saved verbosity preference. Mock provider ignores; the
  // Anthropic route adjusts its system prompt accordingly.
  explanationDepth?: "brief" | "standard" | "in-depth";
};

export type AIResponse = {
  answer: string;
  aiHelpedBy: string[];
  considerChecking: string[];
  nextStep: string;
};

export interface AIProvider {
  generate(request: AIRequest): Promise<AIResponse>;
}
