/**
 * MockProvider — Phase 05 implementation of AIProvider.
 *
 * Reads the mock response keyed off the task config's mockResponseId.
 * Adds a small simulated latency so the loading state has time to breathe.
 *
 * Phase 08 will replace this with an OpenAI or Anthropic adapter that
 * implements the same AIProvider interface. Consumers depend only on the
 * interface, never on this file directly.
 */

import type { AIProvider, AIRequest, AIResponse } from "./types";
import { getTaskBySlug } from "@/lib/tasks/config";
import { getMockResponse } from "@/lib/mocks/responses";

const SIMULATED_LATENCY_MS = 800;

export class MockProvider implements AIProvider {
  async generate(request: AIRequest): Promise<AIResponse> {
    const task = getTaskBySlug(request.taskSlug);
    if (!task) {
      throw new Error(`MockProvider: unknown task slug "${request.taskSlug}"`);
    }
    const response = getMockResponse(task.mockResponseId);
    if (!response) {
      throw new Error(
        `MockProvider: no mock response for "${task.mockResponseId}"`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
    return response;
  }
}

export const mockProvider: AIProvider = new MockProvider();
