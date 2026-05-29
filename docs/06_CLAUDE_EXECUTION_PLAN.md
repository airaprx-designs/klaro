# KLARO — Claude Execution Plan

Version: 1.0

Purpose:

Guide Claude (or Cursor) through building Klaro incrementally.

This document defines:

- build order
- prompts
- review points
- constraints

Do not skip phases.

---

# Collaboration Rules

Claude is a collaborator.

Not the product owner.

If unclear:

Ask.

Do not invent.

Do not expand scope.

Always prioritize:

00_BUILD_BRIEF.md

↓

PRD

↓

Brand Guidelines

---

# Build Principles

Priority Order:

1. Structure
2. Flows
3. Accessibility
4. Visual Polish
5. Animation

Never reverse.

---

# Workflow

Every phase follows:

Plan

↓

Build

↓

Review

↓

Approve

↓

Continue

---

# Phase 01 — Project Setup

Goal:

Create project structure.

Prompt:

Read:

00_BUILD_BRIEF.md

05_BRAND_GUIDELINES.md

Create:

- project structure
- routes
- placeholders

Do not implement AI.

Do not style.

Output:

Running app.

Success Criteria:

Routes exist.

Navigation works.

STOP.

Wait for approval.

---

# Phase 02 — Core Navigation

Goal:

Build application shell.

Prompt:

Implement:

/

/task

/review

/progress

/settings

Requirements:

- responsive
- placeholders
- no API

Success Criteria:

User can navigate.

STOP.

Wait.

---

# Phase 03 — Design Tokens

Goal:

Implement visual system.

Prompt:

Read:

05_BRAND_GUIDELINES.md

Create:

- color tokens
- typography tokens
- spacing
- radius

Apply globally.

Do not build components.

Success Criteria:

Theme established.

STOP.

Wait.

---

# Phase 04 — Components

Goal:

Build reusable components.

Build:

CoachCard

TaskCard

AIResult

ReflectionCard

ProgressCard

UploadPreview

RedactionCanvas

Requirements:

No business logic.

Visual only.

Success Criteria:

Components isolated.

STOP.

Wait.

---

# Phase 05 — Task Flow

Goal:

Build guided experience.

Implement:

Task

↓

Intent

↓

Privacy

↓

Upload

↓

Review

↓

Result

↓

Reflection

Use:

Mock responses.

No AI.

Success Criteria:

Complete flow.

STOP.

Wait.

---

# Phase 06 — Local Storage

Goal:

Persist state.

Store:

preferences

capabilities

onboarding

recentTasks

Do NOT store:

uploads

responses

history

Success Criteria:

Refresh persists.

STOP.

Wait.

---

# Phase 07 — Upload Flow

Goal:

Build privacy experience.

Implement:

Upload

↓

Preview

↓

Cover private info

↓

Confirm

Build:

rectangle overlays only.

No OCR.

No detection.

Success Criteria:

Redaction works.

STOP.

Wait.

---

# Phase 08 — AI Integration

Goal:

Connect real AI.

Requirements:

Use structured output.

Return:

{
answer,
aiHelpedBy,
considerChecking,
nextStep
}

Success Criteria:

End-to-end.

STOP.

Wait.

---

# Phase 09 — Reflection + Progress

Goal:

Update capability model.

Implement:

Reflection

↓

Capability updates

↓

Progress page

Avoid:

- gamification
- XP
- levels

Success Criteria:

Capability updates visible.

STOP.

Wait.

---

# Phase 10 — Accessibility Pass

Goal:

Validate usability.

Check:

- typography
- spacing
- contrast
- reading mode

Success Criteria:

Accessible.

STOP.

Wait.

---

# Phase 11 — Polish

Goal:

Introduce subtle motion.

Allowed:

- fade
- reveal
- gentle transitions

Avoid:

- bounce
- parallax
- sparkle

Success Criteria:

Feels calm.

STOP.

Wait.

---

# Review Checklist

Before approving each phase:

Ask:

1. Is this aligned to PRD?

2. Is this buildable?

3. Does this reduce confidence?

4. Does this feel calm?

5. Is there unnecessary complexity?

---

# Recovery Prompt

If Claude drifts:

Prompt:

Stop.

Re-read:

00_BUILD_BRIEF.md

Return to existing requirements.

Do not introduce new features.

---

# Final Prompt

When MVP is complete:

Generate:

- README
- setup instructions
- architecture summary
- future improvements

Do not redesign.

Do not expand scope.