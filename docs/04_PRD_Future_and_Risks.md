# KLARO — Product Requirement Document (PRD)

Version: 0.2  
Section: Future and Risks

---

# 16. Data Model

## Data Philosophy

Collect the minimum information necessary.

Klaro should feel private by default.

Users should understand:

- what is stored
- why it is stored
- where it is stored

---

## Local Storage (MVP)

Persist only lightweight user state.

---

### User Preferences

Store:

- reading mode
- text size
- density
- explanation detail

Example:

```json
{
  "textSize": "large",
  "density": "comfortable",
  "explanation": "simple"
}
```

---

### Capability Progress

Store:

- completed capabilities
- progress counters
- unlocked experiences

Example:

```json
{
  "askClearly": 2,
  "reviewOutput": 3,
  "protectInfo": 1
}
```

---

### Onboarding State

Store:

- onboarding completed
- free chat unlocked

---

### Recent Tasks

Store:

Task type only.

Example:

```json
[
  "write-email",
  "compare-products"
]
```

---

## Explicitly NOT Stored

Never persist:

- uploaded images
- uploaded documents
- AI outputs
- prompts
- conversations
- upload previews

Uploads exist only during active session.

---

## Future (v2)

Optional:

- account sync
- cloud storage
- cross-device continuity

---

# 17. Prompt Architecture

## Philosophy

Users should never need prompt engineering.

Klaro translates goals into AI interactions.

---

## Prompt Layers

### Layer 01 — Task Context

Example:

Write Email

---

### Layer 02 — User Intent

Example:

Friendly

---

### Layer 03 — Output Constraints

Examples:

- concise
- supportive
- plain language

---

### Layer 04 — Trust Layer

Always append:

- avoid certainty
- state assumptions
- encourage verification

---

## AI Tone Rules

Always:

- calm
- encouraging
- concise
- transparent

Never:

- overly human
- emotional dependency
- overconfidence
- manipulation

---

## Response Structure

Every AI response returns:

---

### Main Response

Primary answer.

---

### AI Helped By

Examples:

- organized information
- summarized content
- suggested wording

---

### Consider Checking

Examples:

- dates
- prices
- official sources

---

### Suggested Next Step

Examples:

- simplify this
- compare alternatives
- ask follow-up

---

# 18. Error States + Empty States

## Empty State

No progress yet.

Message:

> Let’s try one useful thing together.

---

## Upload Failure

Message:

> We couldn't process this.
> Try another image or cover more information.

---

## AI Uncertain

Message:

> This answer may not be fully reliable.
> Consider checking another source.

---

## No Internet

Message:

> Klaro needs connection to help.
> Your progress remains saved.

---

## User Abandons Task

Message:

> No worries.
> You can continue later.

---

## Capability Update

Message:

> You now know more than before.

Avoid:

- Level complete
- Achievement unlocked
- Streak language

---

# 19. Future Vision

## Phase 02

Capability recommendations.

Examples:

- suggested next skills
- confidence growth

---

## Phase 03

Multi-session learning.

Examples:

- return recommendations
- adaptive task selection

---

## Phase 04

AI Ecosystem Onboarding

Examples:

- AI search
- image generation
- assistants
- automation

---

## Long-Term Vision

Klaro becomes:

A place where people build confidence with emerging technology.

Not only AI.

---

# 20. Risks & Assumptions

## Risks

Users may:

- trust AI too much
- skip explanations
- avoid uploads
- expect perfect answers

---

## Assumptions

Users value:

- guidance
- transparency
- practical outcomes
- low pressure

---

## Product Boundaries

Klaro does not:

- replace education
- guarantee correctness
- provide legal advice
- provide financial advice

---

## Success Condition

Users leave feeling:

> AI feels less intimidating.

---

# Appendix A — Brand Summary

Name:

Klaro

---

Meaning:

Clear / clarity

(Tagalog inspiration)

---

Tagline:

Confidence through clarity.

---

Brand Attributes:

- calm
- warm
- modern
- quietly confident

---

Logo Direction:

Emergent Clarity

(circle reveal)

---

Typography:

Brand:
Sora ↔ Manrope (open)

Product:
Inter

---

Visual Territory:

Quiet Intelligence

+
Structured Guidance

---

# Appendix B — Product Principles

- Clarity over capability
- Guide before freedom
- Reflection over completion
- Explain before trust
- Comfortable accessibility
- Protect before processing
- Intent before input