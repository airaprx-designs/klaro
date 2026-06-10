/**
 * Task configuration.
 *
 * Tasks are config-driven. The /task/[taskSlug] route renders any task by slug.
 * Level 1 = lightest onboarding tasks (≤5 min, no "real task" framing).
 * Level 2 = broader MVP set, includes the first real-task experience and beyond.
 *
 * Phase 05 (Task Flow) consumes:
 *   - intentHeading, intentOptions, inputLabel, inputPlaceholder for Step 1
 *   - DEFAULT_PRIVACY_CHECKLIST (or per-task override) for Step 2
 *   - requiresUpload to decide whether to insert Upload + Redact steps
 *   - mockResponseId to look up the AI response in lib/mocks/responses.ts
 *   - capabilitiesEarned for the Reflection screen
 *
 * Phase 09 (Progress refinement) consumes:
 *   - reflectionItems to render the "Recently tried" card on /progress
 *     with task-specific reflection moments
 *
 * "Ask a question" is populated from docs/golden_path_ask_question.md.
 * Other tasks follow the same shape with draft content (user edits expected).
 */

import type { CapabilityId } from "@/lib/capabilities";

export type TaskLevel = 1 | 2;

export type IntentOption = {
  id: string;
  label: string;
  /**
   * Optional concrete example prompts for this intent. When set, IntentStep
   * renders them as a "For example:" hint block below the textarea after the
   * user picks this intent. Used to broaden what users imagine they can ask.
   */
  examples?: string[];
};

/**
 * A task-specific reflection moment surfaced on /progress under
 * "You've recently tried:". Each task defines 3 of these. They are
 * descriptive moments, separate from the binary capability tracking.
 */
export type ReflectionItem = {
  label: string;   // short capability-style name, e.g. "Asking with intent"
  moment: string;  // what the user did, e.g. "You decided what kind of question to ask"
};

export type TaskConfig = {
  slug: string;
  level: TaskLevel;
  title: string;
  shortDescription: string;        // wireframe tagline shown on TaskCard / TaskRow
  description?: string;            // longer description surfaced on TodaysTaskHero
  estimatedMinutes: number;        // duration shown on TaskCard

  // Step 1 — Intent
  intentHeading: string;
  intentOptions: IntentOption[];
  inputLabel: string;
  inputPlaceholder: string;

  // Step 2 — Review before sharing (optional override)
  privacyChecklistOverrides?: string[];

  // Steps 3 + 4 are inserted only when requiresUpload is true
  requiresUpload: boolean;

  // Step 6 — Reflection (binary capabilities earned on completion)
  capabilitiesEarned: CapabilityId[];

  // Surfaced on /progress as "You've recently tried:" — 3 items each
  reflectionItems: ReflectionItem[];

  // Step 5 — AI call (mocked in Phase 5, real in Phase 8)
  mockResponseId: string;
};

/**
 * Default 5-item privacy checklist (per docs/golden_path_ask_question.md).
 * A task can replace this with `privacyChecklistOverrides`.
 */
export const DEFAULT_PRIVACY_CHECKLIST = [
  "Your home address",
  "Passwords or PIN numbers",
  "ID numbers (passport, SSN, etc.)",
  "Photos with personal information",
  "Signatures"
];

