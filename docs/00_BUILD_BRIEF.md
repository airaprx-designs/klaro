# KLARO — Lean Build Brief

Version: 1.0

Read this file first.

If requirements are unclear, consult:
docs/01_PRD_Product_Foundation.md
docs/02_PRD_Experience_and_Flows.md
docs/03_PRD_Technical_and_Build.md
docs/04_PRD_Future_and_Risks.md

Do not invent functionality outside those files.

---

# Project Goal

Build a responsive MVP of Klaro.

Klaro helps adults who are new to AI build confidence through guided everyday tasks.

The product should feel:

- calm
- modern
- clear
- supportive

NOT:

- playful
- robotic
- overwhelming
- corporate

---

# Product Principles

Always prioritize:

1. Clarity over capability
2. Guide before freedom
3. Reflection over completion
4. Explain before trust
5. Comfortable accessibility
6. Protect before processing
7. Intent before input

---

# Technical Stack

Frontend:
Next.js

Language:
TypeScript

Styling:
Tailwind

Animation:
Framer Motion (minimal)

State:
React state + localStorage

No database.

No authentication.

No backend persistence.

---

# Build Scope

Build ONLY these routes.

```text
/
Home

/task
Guided Task

/review
AI Result

/progress
Capability Progress

/settings
Preferences
```

---

# Core Experience

User should never see a blank AI chat.

Interaction:

Task

↓

Intent

↓

Privacy Reminder

↓

Upload (optional)

↓

Cover Private Information

↓

AI

↓

Review

↓

Reflection

---

# MVP Tasks

Build these examples:

1. Write your first email

2. Explain a screenshot

3. Understand a document

4. Compare products

5. Fact-check information

Tasks can use mock data initially.

Structure must support real AI later.

---

# Screen Requirements

## Home

Display:

- welcome coach
- suggested tasks
- progress preview

No dashboards.

No statistics.

---

## Task

Display:

- selected task
- guidance questions
- intent selection

No prompt box.

---

## Privacy Reminder

Display:

Message:

Share only information relevant to your question.

Checklist:

- address
- passwords
- IDs
- signatures

CTA:

Continue

---

## Upload Screen

Support:

- image upload
- screenshot upload

Include:

RedactionCanvas

Capabilities:

- draw cover blocks
- resize
- remove
- preview

Do not build OCR.

Do not edit PDFs.

---

## AI Result

Display sections:

Answer

↓

AI Helped By

↓

Consider Checking

↓

Suggested Next Step

---

## Reflection

Display:

Today you practiced:

- Asking clearly
- Reviewing outputs
- Protecting information

Avoid:

- levels
- XP
- achievements

---

## Progress

Display:

You can now:

- Explain screenshots
- Review AI
- Compare responses

No percentages.

No streaks.

---

## Settings

Allow:

- text size
- spacing
- explanation depth

Persist locally.

---

# Local Storage

Store only:

```ts
preferences
capabilities
onboarding
recentTasks
```

Never store:

- uploads
- prompts
- AI outputs
- conversations

---

# Accessibility

Minimum:

Body:
18px

Touch:
44px

Line Height:
150–170%

No auto-dismiss.

No hidden actions.

---

# Visual Direction

Brand:
Klaro

Tagline:
Confidence through clarity.

Style:

Quiet Intelligence

+
Structured Guidance

Palette:

Warm White

Trust Blue

Warm Amber

Typography:

Brand:
Sora OR Manrope

Product:
Inter

Logo:

Emergent Clarity

(circle reveal)

Avoid:

- AI sparkles
- glassmorphism
- neon
- excessive gradients

---

# AI Requirements

Use structured responses.

Response shape:

```ts
{
 answer,
 aiHelpedBy,
 considerChecking,
 nextStep
}
```

Tone:

- calm
- concise
- transparent

Never:

- overconfident
- emotional
- human-like

---

# Build Priorities

Priority 1

Structure

Priority 2

Flow

Priority 3

Visual polish

Priority 4

Animation

---

# Definition of Done

User can:

- complete one task
- upload image
- redact information
- receive AI answer
- understand what AI did
- finish reflection

All within:

10 minutes