# KLARO — Product Requirement Document (PRD)

Version: 0.2  
Section: Technical and Build

---

# 12. Technical Direction

## Product Type

Responsive Web Application

Architecture:

Frontend  
+  
AI Backend

Deployment:

Cloud-hosted

---

## Technology Goals

Prioritize:

- speed to build
- maintainability
- accessibility
- real AI interaction
- low operational complexity

Avoid:

- custom ML
- agents
- orchestration systems
- realtime architecture
- native app complexity

---

## Recommended Stack (MVP)

### Frontend

Framework:

Next.js

Language:

TypeScript

Styling:

Tailwind CSS

Animation:

CSS  
+ Framer Motion (minimal)

---

### Backend

Next.js Server Actions

No dedicated backend initially.

---

### Database

MVP:

No database

Use:

Local Storage

Store:

- reading preferences
- capability progress
- onboarding state

Future:

Supabase

---

### AI Layer

Provider:

OpenAI OR Claude

Current Recommendation:

OpenAI

Requirements:

- text generation
- image understanding
- structured responses

---

### File Processing

Supported:

- images
- screenshots

Document Support:

PDF upload

↓

page preview

↓

optional screenshot workflow

No editable PDFs.

---

### Authentication

MVP:

Guest Mode

No login.

Future:

Optional account sync.

---

# 13. System Architecture

## High-Level Flow

User

↓

Frontend

↓

AI Request Builder

↓

AI Provider

↓

Structured Response

↓

Coach Renderer

---

## AI Request Builder

Purpose:

Translate user actions into structured AI instructions.

Input:

- selected task
- intent
- upload (optional)
- preferences

Output:

Structured request

---

Example

Task:

Understand document

Intent:

Explain difficult language

Upload:

Sanitized image

↓

Generated Context

Goal:

Explain difficult language

Constraints:

- plain language
- concise
- supportive

---

## Response Structure

Every response returns:

### Main Response

Main answer

---

### AI Helped By

Examples:

- organized information
- summarized text
- suggested wording

---

### Consider Checking

Examples:

- dates
- numbers
- official sources

---

### Suggested Next Step

Examples:

- simplify this
- compare options
- ask follow-up

---

# 14. Build Requirements

## Application Routes

/

Home

---

/task

Guided task

---

/review

AI result

---

/progress

Capability progress

---

/settings

Preferences

---

## Core Components

### CoachCard

Purpose:

Guidance

---

### TaskCard

Purpose:

Task entry

---

### UploadPreview

Purpose:

Review upload

---

### RedactionCanvas

Purpose:

Cover private information

---

### AIResult

Purpose:

Show answer

---

### AIExplanation

Purpose:

Show transparency

---

### ReflectionCard

Purpose:

Learning summary

---

### ProgressCard

Purpose:

Capability display

---

## State Model

CurrentTask

Intent

UploadState

CapabilityProgress

ReadingPreferences

UIState

---

## Local Storage Model

```ts
{
  preferences: {
    textSize: "large",
    density: "comfortable",
    explanationLevel: "simple"
  },

  capabilities: {
    askClearly: 2,
    reviewOutputs: 1,
    protectInformation: 1
  },

  onboarding: {
    complete: false,
    freeChatUnlocked: false
  },

  recentTasks: [
    "write-email"
  ]
}
```

---

## Accessibility Requirements

Defaults:

- minimum body size: 18px
- line height: 150–170%
- clickable targets: 44px minimum
- comfortable contrast

Interaction Rules:

- no time pressure
- no auto dismiss
- no hidden actions

---

## Performance Requirements

Initial Load:

< 3 seconds

---

AI Wait:

show progress state

---

Uploads:

compress locally

---

# 15. MVP Screen Inventory

## Screen 01

Home

Contents:

- coach
- task cards
- progress preview

---

## Screen 02

Task Intent

Contents:

- goal selection
- guidance

---

## Screen 03

Privacy Reminder

Contents:

- checklist
- explanation

---

## Screen 04

Upload + Cover Private Info

Contents:

- preview
- redaction tool

---

## Screen 05

AI Result

Contents:

- answer
- explanation

---

## Screen 06

Reflection

Contents:

- capability updates

---

## Screen 07

Progress

Contents:

- capability overview

---

## Screen 08

Settings

Contents:

- reading mode
- privacy
- accessibility

---

# Technical Decisions Locked

- Responsive web
- Guest mode
- Local storage
- No conversation storage
- No uploads stored
- No database
- Minimal backend
- Privacy-first processing