export const TASKS: TaskConfig[] = [
  // ── Level 1 — Onboarding ────────────────────────────────────────────────
  {
    slug: "get-ideas",
    level: 1,
    title: "Get ideas",
    shortDescription: "Start with a blank page",
    description:
      "When you have something to try but don't know where to start, AI can sketch out a handful of directions. You pick the one that feels right.",
    estimatedMinutes: 3,
    intentHeading: "What do you need ideas for?",
    intentOptions: [
      { id: "make-or-write", label: "Something I want to make or write" },
      { id: "decision", label: "A decision I'm thinking about" },
      { id: "try-something", label: "Something I want to try" }
    ],
    inputLabel: "Tell us a little about it",
    inputPlaceholder:
      "I want to start a small herb garden but don't know where to begin.",
    requiresUpload: false,
    capabilitiesEarned: ["breaking-tasks-down"],
    reflectionItems: [
      {
        label: "Asking for options",
        moment: "You asked AI for several ideas instead of one answer"
      },
      {
        label: "Narrowing focus",
        moment: "You picked something concrete to start with"
      },
      {
        label: "Building momentum",
        moment: "You let AI suggest a way to begin"
      }
    ],
    mockResponseId: "get-ideas-default"
  },
  {
    slug: "ask-question",
    level: 1,
    title: "Ask a question",
    shortDescription: "Start by asking something simple",
    description:
      "Ask AI a simple question and notice how it thinks through the answer with you. A calm first look at what AI is actually useful for.",
    estimatedMinutes: 3,
    intentHeading: "What kind of question?",
    intentOptions: [
      { id: "new-topic", label: "About a topic I'm new to" },
      { id: "something-read", label: "About something I read" },
      { id: "decision", label: "About a decision I need to make" }
    ],
    inputLabel: "What's your question?",
    inputPlaceholder:
      "What's the difference between chatbots and AI assistants?",
    requiresUpload: false,
    capabilitiesEarned: [
      "asking-clearly",
      "reviewing-output",
      "protecting-information"
    ],
    reflectionItems: [
      {
        label: "Asking with intent",
        moment: "You decided what kind of question to ask"
      },
      {
        label: "Reviewing carefully",
        moment: "You read what AI said instead of accepting it right away"
      },
      {
        label: "Protecting privacy",
        moment: "You checked your question before sending it"
      }
    ],
    mockResponseId: "ask-question-default"
  },
  {
    slug: "write-greeting",
    level: 1,
    title: "Write a greeting",
    shortDescription: "Create something together",
    description:
      "Write a quick note — a card, a message, an introduction — with a little help. You set the tone; AI helps with the words.",
    estimatedMinutes: 5,
    intentHeading: "Who's the greeting for?",
    intentOptions: [
      { id: "friend-family", label: "A friend or family member" },
      { id: "work", label: "Someone at work" },
      { id: "community", label: "An organisation or community" }
    ],
    inputLabel: "What's the greeting for?",
    inputPlaceholder:
      "A birthday card for my niece who is turning 12.",
    requiresUpload: false,
    capabilitiesEarned: ["everyday-support"],
    reflectionItems: [
      {
        label: "Setting the tone",
        moment: "You told AI who the greeting was for"
      },
      {
        label: "Editing for voice",
        moment: "You adjusted the draft to sound like you"
      },
      {
        label: "Keeping it personal",
        moment: "You replaced the placeholders with real names"
      }
    ],
    mockResponseId: "write-greeting-default"
  },
  {
    slug: "plan-event-or-trip",
    level: 1,
    title: "Plan an event or trip",
    shortDescription: "Turn ideas into a simple plan",
    description:
      "Turn loose thoughts about an event or trip into a clear, simple plan. AI sorts the parts; you decide what matters.",
    estimatedMinutes: 5,
    intentHeading: "What are you planning?",
    intentOptions: [
      { id: "get-together", label: "A small get-together" },
      { id: "day-out", label: "A day out" },
      { id: "short-trip", label: "A short trip" }
    ],
    inputLabel: "Tell us a little about it",
    inputPlaceholder:
      "A weekend with two friends, mostly walking and eating.",
    requiresUpload: false,
    capabilitiesEarned: ["breaking-tasks-down", "everyday-support"],
    reflectionItems: [
      {
        label: "Breaking it down",
        moment: "You let AI turn an idea into a few simple steps"
      },
      {
        label: "Anchoring the plan",
        moment: "You used meals or moments as the structure"
      },
      {
        label: "Leaving room",
        moment: "You kept the plan flexible enough to change"
      }
    ],
    mockResponseId: "plan-event-or-trip-default"
  },

  // ── Level 2 — Broader MVP ───────────────────────────────────────────────
  {
    slug: "write-first-email",
    level: 2,
    title: "Write your first email",
    shortDescription: "Use AI on a real task",
    description:
      "Draft an email you've been meaning to send. Tell AI the situation and the result you'd like, and edit what comes back.",
    estimatedMinutes: 8,
    intentHeading: "What kind of email?",
    intentOptions: [
      { id: "reply", label: "A reply to something" },
      { id: "request", label: "An ask or request" },
      { id: "update", label: "A short update" }
    ],
    inputLabel: "What's the email for?",
    inputPlaceholder:
      "I need to reschedule a meeting with my landlord.",
    requiresUpload: false,
    capabilitiesEarned: ["protecting-information", "everyday-support"],
    reflectionItems: [
      {
        label: "Understanding context",
        moment: "You told AI what kind of email response was needed"
      },
      {
        label: "Protecting privacy",
        moment: "You reviewed what information to share"
      },
      {
        label: "Editing for voice",
        moment: "You adjusted the draft to sound like you"
      }
    ],
    mockResponseId: "write-first-email-default"
  },
  {
    slug: "understand-image",
    level: 2,
    title: "Understand an image",
    shortDescription: "Understand what you're seeing",
    description:
      "Share an image — a photo, a screenshot, a sign, a label, a receipt — and AI will explain what's there in plain language.",
    estimatedMinutes: 5,
    intentHeading: "What kind of image?",
    intentOptions: [
      {
        id: "photo",
        label: "A photo I took",
        examples: [
          "What kind of flower is this?",
          "What does this sign mean?",
          "Is this fruit ripe?"
        ]
      },
      {
        id: "screen",
        label: "Something on my screen",
        examples: [
          "Why am I seeing this message?",
          "What does this button do?",
          "How can I fix this error?"
        ]
      },
      {
        id: "notice",
        label: "A message or notice",
        examples: [
          "Can you explain what this says?",
          "What action do I need to take?",
          "Is anything important here?"
        ]
      }
    ],
    inputLabel: "What would you like AI to explain?",
    inputPlaceholder: "Ask about what you see in the image.",
    requiresUpload: true,
    capabilitiesEarned: [
      "asking-clearly",
      "protecting-information",
      "understanding-visuals"
    ],
    reflectionItems: [
      {
        label: "Asking with context",
        moment: "You described what kind of image you were sharing"
      },
      {
        label: "Covering details",
        moment: "You hid anything personal in the image"
      },
      {
        label: "Reading visually",
        moment: "You checked whether AI noticed the right things"
      }
    ],
    mockResponseId: "understand-image-default"
  },
  {
    slug: "understand-document",
    level: 2,
    title: "Understand a document",
    shortDescription: "Use AI on a real task",
    description:
      "When a document is long or full of jargon, AI can summarise what it says and what it might mean for you.",
    estimatedMinutes: 8,
    intentHeading: "What kind of document?",
    intentOptions: [
      { id: "letter", label: "A letter or notice" },
      { id: "form", label: "A form or application" },
      { id: "terms", label: "Instructions or terms" }
    ],
    inputLabel: "What would you like AI to help with?",
    inputPlaceholder:
      "Explain what this letter from my bank is asking me to do.",
    requiresUpload: true,
    capabilitiesEarned: [
      "asking-clearly",
      "reviewing-output",
      "protecting-information"
    ],
    reflectionItems: [
      {
        label: "Asking for clarity",
        moment: "You asked AI to help you read between the lines"
      },
      {
        label: "Reviewing carefully",
        moment: "You compared what AI said to the original"
      },
      {
        label: "Protecting privacy",
        moment: "You covered any sensitive details first"
      }
    ],
    mockResponseId: "understand-document-default"
  },
  {
    slug: "compare-products",
    level: 2,
    title: "Compare products",
    shortDescription: "Look beyond the first answer",
    description:
      "Weighing two products or two options? AI can lay out the differences side by side. You make the call.",
    estimatedMinutes: 7,
    intentHeading: "What are you comparing?",
    intentOptions: [
      { id: "side-by-side", label: "Two things side by side" },
      { id: "price-tiers", label: "Options at different prices" },
      { id: "old-vs-new", label: "Newer vs. older versions" }
    ],
    inputLabel: "What would you like to compare?",
    inputPlaceholder:
      "Two laptops in my price range. What should I think about?",
    requiresUpload: false,
    capabilitiesEarned: ["reviewing-output", "comparing-outputs"],
    reflectionItems: [
      {
        label: "Looking side by side",
        moment: "You asked AI to compare two options"
      },
      {
        label: "Looking beyond the first answer",
        moment: "You considered details specific to you"
      },
      {
        label: "Checking other sources",
        moment: "You thought about looking elsewhere too"
      }
    ],
    mockResponseId: "compare-products-default"
  },
  {
    slug: "fact-check",
    level: 2,
    title: "Fact-check information",
    shortDescription: "Practice healthy skepticism",
    description:
      "Heard something that sounded a bit off? Use AI to look into it and decide for yourself how much weight to give it.",
    estimatedMinutes: 5,
    intentHeading: "Where did you read this?",
    intentOptions: [
      { id: "social", label: "Social media" },
      { id: "news", label: "A news article" },
      { id: "told", label: "Something someone told me" }
    ],
    inputLabel: "What would you like to check?",
    inputPlaceholder:
      "A claim I read about food and health.",
    requiresUpload: false,
    capabilitiesEarned: ["reviewing-output", "comparing-outputs"],
    reflectionItems: [
      {
        label: "Asking for evidence",
        moment: "You asked AI what supports the claim"
      },
      {
        label: "Comparing sources",
        moment: "You thought about who said it and where"
      },
      {
        label: "Reading skeptically",
        moment: "You looked for what was missing too"
      }
    ],
    mockResponseId: "fact-check-default"
  }
];

export function getTaskBySlug(slug: string): TaskConfig | undefined {
  return TASKS.find((t) => t.slug === slug);
}

export function getTasksByLevel(level: TaskLevel): TaskConfig[] {
  return TASKS.filter((t) => t.level === level);
}

export function getPrivacyChecklist(task: TaskConfig): string[] {
  return task.privacyChecklistOverrides ?? DEFAULT_PRIVACY_CHECKLIST;
}
