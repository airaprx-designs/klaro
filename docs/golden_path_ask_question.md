# Golden Path — Ask a Question

This document defines the canonical Klaro interaction flow.

This is the reference model for:

* pacing
* interaction structure
* AI response formatting
* reflection behavior
* capability progression
* privacy reminders
* tone

Other tasks may adapt this structure but should remain consistent with its principles.

---

# Task Overview

## Task name

Ask a question

## Purpose

Help users practice asking AI clear questions while learning:

* how context changes AI responses
* how to review answers thoughtfully
* how to protect personal information

This task should feel:

* low-pressure
* approachable
* useful immediately

---

# User capability goals

After completing this task, the user should better understand:

* asking clearly improves AI responses
* AI responses should be reviewed
* personal information should be shared carefully

---

# Flow structure

## Step 1 — Define intent

### Screen title

What kind of question?

### Goal

Help users clarify what they want before asking AI.

This reduces blank-page anxiety and teaches intentional prompting.

---

## Intent options

### Option 1

About a topic I’m new to

### Option 2

About something I read

### Option 3

About a decision I need to make

---

## Input label

What’s your question?

---

## Placeholder example

What’s the difference between chatbots and AI assistants?

---

# Step 2 — Review before sharing

## Purpose

Give the user a brief, calm moment to review what they're about to send to AI.

This is the "moment of awareness" described in TONE_AND_PRINCIPLES.md (Review before sharing). The goal is awareness, not friction. We don't block; we invite a pause.

## Screen title

Before we ask AI

## Supporting copy

Share only what's relevant to your question.

---

## What's shown on screen

* The user's typed question, rendered read-only in a quote-style block so they re-read their own words
* The 5-item checklist of things to leave out
* An "Edit my question" link that returns to Step 1 with the question preserved in state
* The primary button

---

## Checklist items

* Your home address
* Passwords or PIN numbers
* ID numbers (passport, SSN, etc.)
* Photos with personal information
* Signatures

---

## Primary button

I've checked my question

## Step indicator label

Review

---

# Step 3 — AI response review

## Screen title

Here’s what AI said

---

# Response structure

The response screen should always contain four sections.

---

## 1. Answer

Purpose:
Provide a clear, readable response in simple language.

Responses should:

* avoid jargon
* avoid excessive detail
* avoid sounding overly conversational

---

## Example answer

LLMs (large language models) are AI systems trained on text. Chatbots are the interfaces people interact with. Think of the LLM as the engine, and the chatbot as the car.

---

## 2. AI helped by

Purpose:
Show users how the AI constructed the response.

This teaches interaction awareness without exposing technical complexity.

---

## Example items

* Breaking down a technical term into simpler language
* Using an analogy to explain a concept
* Comparing two related ideas

---

## 3. Consider checking

Purpose:
Encourage reflection and healthy skepticism.

Do not frame this as distrust.

---

## Example items

* Whether another source explains it similarly
* Whether the definition has changed recently
* Whether the answer fully matches your situation

---

## 4. Suggested next step

Purpose:
Encourage thoughtful continuation rather than endless prompting.

---

## Example next steps

* Try comparing this with a quick web search
* Ask the same question in a different way
* Try asking for a shorter explanation

---

# Step 4 — Reflection complete

## Screen title

Nicely done.

---

## Supporting copy

Today, you practiced three things.

---

## Capability list

* Asking clearly
* Reviewing what AI gave back
* Protecting your information

---

## Primary CTA

Try another task

## Secondary CTA

Go home

---

# Capability progression

## Capabilities earned

### Asking clearly

The user understands that clearer intent improves AI responses.

### Reviewing AI output

The user understands AI responses should be reviewed thoughtfully.

### Protecting information

The user understands basic privacy awareness while using AI.

---

# Emotional goals

The user should leave the task feeling:

* calmer
* more capable
* less intimidated
* more thoughtful

The task should never feel:

* instructional
* academic
* productivity-focused
* overwhelming

---

# Important implementation notes

## Avoid chatbot behavior

This task is not a freeform chat experience.

The experience should remain:

* guided
* structured
* paced

---

## Avoid AI personality

AI responses should not:

* joke
* flatter
* over-encourage
* sound human-like

Keep responses neutral and understandable.

---

## Avoid excessive information

Responses should prioritize:

* clarity
* readability
* confidence-building

Not completeness.
