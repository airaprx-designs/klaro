/**
 * Klaro behavioral capabilities.
 *
 * Source: docs/capability_map.md
 *
 * Capabilities are binary: a user either has earned a capability or has not.
 * Earning is idempotent (completing a task that teaches a capability the user
 * already has earns nothing new). Phase 9 owns the actual earning logic.
 *
 * Each capability carries two label variants because the wireframes use
 * different phrasings in different surfaces:
 *
 *   - reflectionLabel: shown on the in-task Reflection screen, in past-tense
 *     "you just practiced this" voice (e.g., "Asking clearly").
 *   - progressLabel: shown on the /progress page, as a held capability
 *     (e.g., "Asking AI clearly").
 */

export type CapabilityId =
  | "asking-clearly"
  | "reviewing-output"
  | "protecting-information"
  | "breaking-tasks-down"
  | "comparing-outputs"
  | "understanding-visuals"
  | "everyday-support";

export type Capability = {
  id: CapabilityId;
  reflectionLabel: string;
  progressLabel: string;
  description: string;
};

export const CAPABILITIES_BY_ID: Record<CapabilityId, Capability> = {
  "asking-clearly": {
    id: "asking-clearly",
    reflectionLabel: "Asking clearly",
    progressLabel: "Asking AI clearly",
    description:
      "Better AI responses come from clearer intent and context."
  },
  "reviewing-output": {
    id: "reviewing-output",
    reflectionLabel: "Reviewing what AI gave back",
    progressLabel: "Reviewing AI output",
    description:
      "AI responses should be reviewed, not accepted automatically."
  },
  "protecting-information": {
    id: "protecting-information",
    reflectionLabel: "Protecting your information",
    progressLabel: "Protecting information",
    description:
      "Not all personal information should be shared with AI."
  },
  "breaking-tasks-down": {
    id: "breaking-tasks-down",
    reflectionLabel: "Breaking it into smaller steps",
    progressLabel: "Breaking tasks down",
    description:
      "AI can help organize thinking step by step."
  },
  "comparing-outputs": {
    id: "comparing-outputs",
    reflectionLabel: "Comparing what you saw",
    progressLabel: "Comparing outputs",
    description:
      "Different prompts and sources can produce different answers."
  },
  "understanding-visuals": {
    id: "understanding-visuals",
    reflectionLabel: "Reading what AI saw",
    progressLabel: "Understanding visual information",
    description:
      "AI can help interpret images, but it can miss nuance."
  },
  "everyday-support": {
    id: "everyday-support",
    reflectionLabel: "Using AI as a helper",
    progressLabel: "Using AI for everyday support",
    description:
      "AI can assist with small real-world tasks without replacing your judgment."
  }
};

export const ALL_CAPABILITY_IDS: CapabilityId[] = Object.keys(
  CAPABILITIES_BY_ID
) as CapabilityId[];

export function getCapability(id: CapabilityId): Capability {
  return CAPABILITIES_BY_ID[id];
}
