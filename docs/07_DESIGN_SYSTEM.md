# KLARO — Design System

Version: 1.0

Purpose:

Translate Klaro's brand into a scalable UI system.

This document defines:

- tokens
- components
- accessibility
- interaction patterns

---

# Design Principles

## Clarity over capability

Reduce choices.

Show only what matters.

---

## Comfortable accessibility

Readable.

Never clinical.

---

## Guide before freedom

Provide structure.

Avoid blank states.

---

## Quiet confidence

Minimal.

Intentional.

---

## Progressive expression

Calm by default.

More expressive during meaningful moments.

---

# Foundations

## Grid

Desktop:
12 columns

Tablet:
8 columns

Mobile:
4 columns

---

## Spacing Scale

Use 8pt system.

```text
4
8
16
24
32
48
64
80
96
```

Rules:

Internal:
16–24

Sections:
48–80

---

## Radius

Small:
8

Medium:
16

Large:
24

XL:
32

Default:

16

---

## Shadows

Small

```css
0 2px 8px rgba(0,0,0,0.04)
```

Medium

```css
0 8px 24px rgba(0,0,0,0.08)
```

Never use heavy shadows.

---

# Colors

## Foundation

Canvas

```css
#FAF8F5
```

Surface

```css
#F4F1EC
```

Elevated

```css
#FFFFFF
```

---

## Primary

Klaro Blue

```css
#4B72E6
```

Deep Blue

```css
#28418F
```

---

## Secondary

Warm Amber

```css
#E6B65B
```

---

## Neutral

Graphite

```css
#2C3137
```

Mid Gray

```css
#767E87
```

Border

```css
#C9CDD2
```

---

## Semantic

Success

```css
#5A9D6B
```

Warning

```css
#D98B44
```

Error

```css
#C65D5D
```

---

# Typography

## Brand

Status:

Open

Options:

Sora

OR

Manrope

---

## Product

Inter

---

## Scale

Display

48

Weight:
600

---

H1

40

Weight:
600

---

H2

32

Weight:
600

---

H3

24

Weight:
600

---

Body

18

Weight:
400

---

Small

16

Weight:
400

---

Line Height

150–170%

---

# Layout Rules

Max Content Width

Desktop:

1200px

Reading Width:

720px

---

Card Padding

24

---

Section Padding

64–80

---

# Components

## CoachCard

Purpose:

Guide interaction.

Contains:

- title
- explanation
- CTA

Style:

soft surface

---

## TaskCard

Purpose:

Entry point.

States:

default

hover

selected

completed

---

## AIResult

Sections:

answer

↓

AI helped by

↓

consider checking

↓

next step

---

## ReflectionCard

Purpose:

Learning.

Display:

Today you practiced:

- Asking clearly
- Reviewing outputs

---

## ProgressCard

Display:

You can now:

Capabilities only.

No percentages.

---

## UploadPreview

Display:

preview

↓

privacy

↓

edit

---

## RedactionCanvas

Tools:

rectangle

undo

clear

No free draw.

---

# Inputs

Height:

56px

Radius:

16px

Label always visible.

Never placeholders only.

---

# Buttons

Primary

Blue fill

---

Secondary

White

Border

---

Tertiary

Text

---

Minimum:

44px height

---

# Motion

Principles:

Slow

Meaningful

Subtle

---

Allowed

fade

reveal

expand

---

Avoid

bounce

parallax

sparkles

---

Timing

Fast:
150ms

Default:
250ms

Slow:
350ms

---

# Icons

Style:

rounded

outlined

simple

---

Avoid:

3D

filled packs

---

Recommended

Lucide

---

# Accessibility

Default body:

18px

---

Touch:

44px

---

Contrast:

comfortable high contrast

---

Never:

auto dismiss

time pressure

tiny controls

---

# States

Loading

Show:

progress

message

---

Success

Warm.

Subtle.

---

Error

Helpful.

Never blame.

---

Empty

Invite action.

---

# Responsive Behavior

Desktop

Split layouts

---

Tablet

Single-column

---

Mobile

Step-by-step

Avoid side panels.

---

# Design Rules

Never:

- use glassmorphism
- use AI sparkles
- use neon
- use excessive gradients
- create visual clutter

Always:

- preserve calm
- preserve readability
- preserve intentionality