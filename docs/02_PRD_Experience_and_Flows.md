# KLARO — Product Requirement Document (PRD)

Version: 0.2  
Section: Experience and Flows

---

# 07. MVP Scope

## MUST HAVE

### Guided Coach

Task-led onboarding.

Users should never face a blank AI interface.

---

### Task Cards

Structured entry points.

Examples:

- Write your first email
- Explain a screenshot
- Understand a document
- Compare products
- Fact-check information

---

### Guided AI Interaction

Flow:

Intent

↓

Prepare

↓

Upload (optional)

↓

AI

↓

Review

↓

Reflect

---

### Upload Screenshot

Support screenshots and images.

---

### Upload Document

Support document understanding.

MVP implementation:
document preview or screenshot workflow.

---

### Explain AI Help

Do not expose prompts.

Show:

Examples:

- AI organized information
- AI suggested wording
- AI summarized content

---

### Adaptive Reading Mode

User controls:

- text size
- density
- pacing
- explanation detail

---

## SHOULD HAVE

### Capability Progress

Track:

What users can now do.

Examples:

- Explain screenshots
- Review outputs
- Compare information

---

### AI Confidence Indicator

Examples:

- High confidence
- Double-check recommended

---

### Free Chat Mode

Unlocked later.

---

## NICE TO HAVE

### Daily Challenges

---

### Voice Input

---

### Voice Output

---

# 08. Experience Principles

These principles govern all product decisions.

---

## Principle 01

### Clarity over capability

Do not show everything AI can do.

Show what helps.

Implications:

- limited choices
- reduced cognitive load

Avoid:

- feature overload
- blank chat

---

## Principle 02

### Guide before freedom

Users receive support before independent use.

Implications:

- task cards
- coach prompts
- recommendations

Avoid:

- empty interfaces

---

## Principle 03

### Reflection over completion

Success means understanding.

Not task completion.

Implications:

- capability updates
- reflection moments

Avoid:

- streaks
- gamification

---

## Principle 04

### Explain before trust

AI remains visible.

Implications:

- explanation layer
- confidence indicators

Avoid:

- black-box outputs

---

## Principle 05

### Comfortable accessibility

Readable without feeling clinical.

Implications:

- adaptive reading
- larger defaults
- strong hierarchy

Avoid:

- tiny UI
- visual noise

---

## Principle 06

### Protect before processing

Help users review and control information before AI interaction.

Privacy should feel supportive.

Avoid:

- fear messaging
- forced privacy education

---

# 09. Functional Requirements

---

## FR-01 — Task Selection

User can:

- view suggested tasks
- browse all tasks
- start without login

Output:

Coach flow begins.

---

## FR-02 — Guided Coach

System asks contextual questions.

Examples:

Write email:

- Who is this for?

Understand document:

- What would you like help understanding?

Compare:

- What matters most?

---

## FR-03 — Intent Before Input

Required before uploads.

Flow:

Goal

↓

Upload

↓

AI

Examples:

- Summarize
- Explain
- Compare
- Extract

---

## FR-04 — Upload Preparation

Purpose:

Encourage intentional sharing.

Flow:

Intent

↓

Privacy Reminder

↓

Upload

↓

Review & Cover Private Information

↓

Confirm

↓

AI Processing

---

### Privacy Reminder

Consider hiding:

- address
- IDs
- passwords
- signatures
- account details
- medical information

Message:

Share only information relevant to your question.

---

### Cover Private Information

After upload:

Users can manually cover sensitive areas.

Supported:

- draw cover blocks
- resize
- remove
- preview

Output:

Sanitized image only.

---

MVP Supports:

- screenshots
- images

MVP Does Not Support:

- editable PDF redaction
- OCR editing
- automatic detection

Workaround:

Upload document screenshots.

---

## FR-05 — AI Processing

Input:

Task

+

Intent

+

Sanitized Upload (optional)

↓

AI

↓

Response

Requirements:

- concise
- editable
- readable
- privacy-aware

System must never process hidden areas.

---

## FR-06 — Explain AI Help

After result:

Show:

Example:

AI helped by:

- organizing information
- suggesting wording

Do NOT expose prompts.

---

## FR-07 — Reflection

After completion:

Display:

Today you practiced:

- Asking clearly
- Reviewing outputs
- Protecting information

---

## FR-08 — Capability Progress

Track:

Can now:

- Explain screenshots
- Review outputs
- Compare responses

---

## FR-09 — Adaptive Reading Mode

User controls:

- text size
- spacing
- pacing
- explanation detail

---

## FR-10 — Free Chat

Version 2 feature.

Unlocked after guided usage.

---

# 10. Information Architecture

Home

- Suggested Tasks
- Explore Tasks
- Capability Progress
- Settings

Task

- Intent
- Privacy Reminder
- Upload
- Cover Private Information
- Confirm Upload
- AI Result
- AI Explanation
- Reflection

Profile

- Reading Preferences
- Privacy
- Accessibility

---

Navigation

- Home
- Progress
- Settings

No:

- Library
- Community
- Explore tab

---

# 11. User Flows

## Flow 01 — Write Email

Home

↓

Task

↓

Coach

↓

AI

↓

Edit

↓

Explain

↓

Reflect

---

## Flow 02 — Understand Document

Home

↓

Goal

↓

Privacy Reminder

↓

Upload

↓

Cover Private Information

↓

AI

↓

Review

↓

Reflect

---

## Flow 03 — Free Chat (v2)

Home

↓

Unlock

↓

Chat

↓

Review

---

# Locked Decisions

- No blank chat
- No saved sessions
- No gamification
- No streaks
- Capabilities over achievements
- Web-first
- Privacy-first uploads