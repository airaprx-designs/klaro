# CLAUDE.md

Working memory for Claude across sessions on the Klaro project.
Read this file at the start of every session before any other documentation.

---

## Project Overview

**Klaro** is a responsive web application that helps adults who are new to AI build confidence through guided everyday tasks.

Instead of presenting a blank AI chat, Klaro wraps each interaction in a structured journey so users always know what to do next, what the AI did, and what they learned.

- **Tagline:** Confidence through clarity.
- **Brand meaning:** "Klaro" — Tagalog for *clear*, *understood*, *makes sense*. Also resonates with German *klar*.
- **Stack:** Next.js + TypeScript + Tailwind + minimal Framer Motion. React state + localStorage only. No database, no auth, no backend.
- **Scope:** MVP with four routes — `/`, `/task/[taskSlug]`, `/progress`, `/settings`. Review and Reflection are internal steps of the task journey, not standalone routes (see IA Decision in the Decision Log).
- **Tasks:** organized in two levels (see Task Model below). Level 1 is the first-user onboarding layer. Level 2 is the broader MVP set.

---

## Product Goals

1. Make AI feel calm, modern, clear, and supportive — never playful, robotic, overwhelming, or corporate.
2. Get a new user through one complete task (intent → privacy → upload → redact → AI → review → reflection) in under 10 minutes.
3. Build confidence through reflection, not gamification.
4. Protect the user's private information by default — redact before processing.
5. Keep the codebase ready to swap mocks for real AI without rewriting flows.

Users should feel: capable, calm, curious, in control.
Users should not feel: tested, overwhelmed, dependent, left behind.

---

## Principles (Non-Negotiable)

1. Clarity over capability
2. Guide before freedom
3. Reflection over completion
4. Explain before trust
5. Comfortable accessibility
6. Protect before processing
7. Intent before input

Apply these as decision filters when any trade-off comes up.

---

## Task Model

Tasks are **config-driven**. A single config defines every task; the `/task/[taskSlug]` route renders any task by slug. Tasks are organized in two levels so first-time users always start with the simplest, highest-confidence experiences.

### Canonical task flow

`docs/golden_path_ask_question.md` is the reference shape that every task implements. It defines:

- The journey: Intent → Review before sharing → (Upload → Redact, if `requiresUpload`) → AI → Review (result) → Reflection
- The Review-before-sharing screen behavior: shows the user's typed input for review with an "Edit my question" link back to Step 1, plus the 5-item privacy checklist
- The AI response contract: `{ answer, aiHelpedBy, considerChecking, nextStep }`
- The Reflection screen copy and the capabilities earned

Other tasks adopt the same shape with their own intent options, mock responses, and capability mappings.

### Capability map

`docs/capability_map.md` defines 7 behavioral capabilities (e.g., *Asking clearly*, *Reviewing AI output*, *Protecting information*) and which tasks teach each. The task config carries a `capabilitiesEarned` array referencing these. When the user completes a task, any capability they have not yet earned becomes earned (idempotent — completing the same task twice earns nothing new).

### Level 1 — Onboarding (lightest tasks, ≤5 min, no "real task" framing)

A first-time user encounters these before being introduced to Level 2.

1. **Get ideas** — `get-ideas` — 3 min — "Start with a blank page"
2. **Ask a question** — `ask-question` — 3 min — "Start by asking something simple"
3. **Write a greeting** — `write-greeting` — 5 min — "Create something together"
4. **Plan an event or trip** — `plan-event-or-trip` — 5 min — "Turn ideas into a simple plan"

Level 1 progression is reflected in onboarding state (`localStorage.onboarding`) so the home screen can surface the next appropriate task. Level 1 should never be replaced or skipped by Level 2 suggestions for users who haven't completed onboarding.

### Level 2 — Broader MVP (first real-task experience and beyond)

Available once Level 1 onboarding is complete (or explicitly skipped). These remain available throughout the product alongside Level 1.

5. **Write your first email** — `write-first-email` — 8 min — "Use AI on a real task"
6. **Explain a screenshot** — `explain-screenshot` — 5 min — "Understand what you're seeing"
7. **Understand a document** — `understand-document` — 8 min — "Use AI on a real task"
8. **Compare products** — `compare-products` — 7 min — "Look beyond the first answer"
9. **Fact-check information** — `fact-check` — 5 min — "Practice healthy skepticism"

### Task config shape

Each task is a config object so we can add, edit, and reorder tasks without changing routing or flow code:

```ts
{
  slug: string,                       // e.g. "get-ideas"
  level: 1 | 2,
  title: string,                      // user-facing title
  shortDescription: string,           // wireframe tagline shown on TaskCard
  estimatedMinutes: number,           // duration shown on TaskCard

  // Step 1 — Intent
  intentHeading: string,              // e.g. "What kind of question?"
  intentOptions: { id, label }[],     // 3 chips
  inputLabel: string,                 // visible label (no placeholder-only inputs)
  inputPlaceholder: string,           // example text inside the input

  // Step 2 — Review before sharing
  privacyChecklistOverrides?: string[],  // omit to use DEFAULT_PRIVACY_CHECKLIST

  // Steps 3 + 4 inserted only when requiresUpload is true
  requiresUpload: boolean,

  // Step 6 — Reflection (binary capability tracking)
  capabilitiesEarned: CapabilityId[], // references lib/capabilities

  // Surfaced on /progress (Phase 9)
  reflectionItems: { label, moment }[],  // 3 per task; "label" is capability-style, "moment" is what the user did

  // Step 5 — AI call
  mockResponseId: string,             // looks up lib/mocks/responses.ts
}
```

### Mock response shape (mirrors the final AI contract exactly)

Every mock response uses the structured shape the real AI will return — so swapping the provider in Phase 08 changes no consumer code:

```ts
{
  answer: string,
  aiHelpedBy: string[],          // what the AI did, in plain language
  considerChecking: string[],    // suggestions to verify
  nextStep: string,
}
```

Mocks live in a single local module (e.g. `lib/mocks/responses.ts`) keyed by `mockResponseId`. The real AI in Phase 08 replaces the data source behind the adapter, not the consumer.

---

## Folder Structure

Repo root: `C:\Users\asgpu\OneDrive\Documents\Portfolio 2026\Project\Klaro\Klaro_Claude`

```
Klaro_Claude/
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
├── .env.example
├── docs/
│   ├── 00_BUILD_BRIEF.md            ← highest priority
│   ├── 01_PRD_Product_Foundation.md
│   ├── 02_PRD_Experience_and_Flows.md
│   ├── 03_PRD_Technical_and_Build.md
│   ├── 04_PRD_Future_and_Risks.md
│   ├── 05_BRAND_GUIDELINES.md
│   ├── 06_CLAUDE_EXECUTION_PLAN.md
│   └── 07_DESIGN_SYSTEM.md          ← present in repo; not yet read (consult if Phase 03 needs it)
├── app/
│   ├── layout.tsx                   ← responsive shell (pill nav + max-w-content + mobile bottom bar)
│   ├── globals.css                  ← brand baseline (canvas bg, graphite text, Manrope headings)
│   ├── not-found.tsx                ← shared 404
│   ├── page.tsx                     ← / (Home: greeting + recommended grid + Explore all)
│   ├── _components/
│   │   ├── PrimaryNav.tsx           ← app-shell-only client nav (text + warm-amber underline)
│   │   └── PreferencesApplier.tsx   ← applies textSize/spacing prefs to document root
│   ├── task/[taskSlug]/page.tsx     ← /task/<slug> — placeholder (Phase 5 owns the journey)
│   ├── progress/page.tsx            ← /progress (heading + 3 stacked cards)
│   └── settings/page.tsx            ← /settings (placeholder)
├── components/                      ← shared visual components
│   ├── PageHeading.tsx              ← left-column page intro
│   ├── TodaysTaskHero.tsx           ← featured task hero on Home (warm-amber accent + Begin CTA)
│   ├── TaskCard.tsx                 ← card for the alternatives row + future grids
│   ├── TaskRow.tsx                  ← compact row for Explore all tasks
│   ├── ExploreAllTasks.tsx          ← disclosure with chevron, wraps TaskRow list
│   ├── SegmentedControl.tsx         ← three-option toggle used in Settings
│   ├── progress/
│   │   ├── RecentlyTriedCard.tsx
│   │   ├── CapabilityCard.tsx
│   │   └── SuggestedNextCard.tsx
│   └── task/                        ← task journey components (Phase 5)
│       ├── TaskFlow.tsx             ← client state machine
│       ├── StepIndicator.tsx
│       ├── IntentStep.tsx
│       ├── ReviewBeforeSharingStep.tsx
│       ├── UploadStep.tsx
│       ├── RedactionStep.tsx
│       ├── ProcessingStep.tsx
│       ├── AIResultCard.tsx
│       └── ReflectionCard.tsx
└── lib/
    ├── tasks/config.ts              ← task config (9 tasks) + DEFAULT_PRIVACY_CHECKLIST + helpers
    ├── mocks/responses.ts           ← mock AI responses keyed by mockResponseId
    ├── capabilities/index.ts        ← 7 capabilities (id, reflectionLabel, progressLabel, description)
    ├── storage/
    │   ├── store.ts                 ← SSR-safe localStorage helpers for the 4 keys + persistTaskCompletion()
    │   └── hooks.ts                 ← usePreferences / useCapabilities / useRecentTasks / useOnboarding
    └── ai/
        ├── types.ts                 ← provider-agnostic adapter interface
        ├── mock-provider.ts         ← MockProvider (Phase 5)
        ├── anthropic-provider.ts    ← AnthropicProvider client adapter (Phase 8)
        └── provider.ts              ← env-driven switch; consumers import from here
```

Plus the server route for real AI:

```
app/api/ai/generate/route.ts         ← server-side Anthropic call (Phase 8)
```

---

## Document Priority Order

When sources conflict, the earlier document wins within each category.

**Strategy and phasing** — always read at session start:

1. `docs/00_BUILD_BRIEF.md` — single source of truth
2. `docs/06_CLAUDE_EXECUTION_PLAN.md` — phase-by-phase build order

**Voice and visuals** — read when writing user-facing copy or styling:

3. `docs/TONE_AND_PRINCIPLES.md` — writing voice, words to lean on / avoid, the dual-voice rule (UI is warm, AI response is neutral), the Review-before-sharing pattern
4. `docs/05_BRAND_GUIDELINES.md` — brand foundations, palette, type direction
5. `docs/07_DESIGN_SYSTEM.md` — concrete token values, scales, semantics

**Task flow and capability** — read when implementing Phase 5 and beyond:

6. `docs/golden_path_ask_question.md` — canonical task journey shape (Intent → Review before sharing → AI → Reflection). Every task adapts this shape.
7. `docs/capability_map.md` — the 7 behavioral capabilities Klaro tracks and which tasks teach each. Powers Phase 9 progress logic.

**Reference only** — consult only when 1–7 leave a specific question unanswered:

- `docs/01_PRD_Product_Foundation.md`
- `docs/02_PRD_Experience_and_Flows.md`
- `docs/03_PRD_Technical_and_Build.md`
- `docs/04_PRD_Future_and_Risks.md`

Never invent functionality outside these files.

---

## Workflow Rules

- Work strictly in the phases defined in `06_CLAUDE_EXECUTION_PLAN.md`.
- Each phase follows: **Plan → Build → Review → Approve → Continue**.
- **Stop after every phase. Wait for explicit approval before starting the next.**
- Never skip phases. Never reverse priority order (Structure → Flows → Accessibility → Visual Polish → Animation).
- If a requirement is unclear: **ask**. Do not invent. Do not expand scope.
- If drift is suspected, re-read `00_BUILD_BRIEF.md` and return to existing requirements.
- Mocks first, real AI later — but every mock must match the final structured response shape exactly.
- Do not store uploads, prompts, AI outputs, or conversations in localStorage. Ever.

For this current session specifically:

- Do NOT build anything.
- Do NOT install packages.
- Do NOT generate UI.
- Do NOT redesign anything.
- Do NOT create new features.

---

## Current Build Phase

**Phase 05 — Task Flow (complete, awaiting approval).**

State machine inside `/task/[taskSlug]` walks the user through:

- **Non-upload tasks:** Intent → Review before sharing → Processing → Result → Reflection (4 visible steps)
- **Upload tasks:** Intent → Review before sharing → Upload → Redact → Processing → Result → Reflection (6 visible steps)

Built as 8 components under `components/task/` plus an orchestrator (`TaskFlow.tsx`). All flow state lives in React in `TaskFlow`; nothing persists. Going back preserves typed text and uploaded files.

- `TaskFlow.tsx` — client state machine
- `StepIndicator.tsx` — left-column orientation (task title + N-of-M dots)
- `IntentStep.tsx` — 3-chip intent + labeled text input + Continue
- `ReviewBeforeSharingStep.tsx` — user's typed input quoted back + 5-item checklist + "Edit my question" link
- `UploadStep.tsx` — single-file drop zone, PNG/JPG, in-memory only
- `RedactionStep.tsx` — HTML5 canvas; warm-amber solid rectangles; Undo + Clear; mouse and touch supported
- `ProcessingStep.tsx` — calm "Thinking" status, no spinner
- `AIResultCard.tsx` — the four sections (Answer / AI helped by / Consider checking / Suggested next step)
- `ReflectionCard.tsx` — centered closing screen, capability checkmarks in reflectionLabel voice, two CTAs (Try another task / Go home)

`lib/ai/provider.ts` exports the active provider; `TaskFlow` imports from there, never the concrete `MockProvider`. Phase 8 will swap the export.

### Path so far (five-step plan + redesign)

1. ✅ CLAUDE.md docs alignment
2. ✅ Tone audit of existing user-facing copy
3. ✅ TaskConfig schema expansion + golden-path content + `lib/mocks/responses.ts`
4. ✅ Phase 05 — Task Flow build
5. ✅ Pattern-fill the remaining 8 tasks (drafted in Step 3, approved in Step 5)
6. ✅ **Home redesign + nav refresh** — Home now uses the hero direction from `01_HOME_HERO_ALTERNATIVE.jpg` (greeting + `TodaysTaskHero` + 3 alternative TaskCards + `ExploreAllTasks`). Nav switched to text + warm-amber underline; Home renamed to Today.

### Phase 06 — Local Storage (complete, approved)

Persistence layer wired up. The four brief-mandated keys are stored under `klaro:` prefix with SSR-safe access:

- `klaro:preferences` — displayName, textSize, spacing, explanationDepth
- `klaro:capabilities` — earned capability ids
- `klaro:recentTasks` — slugs, most-recent-first, capped at 8
- `klaro:onboarding` — completed task slugs

`lib/storage/store.ts` exposes typed get/set helpers and a composite `persistTaskCompletion(slug, capabilities)` called from `TaskFlow` when the user enters the Reflection step. `lib/storage/hooks.ts` provides React hooks (`usePreferences`, `useCapabilities`, `useRecentTasks`, `useOnboarding`) that hydrate on mount and expose `hydrated: boolean` so consumers can render SSR-neutral content until client data arrives.

Visible effects:

- **Settings** — display name input + three segmented controls. Each persists on change.
- **Home** — greeting reads `displayName` ("Good afternoon, Sarah" or just "Good afternoon" if no name). Today's task = first uncompleted task in `TASKS` order (Level 1 first, then Level 2). Alternatives = next three uncompleted. So the surface evolves naturally with progression.
- **TaskFlow** — on Reflection step entry, marks capabilities earned, adds slug to recent tasks, marks slug completed.
- **Progress** — three cards now render from live state. Empty state copy shifts ("Start a task to see what you've learned" when no recent tasks).

Deferred to Phase 11: actually applying `textSize` / `spacing` / `explanationDepth` to the rendered UI. They persist correctly; the visual application is polish.

### Phase 07 — Upload Flow Polish (complete, approved)

The Upload + Redact components were built in Phase 5; Phase 7 polishes the experience now that the flow has been tested end-to-end.

- **Drag-over visual feedback** — drop zone gets a solid `warm-amber` border + `bg-surface` tint while a file is being dragged over it. Previously the drop zone gave no signal that it was a valid drop target.
- **File-type validation on both paths** — the picker's `accept="image/png,image/jpeg"` only restricts its own dialog; drag-and-drop bypasses it. Added a runtime check in `handleFile` so any non-PNG/JPG drop is rejected with a calm, non-fear-based message ("That's not a PNG or JPG. Please choose an image file.").
- **File name + size shown after selection** — transparency about what the user just uploaded. Size formatted as B / KB / MB.
- **Redact step copy clarified** — body text explicitly says continuing without covering anything is fine ("If there's nothing to cover, you can continue."). Undo / Clear show a clean disabled state when no rectangles exist.

Behaviour unchanged otherwise: still solid rectangles (graphite, swapped from warm-amber on user feedback), still mouse + touch, still no resize handles or free draw, still no OCR or auto-detection. The original image never leaves the browser — only the redacted composite (image + rectangles flattened via `canvas.toDataURL`) goes to the provider.

### Phase 08 — AI Integration (complete, approved; running in mock mode for now)

Real Anthropic Claude wired in behind the same `AIProvider` interface that MockProvider implements. No consumer code changed — switching providers is one env var.

Architecture:

- **Client adapter** (`lib/ai/anthropic-provider.ts`) makes a `fetch` to `/api/ai/generate`. It never touches the Anthropic API directly; the key never leaves the server.
- **API route** (`app/api/ai/generate/route.ts`) holds the key, calls Anthropic via the official SDK (`@anthropic-ai/sdk`), enforces the four-section response shape via Claude's tool-use mechanism (`tool_choice: { type: "tool", name: "klaro_response" }`), validates the parsed input, returns it as JSON.
- **Provider switch** (`lib/ai/provider.ts`) reads `process.env.NEXT_PUBLIC_AI_PROVIDER`. `"anthropic"` → real, anything else → mock. Default mock so devs can work without a key.
- **System prompt** bakes in the dual-voice rule from TONE_AND_PRINCIPLES (AI speaks neutrally; UI provides warmth), the four-section content rules, and the avoid-list (em dashes, exclamation marks, hype words, productivity framing).
- **Image support** — Claude vision via base64; the redacted image data URL is parsed and attached as an `image` content block.
- **Error handling** — TaskFlow shows a calm "That didn't work" state with a Try again button if the call fails. Previously the user was stuck on Thinking forever.

Setup (in README): set `NEXT_PUBLIC_AI_PROVIDER=anthropic` and `ANTHROPIC_API_KEY=sk-ant-...` in `.env.local`, run `npm install`, restart dev server. The user is keeping mock mode locally for now; will flip to real Anthropic before deployment.

### Phase 09 — Reflection + Progress Refinement (complete, approved)

Added per-task reflection moments so the "Recently tried" card on /progress reads as task-specific instead of generic capability labels.

- **New `TaskConfig.reflectionItems`** — each task carries 3 `{ label, moment }` entries. `label` is a capability-style phrase ("Asking with intent"); `moment` is what the user concretely did ("You decided what kind of question to ask"). All 9 tasks populated; voice follows TONE_AND_PRINCIPLES (no em dashes, no hype, no exclamation marks).
- **RecentlyTriedCard rewired** — receives items from the user's most recent task only (single-task focus, matches the wireframe pattern). Old field names (`capability` / `explanation`) renamed to `label` / `moment` to align with the new data shape.
- **Smarter Suggested Next Step** — prefers a task that teaches a capability the user hasn't yet earned. Falls back to "first uncompleted task in TASKS order" only when every relevant capability is already in hand.

What deliberately stayed the same:

- The Reflection screen at the end of the task journey still shows the high-level capability labels ("Asking clearly", "Reviewing what AI gave back", "Protecting your information") — per the golden path. The new reflection items are a /progress concept, not a journey concept.
- The 7-capability binary model on CapabilityCard (earned ✓ vs not-yet ◯) unchanged.
- No gamification: no XP, no streaks, no percentages, no levels surfaced anywhere.

### Phase 10 — Accessibility Pass (complete, approved)

A WCAG AA audit + targeted fixes. The two real blockers were colour-contrast issues with brand tokens used as text. The rest was already in good shape from earlier phases.

**Contrast — new accessible token variants:**

- `warm-amber: #E6B65B` was 1.85:1 on canvas — fails WCAG AA when used as text.
- `mid-gray: #767E87` was 3.92:1 on canvas — fails WCAG AA for body text (just barely).
- Added two new tokens:
  - **`warm-amber-deep: #8C6914`** (4.8:1 on canvas) — used for text labels (TODAY'S TASK, the four AIResult section headers).
  - **`mid-gray-deep: #5F676E`** (5.5:1 on canvas) — used for secondary body text (task taglines, step indicator copy, reflection moments, file metadata, error messages, placeholder text, etc.).
- The original `warm-amber` and `mid-gray` tokens are kept and reserved for **decorative use**: the hero accent strip, the nav active underline (which reinforces the bold-weight state — the bold weight is the primary indicator and meets contrast independently), and decorative icons (Sparkles, Circle indicators next to text).

**Motion:**

- `@media (prefers-reduced-motion: reduce)` rule in `globals.css` collapses every animation and transition to 0.01ms when the user prefers reduced motion. Respects WCAG 2.3.3.

**Screen-reader semantics:**

- `TaskFlow`'s AI error state was `aria-live="polite"`; promoted to `role="alert"` since it's a blocking error.
- `ProcessingStep` keeps `aria-live="polite"` (transient loading state, polite is correct).
- All form inputs have associated labels (`htmlFor`/`id` or `aria-label`).
- Skip-link, focus ring, and heading hierarchy were already in place from Phase 2.

What stayed the same:

- 18px body / 1.6 line-height baseline (from Phase 2 globals.css)
- 44px+ touch targets on all buttons and nav items
- `:focus-visible` outline on Klaro Blue (already in place)

### Phase 11 — Polish (complete, awaiting approval)

Final phase. Five polish moves:

- **Page-entrance fade-in.** A `klaroFadeInUp` keyframe in `globals.css` (350ms, ease-out) plays on `<main>` so every page settles in instead of popping. CSS-only — no Framer Motion needed. `prefers-reduced-motion` automatically clamps it to 0.01ms.
- **Disabled button visibility.** The longstanding `disabled:opacity-40` issue (which washed klaro-blue with canvas text and looked invisible) replaced with explicit color changes. Primary: `disabled:bg-divider disabled:text-mid-gray-deep`. Secondary: `disabled:bg-surface disabled:text-mid-gray-deep`. Clearly muted, clearly readable.
- **Sticky header elevation cue.** The sticky header now has `border-b border-divider/30` — a barely-there line that becomes visible against scrolling content. Subtle separation without shadow heaviness.
- **`textSize` preference is now visible.** A new client component (`app/_components/PreferencesApplier.tsx`) reads the user's preference on mount and sets `html { font-size }` accordingly (smaller = 14px, standard = 16px, larger = 18px). Because every Tailwind size is rem-based, the whole UI scales together. Spacing and inputs scale; headings scale; touch targets scale.
- **`explanationDepth` reaches AI.** `AIRequest` now carries the preference. TaskFlow reads it from localStorage and sends it on every call. The Anthropic route appends a brief instruction to the system prompt: `brief` → 2 sentences, no analogies; `standard` → 3-5 sentences; `in-depth` → up to 6 sentences with an analogy. Mock provider ignores it.

What stays unfinished (and acceptable):

- **`spacing` preference persists but doesn't visually apply.** Setting it stores correctly and `html[data-spacing]` is set as an attribute, but no CSS rules consume it yet. Applying spacing exhaustively would require threading a CSS variable through every gap/padding in the codebase — out of scope for this build, but easy to add later (each spacing value would have CSS overrides like `html[data-spacing="compact"] section { gap: 0.85rem }`).
- **No staggered card entrance, no modal animations.** The brief allows "fade, reveal, gentle transitions" but doesn't require all of them — the page-entrance fade is enough motion to feel calm without being decorative.

### Build is complete

All 11 execution-plan phases are now done. The product:

- Walks adults new to AI through 9 guided tasks at two levels of difficulty.
- Privacy is reviewed before sharing, including image redaction.
- Real AI provider (Anthropic Claude) is wired in via a structured-output tool, with the same `AIProvider` interface as the mock — switching providers is one env var.
- All state persists in localStorage (preferences, capabilities earned, recent tasks, onboarding progress).
- Progress page reflects real activity (capabilities earned, recently tried, suggested next).
- WCAG AA contrast on body text. `prefers-reduced-motion` honoured.
- Brand and tone enforced via design tokens and a TONE doc the codebase actively references.

Defer to future:
- Per-task illustrations replacing the placeholder shapes
- Returning-user "compact hero" Home variant (current build always shows the new-user variant)
- Spacing preference visual application
- Phase 12 ideas if the project continues

### Brand refresh — playful minimalist (Step 2 complete, awaiting approval)

After build completion, the user reviewed the polished UI and felt it still read as a "tasteful SaaS wireframe" rather than a distinctive product. We ran a brand-direction exploration: parked an initial "Modern minimal & sophisticated" archetype, sketched and dismissed a Craft.do "editorial notebook" direction (too writing-app, not a fit), and landed on **playful minimalist**.

Confirmed via a side-by-side JPG mockup (`outputs/klaro_today_vs_playful.jpg`). The direction is: cream canvas stays, single confident coral accent replaces both warm-amber + klaro-blue, friendly geometric headings (Plus Jakarta Sans replaces Manrope), rounder shapes (radii up across the board), warm-toned text instead of cool blue-graphite, and abstract soft-geometric illustrations (a coral blob with a yellow companion, etc.) instead of icons-in-tinted-boxes. Microsoft Copilot–style restraint, not Headspace-style cuteness.

**Step 2 — token rewrite (this step).** Added the new token family to `tailwind.config.ts` *additively* (legacy tokens stay so the running app keeps rendering until Step 3 migrates each surface):

- New colours: `coral` (#EE8569 primary accent), `coral-deep` (#B14A2B text-grade coral, WCAG AA on canvas), `coral-tint` (#FCD9C4), `peach-tint` (#FBE5C1), `warm-yellow` (#F4C77E companion), `warm-dark` (#3D2618 headings), `warm-mid` (#6B4E3A secondary text), `warm-canvas` (#FAF6F0 slightly warmer cream option).
- Radii bumped across the scale (DEFAULT 16 → 24, sm 8 → 12, md 16 → 20, lg 24 → 28, xl 32 → 36).
- Heading weight 600 → 700 with light negative tracking — Plus Jakarta Sans needs a touch more weight to land confidently.
- New `shadow-cta` token for the coral-tinted soft button shadow.
- Font swap done at the CSS-variable level: `--font-manrope` now points at Plus Jakarta Sans (loaded via `next/font/google`), so every `font-brand` consumer and every base `<h1>/<h2>/<h3>` picks up the new face with zero component edits.
- `globals.css` updated: heading colour deep-blue → warm-dark, link colour klaro-blue → coral-deep, focus-ring klaro-blue → coral. Semantic CSS variables (`--klaro-accent`, `--klaro-accent-deep`, `--klaro-accent-tint`, `--klaro-companion`, `--klaro-text`, `--klaro-text-mid`) added for non-Tailwind surfaces (inline SVG gradients, illustration fills).

**What this step does NOT change yet.** Every component still references the legacy tokens (`klaro-blue` CTAs, `warm-amber` accent dots, `deep-blue` headings via explicit class). Visually, only changes that flow through unmarked headings, links, and the focus ring will appear after restart. The hero, TaskCard, AIResultCard, TodaysTaskHero, PrimaryNav, and every CTA still need to be migrated to the coral palette + sticker-shape illustrations + rounder radii — that's Step 3.

**Step plan from here.**

- Step 3 — migrate landmark components (Home hero, TaskCard / TaskRow, PrimaryNav, TodaysTaskHero, buttons) to coral palette + new shape language + soft-geometric illustrations.
- Step 4 — migrate task flow (IntentStep, ReviewBeforeSharingStep, UploadStep, RedactionStep, ProcessingStep, AIResultCard, ReflectionCard).
- Step 5 — migrate Progress + Settings.
- Step 6 — remove legacy tokens (klaro-blue, deep-blue, warm-amber, warm-amber-deep, mid-gray, mid-gray-deep, graphite-as-heading) once nothing references them.
- Step 7 — polish + iterate based on lived feel.

### Brand refresh — Step 2.5 + Step 3 (complete, awaiting approval)

After Step 2 the user explored several accent directions side-by-side (coral, editorial-modern, premium-playful, lighter-outlined, terracotta/cobalt/mustard, forest/plum/warm-gray+tomato — see `outputs/klaro_three_accents.jpg` and `outputs/klaro_three_families.jpg`) and landed on **terracotta** as the accent for the playful-minimalist direction. The card treatment combines a 0.75px warm outline with a soft warm-toned drop shadow — defined edge plus a gentle lift, on the same surface.

**Step 2.5 — token amendment.** Replaced the coral token family (added in Step 2 but never consumed by components) with terracotta tokens:

- `coral` → `terracotta` (#D17442), `coral-deep` → `terracotta-deep` (#984F22), `coral-tint` → `terracotta-tint` (#FDD9C0), plus `terracotta-tint-2` (#FFE4D0).
- `warm-yellow` adjusted from #F4C77E to #E6B85B (the actual mockup companion). Added `warm-yellow-deep` (#A67E22) for icon foregrounds.
- Added `warm-soft` (#968370) for tertiary text / metadata.
- Added `outline` (#E8D9C0) for the 0.75px card border and `outline-warm` (#FAC5A0) for featured (terracotta-leaning) surfaces.
- `boxShadow` retuned for the outline+shadow combined treatment: `shadow-sm` is now a gentle two-stop warm shadow, `shadow-warm` is a terracotta-tinted shadow for the hero / featured Answer surfaces, `shadow-cta` is the inset-highlight + double-drop CTA shadow.
- `globals.css` updated: link color terracotta-deep, focus ring terracotta. Semantic CSS variables (`--klaro-accent` etc.) now hold terracotta hex values; the variable names stay intentionally semantic so any inline SVG referencing them updates automatically.

**Step 3 — landmark Home components migrated.** Component-by-component:

- **`TodaysTaskHero`** full rewrite. Warm radial gradient background (warm-yellow top-right + terracotta-tint bottom-left over warm-canvas), 0.75px `outline-warm` border + `shadow-warm`. Eyebrow becomes a terracotta-tinted pill ("Today's small thing") with a small accent dot. Heading now in `text-warm-dark`. Time copy in terracotta-deep. CTA is a terracotta filled pill with a slim deeper outline, `shadow-cta` lift, and an arrow chip on the right that translates 2px on hover. Right side replaced the icon-in-tinted-box with a custom SVG composition (terracotta blob with white inner highlight + warm-yellow companion disc + small dark accent dot), all using semantic CSS variables so the colors update if the accent ever shifts again.
- **`TaskCard`** + **`TaskRow`** outlined + soft-shadowed. White paper background, 0.75px `outline` border, `shadow-sm`. Hover lifts 2px and deepens to `shadow`. Icon slot becomes a circular "sticker" filled with the task's accent tint, with its own soft warm shadow so it reads like an applied sticker rather than a flat slot. Title in warm-dark; hover color shifts to terracotta-deep.
- **`PrimaryNav`** active state — replaced the warm-amber bottom-border with a soft terracotta highlight pill that sits just under the label (terracotta at 35% opacity, fully rounded, slightly wider than the text). Reads like a quiet highlighter mark. Inactive items in warm-mid, hover lifts to warm-dark. Same treatment for both horizontal and bottom-bar variants.
- **`app/layout.tsx`** body text color shifted graphite → warm-dark so the entire app inherits the new warm palette (components that still explicitly set `text-graphite` in task/* and progress/* will be migrated in Steps 4 and 5). Wordmark mark became two nested outlined shapes — a terracotta asymmetric rounded square containing a smaller warm-yellow-deep inner shape — placeholder for the final Emergent Clarity mark, using the same colour story.
- **`PageHeading`** subtitle: graphite → warm-mid.
- **`ExploreAllTasks`** disclosure shell: now outlined + soft-shadowed instead of `bg-surface` flat. Chevron in warm-mid. Hover color shifts to terracotta-deep.
- **`lib/tasks/icons.tsx`** accent map rewritten. The old 5-family per-task accent system (klaro-blue / deep-blue / warm-amber / success / warning) collapses to two families: **TERRA** (terracotta-tint + terracotta-deep) and **AMBER** (warm-yellow @ 32% + warm-yellow-deep). Tasks alternate TERRA / AMBER through the 9-task list so the alternatives row has visible variety without breaking palette discipline.
- **`app/page.tsx`** "Or, try one of these:" copy replaced with the new section-label pattern from the mockup: small terracotta dash + uppercase tracked label in terracotta-deep ("Or pick another").

**What still uses legacy tokens** (deferred to Steps 4–5 as planned):

- Task journey components: `IntentStep`, `ReviewBeforeSharingStep`, `UploadStep`, `RedactionStep`, `ProcessingStep`, `AIResultCard`, `ReflectionCard`, `TaskFlow`, `StepIndicator`. All still reference klaro-blue / warm-amber / deep-blue / graphite explicitly. These read in the task journey, which means the journey will look mid-migrated until Step 4. Acceptable for now.
- Progress page cards (`RecentlyTriedCard`, `CapabilityCard`, `SuggestedNextCard`): same — Step 5.
- Settings page form labels: `text-graphite` on labels, `text-mid-gray-deep` on placeholders — Step 5.
- `SegmentedControl`: uses graphite — Step 5.

**Visual verification.** Not run in sandbox (the user's `node_modules` is on Windows; sandbox is Linux per the Phase 1 decision). The user will check the running dev server. If hot-reload picks up the changes cleanly, the Today page should now match `outputs/klaro_three_accents.jpg` panel A (terracotta) very closely. The other routes (Progress, Settings, task journey) will look mixed — the headings, links, focus ring, nav, and body color will be on the new palette, but the inner components still use legacy tokens.

### Brand refresh — Step 4 (complete, awaiting approval)

Migrated the entire task journey to the playful-minimalist + terracotta language. Every component the user touches between hitting "Begin" and seeing the Reflection screen is now in the new visual system. Component-by-component:

- **`AIResultCard`** — the most visually important task-journey surface. Featured Answer card gets a warm radial-gradient background (warm-yellow at top-right + terracotta wash at bottom-left), 0.75px `outline-warm` border, `shadow-warm` lift, and a larger 18px body in warm-dark so it reads as the headline of the response. Section labels become small terracotta-dot + tracked uppercase terracotta-deep. Supporting trio (AI helped by / Consider checking / Suggested next step) sit beneath in standard outline + `shadow-sm` cards; the "Suggested next step" card gets a coral-leaning `outline-warm` border for subtle emphasis. Bullet glyphs shifted from diamond ◆ to small warm-yellow-deep dots and outlined warm-mid circles. The four old amber-label boxes are gone.
- **`IntentStep`** — option pills now use the outline+shadow combined treatment. Active state swaps to a `terracotta` border + `terracotta-tint/60` fill + filled `terracotta-deep` indicator dot. Inactive pills lift 2px on hover via `outline-warm`. Text input gets `outline` border + `shadow-sm` + warm-soft placeholder + terracotta focus border. Continue CTA matches the unified terracotta pill (arrow chip + `shadow-cta`). Disabled state uses warm-canvas + outline + warm-soft text — clearly muted but legible.
- **`ReviewBeforeSharingStep`** — quoted user input becomes an outline-warm + warm-canvas figure card with a small terracotta dot before "What you'll share:". Edit-my-question link in `terracotta-deep` underline. Privacy checklist is an outline+shadow card with terracotta-ring circles in place of the old grey-bordered squares. CTA unified.
- **`UploadStep`** — drop zone idle state is a warm dashed outline (1.5px dashed `outline-warm`) on warm-canvas; drag-over swaps to solid terracotta border + `terracotta-tint/40` background, no longer just amber. Preview surface is outline + shadow on warm-canvas. Primary CTAs ("Choose a file", "Looks good, continue") are the unified terracotta pill. Secondary "Choose a different file" is an outlined warm-canvas pill with hover lift. Error message in terracotta-tinted alert.
- **`RedactionStep`** — surrounding shell migrated to warm-toned outline + soft shadow. Undo / Clear become outlined warm-canvas pills with disabled state in warm-soft. Primary "Looks ready" CTA = unified terracotta pill. Back link in terracotta-deep. **Redaction fill stays graphite (#2C3137)** intentionally — the cover-up tool needs maximum contrast against any image for the safety guarantee; the brand refresh deliberately does NOT touch it. Logged in the file's comment.
- **`ProcessingStep`** — "Thinking" eyebrow with a pulsing terracotta dot (no spinner), `<h2>` "One moment.", body in warm-mid. `aria-live="polite"` preserved.
- **`ReflectionCard`** — overline ("You finished") + display heading ("Nicely done.") + capability list. Capability badges shifted from solid graphite circles with canvas check to `terracotta-tint` badges with `terracotta-deep` check glyphs, with a soft warm shadow. Each capability sits in a warm-canvas + outline-warm row with `shadow-sm`. Primary "Try another task" = unified terracotta pill; secondary "Go home" = outlined warm-canvas pill.
- **`StepIndicator`** — secondary text in warm-mid. Progress dots: terracotta for completed/current, `outline` token for upcoming.
- **`TaskFlow`** — error state migrated: terracotta eyebrow, warm-mid copy, warm-canvas+outline error detail box, unified terracotta retry pill. `role="alert"` preserved.

**What's still on legacy tokens after Step 4** (deferred to Step 5):

- Progress page cards (`RecentlyTriedCard`, `CapabilityCard`, `SuggestedNextCard`)
- Settings page form fields
- `SegmentedControl` component

Step 5 will clean these up; after that Step 6 will remove the legacy `klaro-blue`, `deep-blue`, `warm-amber`, `warm-amber-deep`, `mid-gray`, `mid-gray-deep`, and `text-graphite` tokens entirely once nothing references them.

**Visual verification.** Not run in sandbox. The user will reload the dev server. A clean walk through a non-upload task (e.g., `/task/ask-question`) and an upload task (e.g., `/task/explain-screenshot`) should now all read in the playful-minimalist + terracotta language end-to-end. The Reflection screen at the end will feel like a small warm celebration rather than the previous grey-on-amber.

### Brand refresh — Step 5 (complete, awaiting approval)

Migrated the Progress page + Settings page + SegmentedControl. With Step 5 done, every component-level class reference to the legacy tokens (`klaro-blue`, `deep-blue`, `warm-amber`, `warm-amber-deep`, `mid-gray`, `mid-gray-deep`, `text-graphite`) has been removed from the codebase — remaining mentions are only in code comments documenting the migration. The legacy tokens themselves still live in `tailwind.config.ts` so Tailwind doesn't error on the lingering comment text and so Step 6 can do a clean delete.

Component-by-component:

- **`RecentlyTriedCard`** — outer card moves from flat `bg-surface` to outline + shadow on white paper. Sparkles glyphs shift warm-amber → terracotta. Labels in warm-dark, moments in warm-mid.
- **`CapabilityCard`** — outer card same treatment. Earned items get a small `terracotta-tint` badge with a `terracotta-deep` Check glyph and a soft warm shadow (was a bare graphite checkmark). Not-yet items keep the outlined Circle but in `warm-mid`, with `warm-soft` label text — clearly differentiated as future capabilities. Earned labels in `warm-dark`.
- **`SuggestedNextCard`** — biggest visual upgrade. The bare "Circle + title" line is replaced with a real task preview row: the suggested task's sticker icon (using the same TERRA/AMBER accent system as the Home cards) + title + tagline + duration in terracotta-deep on the right. Outer card outline+shadow on white paper; the inner row outline+shadow on warm-canvas. Hover shifts the title to terracotta-deep and lifts the row 2px.
- **`SegmentedControl`** — track moves from flat surface to `warm-canvas` + 0.75px `outline` border + a faint inner shadow for an inset feel. Active segment now uses `outline-warm` border + elevated white pill + `shadow-sm` + `terracotta-deep` text. Inactive in `warm-mid` with hover to `warm-dark`.
- **`app/settings/page.tsx`** — all four labels in warm-dark. Display-name input gets the outline + shadow-sm + warm-soft placeholder + terracotta focus border treatment used elsewhere. Three SegmentedControls auto-pick up the new active-state styling.

**Result of Step 5.** Every route now reads in the playful-minimalist + terracotta language: Today (Step 3), task journey (Step 4), Progress + Settings (Step 5). The brand refresh is functionally complete from the user's point of view; Step 6 (legacy token cleanup) is housekeeping and shouldn't change visuals.

**Visual verification.** Not run in sandbox. The user will check Today / Progress / Settings + a couple of task journeys to confirm everything reads cleanly end-to-end.

### Brand refresh — Step 6 (complete, awaiting approval)

Housekeeping cleanup. Deleted the legacy color tokens from `tailwind.config.ts` now that no component references them. The token system is now tight: every color in the config is either a current brand surface, the terracotta family, the warm-yellow companion, the warm text palette, the outline pair, or a functional semantic (divider/success/warning/error). The comment block at the top documents the brand refresh as complete and explains the outline + elevated card pattern.

Removed: `klaro-blue`, `deep-blue`, `warm-amber`, `warm-amber-deep`, `mid-gray`, `mid-gray-deep`, `graphite`.

Kept: `canvas`, `surface`, `elevated`, `warm-canvas`, `terracotta` + `-deep` + `-tint` + `-tint-2`, `peach-tint`, `warm-yellow` + `-deep`, `warm-dark`, `warm-mid`, `warm-soft`, `outline`, `outline-warm`, `divider`, `success`, `warning`, `error`.

Visual impact of Step 6 should be **none** — the deleted tokens weren't referenced by any component class. If any visual regresses, it means a class reference was missed (most likely in `.next/` cached output that needs a fresh build, or in a comment-only file I missed).

### Brand refresh complete (Steps 1–6 done)

Every route reads in the playful-minimalist + terracotta language. Card visual language is unified (0.75px warm outline + soft warm-toned drop shadow). CTA pattern is unified (terracotta filled pill, slim terracotta-deep outline, shadow-cta, arrow chip on right with hover translate). Typography is unified (Plus Jakarta Sans throughout, Inter for body, no Manrope). Body color is warm-dark; secondary text is warm-mid; metadata is warm-soft. Heading weight 700 with light negative tracking. Wordmark is two nested outlined warm shapes.

**Step 7 (polish + iterate based on lived feel)** is reserved for future. Things that could land there if surfaced:
- Per-task custom hero illustrations (currently every task shares the same terracotta-blob-and-yellow-disc composition; a per-task variation would give the Today hero more identity)
- Returning-user "compact hero" Home variant
- Spacing-preference visual application (still persists but isn't consumed by CSS rules)
- Subtle hover/transition polish across surfaces
- Step 7 ideas the user surfaces after living with the product

### Brand refresh — Step 7 (per-task hero illustrations, complete, awaiting approval)

Added a small system of per-task hero illustrations so the Today hero has identity that shifts with the surfaced task instead of always showing the same generic terracotta-blob composition.

- **New file `lib/tasks/illustrations.tsx`** exporting `getTaskHeroIllustration(slug)`. Nine self-contained SVG components, one per task slug, plus a `Generic` fallback (the previous default composition kept for any unknown slug).
- **Shared discipline.** Every composition uses the same 220×220 viewBox, draws from the same color set (terracotta primary + warm-yellow companion + peach support + tiny warm-dark accent), and reuses the same gradient defs (`hi-primary`, `hi-companion`, `hi-peach`). Colors come from the brand CSS variables (`--klaro-accent` etc.) so a future palette swap requires no edits here.
- **Compositions.** Each one nods to the task abstractly — no faces, no mascots, no literal icon reproductions:
  - `get-ideas`: layered terracotta + warm-yellow discs with spark-dot scatter above
  - `ask-question`: thick terracotta C-hook with a deep dot below for the period; warm-yellow disc behind
  - `write-greeting`: two embracing rounded forms (peach + terracotta) suggesting warmth without a literal heart
  - `plan-event-or-trip`: dotted path arcing from a small yellow start disc to a terracotta destination disc
  - `write-first-email`: terracotta rounded rectangle with a fold line (envelope flap) + warm-yellow stamp dot
  - `explain-screenshot`: terracotta-tint frame containing a warm-yellow disc and a small terracotta landscape silhouette
  - `understand-document`: two stacked rounded rectangles (warm-yellow back tilted slightly, terracotta-tint front) with terracotta-deep text hairlines
  - `compare-products`: two discs at different heights connected by a slim terracotta-deep beam suggesting balance
  - `fact-check`: terracotta shield form with a warm-yellow check stroke inside
- **`TodaysTaskHero` wired up.** The inline SVG block is gone; in its place a single `getTaskHeroIllustration(task.slug)` call. Hero layout, padding, gradient backdrop, eyebrow, headline, CTA — all unchanged.
- **Reference shot:** `outputs/klaro_hero_illustrations.jpg` shows all nine on the warm hero background. Useful for any future iteration on the set.

**Visual impact.** On Today, the hero illustration now changes when the surfaced task changes (depending on which task is "today" per the onboarding logic). For first-time users walking Level 1, this means the illustration shifts as they complete tasks — small identity hook for each new task.

### Brand refresh — Step 7b (spacing preference, complete, awaiting approval)

The Settings "Spacing" preference (Compact / Standard / Roomy) is now functional.

- **How it works.** `PreferencesApplier` already set `<html data-spacing="...">` on mount from localStorage. Step 7b adds CSS rules in `globals.css` that consume `[data-spacing]` via a single `--klaro-density` CSS variable.
- **Scale.** Standard = 1.0, Compact = 0.78, Roomy = 1.22. Applied via `calc(default-value * var(--klaro-density))`.
- **Scope.** Top-level page rhythm only:
  - `<main>` vertical padding (the outer breathing room around every route)
  - Direct-child gap on page wrappers: the `flex.flex-col` wrappers used by Home + Settings (was `gap-12`) and the `grid` wrappers used by Progress + TaskFlow (was `gap-8` / `md:gap-12`)
  - The right-column card stack inside Progress / similar (`flex.flex-col.gap-8`)
- **Deliberately NOT scaled.** Card internal padding (`p-6`, `p-7`, `p-8`) and small inner gaps inside cards (`gap-3`, `gap-4`). Cards keep their tight tuned rhythm regardless of density. Compact/roomy is about MACRO spacing between sections, not micro spacing inside components.
- **Implementation.** Pure CSS, no `!important`. Selectors are specific enough (`html[data-spacing] main > .flex.flex-col`) to override Tailwind's utility classes without needing the bigger hammer.

**Try it.** Visit /settings, change Spacing between Compact / Standard / Roomy, then navigate to / (Today) and notice the section gaps + page padding respond. Compact gives a tighter, "more visible per scroll" feel; Roomy gives a calmer, more breathing pace. Cards themselves look identical in all three modes.

**Brand refresh — fully done.** Steps 1–7b complete. The product reads cleanly in the playful-minimalist + terracotta language end-to-end, with per-task hero illustrations + functional spacing preference. The only outstanding "could be done later" item from Step 7 is the returning-user compact-hero variant for Home, which the user can pick up if they want it.

---

## Architecture Assumptions

Confirmed in this session:

- **Framework:** Next.js with App Router.
- **Deployment target:** Vercel via GitHub (deferred). **Build local-first, but do not introduce choices that block standard Next.js + Vercel deployment.** Keep environment variables, API routes, build scripts, and project structure Vercel-compatible.
- **Styling:** Tailwind v3, with design tokens defined in Phase 03 from `05_BRAND_GUIDELINES.md`.
- **Type safety:** TypeScript strict mode.
- **Brand font:** Manrope. **Product font:** Inter.
- **Logo:** placeholder asset for now (visually neutral, no decorative motion). Replace with the final Emergent Clarity SVG when provided.
- **Animation:** Framer Motion installed in Phase 11 only (Polish), not before.
- **State:** React state for ephemeral flow state. localStorage for persistent preferences and capability tracking.
- **Review and Reflection are NOT routes.** They are internal steps within the `/task/[taskSlug]` journey, owned by the Phase 05 flow state machine. There is no `/review` URL; the brief listed it as a screen, not a destination, and the no-persistence rule means standalone access has no data to render.
- **AI layer is provider-agnostic.** A single adapter interface is defined. Phase 05 ships a `MockProvider`. Phase 08 adds OpenAI or Anthropic (TBD) by implementing the same interface. Consumers never import a provider directly.
- **Task routing:** single dynamic route `/task/[taskSlug]`, config-driven. Examples: `/task/get-ideas`, `/task/write-greeting`, `/task/write-first-email`. No hardcoded per-task routes.
- **Settings — explanation depth:** 3-step toggle (Brief / Standard / In-depth). Default: **Standard**. Persisted in localStorage under `preferences`.
- **Onboarding:** Level 1 progression tracked in `localStorage.onboarding`. Home surfaces the next Level 1 task for users mid-onboarding; Level 2 is gated until Level 1 is complete or explicitly skipped.
- **Local dev only for MVP runtime.** Vercel-ready throughout.
- Repo root path: `C:\Users\asgpu\OneDrive\Documents\Portfolio 2026\Project\Klaro\Klaro_Claude`.

---

## Things to Avoid Building

**Out of scope (do not build):**

- OCR or any automatic detection of sensitive content
- PDF editing
- Authentication
- Backend services or databases
- Chat / freeform prompt boxes
- Dashboards or analytics screens
- XP, levels, badges, streaks, percentages, achievements, or any gamification
- Multi-user features

**Visual / tonal anti-patterns:**

- AI sparkles, glassmorphism, neon, excessive gradients, parallax, bounce
- Microinteractions for decoration
- Auto-dismissing messages or hidden actions
- Pure black or pure white
- Playful, robotic, hyper-friendly, or clinical tone

**Storage anti-patterns:**

- Never persist uploads, prompts, AI outputs, conversations, or any user content

**Routing anti-patterns:**

- Do not create hardcoded per-task routes (e.g. `/task/email`, `/task/screenshot`). All tasks flow through `/task/[taskSlug]` driven by config.
- Do not re-introduce `/review` or `/reflection` as top-level routes. They are internal steps of the task journey, accessed via the `/task/[taskSlug]` state machine.

**Provider anti-patterns:**

- Do not import an AI SDK directly in flow code. All AI calls go through the provider-agnostic adapter.

---

## Decision Log

| Date       | Decision                                                                       | Source                         |
|------------|--------------------------------------------------------------------------------|--------------------------------|
| 2026-05-27 | Project orientation session: read 3 priority docs only, no build, no install   | User instruction                |
| 2026-05-27 | Document priority confirmed as Brief → Execution Plan → Brand Guidelines → PRDs | `00_BUILD_BRIEF.md`, `06_CLAUDE_EXECUTION_PLAN.md` |
| 2026-05-27 | Stack confirmed: Next.js + TypeScript + Tailwind + minimal Framer Motion       | `00_BUILD_BRIEF.md`            |
| 2026-05-27 | No database, no auth, no backend persistence                                    | `00_BUILD_BRIEF.md`            |
| 2026-05-27 | localStorage keys: `preferences`, `capabilities`, `onboarding`, `recentTasks`  | `00_BUILD_BRIEF.md`            |
| 2026-05-27 | AI response contract: `{ answer, aiHelpedBy, considerChecking, nextStep }`     | `00_BUILD_BRIEF.md`            |
| 2026-05-27 | **Task hierarchy:** Level 1 onboarding (Get ideas → Write a greeting → Write your first email) precedes Level 2 (Explain a screenshot, Understand a document, Compare products, Fact-check). Level 1 cannot be replaced by Level 2 for first-time users. | User instruction |
| 2026-05-27 | **Tasks are config-driven**; routing is a single dynamic `/task/[taskSlug]`     | User instruction                |
| 2026-05-27 | **Brand font: Manrope**                                                         | User instruction                |
| 2026-05-27 | **Logo: placeholder until final Emergent Clarity SVG is provided**              | User instruction                |
| 2026-05-27 | **AI layer is provider-agnostic.** MockProvider first; OpenAI/Anthropic adapter later (TBD). Consumers never depend on a specific provider. | User instruction |
| 2026-05-27 | **Settings — explanation depth:** 3-step (Brief / Standard / In-depth). Default: Standard. | User instruction |
| 2026-05-27 | **Deployment target: Vercel via GitHub (deferred).** Build local-first but keep Vercel compatibility. | User instruction |
| 2026-05-27 | **Phase 01 scaffold pinned to Next.js 14.2.5 + React 18.3 + Tailwind v3.4 + TypeScript 5.5 (strict).** App Router. `@/*` path alias. | Phase 01 build |
| 2026-05-27 | **`generateStaticParams` used on `/task/[taskSlug]`** so the dynamic route enumerates known slugs at build time (Vercel-friendly). New tasks added to `lib/tasks/config.ts` are picked up automatically. | Phase 01 build |
| 2026-05-27 | **`node_modules` installed by the user on Windows, not by the agent.** Avoids cross-platform binary mismatch with the Linux sandbox. | Phase 01 build |
| 2026-05-27 | **Nav pattern: desktop top header + fixed mobile bottom tab bar.** Both always visible — no hamburger, no hidden actions. | Phase 02 build |
| 2026-05-27 | **Primary nav surfaces Home / Review / Progress / Settings only.** Tasks are discovered *through* Home, not via a generic Tasks link, to honor "guide before freedom." | Phase 02 build |
| 2026-05-27 | **Accessibility floor codified in `globals.css`:** body 18px, line-height 1.6, `:focus-visible` outline, skip-to-main link, 44px+ touch targets (56px on the mobile bar). | Phase 02 build |
| 2026-05-27 | **`app/_components/` (underscore-prefixed) used for app-shell-only client components.** Phase 04 reusables will live at the repo-root `components/` directory. | Phase 02 build |
| 2026-05-27 | **`app/not-found.tsx` added** so unknown routes and unknown task slugs render a friendly 404 (uses `notFound()` from `next/navigation`). | Phase 02 build |
| 2026-05-27 | **IA correction: `/review` route deleted; Review and Reflection are internal steps of `/task/[taskSlug]`.** Top-level nav reduced from Home/Review/Progress/Settings (4) to Home/Progress/Settings (3). Rationale: the no-persistence rule means `/review` has no meaningful state outside an active task, so making it a destination creates an empty-state trap that violates *guide before freedom* and *reflection over completion*. `/progress` survives the same test because capability data persists. | Phase 02 review with user |
| 2026-05-27 | **`docs/07_DESIGN_SYSTEM.md` promoted to a primary source for Phase 03 tokens.** It defines concrete values (8pt spacing, radius scale defaulting to 16, subtle shadow specs, semantic color triplet, H3 size) that `05_BRAND_GUIDELINES.md` only sketches. Future phases that need token-level detail should consult 07 alongside 05. | Phase 03 build |
| 2026-05-27 | **Brand color names used directly as Tailwind tokens** (`bg-canvas`, `text-graphite`, `text-klaro-blue`, etc.) so brand vocabulary is visible in component code. `borderColor.DEFAULT` set to the brand divider color so plain `border` classes work out of the box. | Phase 03 build |
| 2026-05-27 | **Manrope (brand) + Inter (product) loaded via `next/font/google`** with CSS variables `--font-manrope` / `--font-inter`. Tailwind `font-brand` and `font-sans` map to them. Self-hosted by Next.js at build time — Vercel-friendly, no external font requests at runtime. | Phase 03 build |
| 2026-05-27 | **Type ramp materializes as base-element styles in `globals.css`**, not as utility classes. Plain `<h1>` / `<h2>` / `<h3>` automatically pick up Manrope + Deep Blue + the brand sizes, so page authors don't have to remember class names. | Phase 03 build |
| 2026-05-27 | **`max-w-content` (1200px) on the header, `max-w-reading` (720px) on `<main>`.** Header spans wide so the wordmark and nav have breathing room; body content stays in a comfortable reading column. | Phase 03 build |
| 2026-05-27 | **Task config schema:** `estimatedMinutes` added; `shortDescription` now holds the wireframe tagline. Level 1 expanded to 4 tasks (Get ideas, Ask a question, Write a greeting, Plan an event or trip); "Write your first email" promoted to Level 2 as the first real-task experience. | Wireframe review |
| 2026-05-27 | **Wordmark is lowercase `klaro`** with a small placeholder square reserved to its left for the Emergent Clarity icon. | Wireframe review |
| 2026-05-27 | **Pill nav** replaces text-with-underline. Active = filled graphite; inactive = outlined; hover = mid-gray fill with canvas text. `klaro-blue` is reserved for primary CTAs so nav and CTAs read as distinct visual classes. | Wireframe review |
| 2026-05-27 | **Main container widened to `max-w-content` (1200px)** for the two-column Home/Progress layout (4-col left / 8-col right on `md+`, stacks on mobile). `max-w-reading` (720px) is reserved for future long-form text-heavy screens. | Phase 04 build |
| 2026-05-27 | **Shared visual components live at the repo-root `components/` directory** (with a `progress/` subfolder for page-specific cards). `app/_components/` remains reserved for app-shell-only client components like `PrimaryNav`. | Phase 04 build |
| 2026-05-27 | **`lucide-react` added as a dependency** for iconography (Clock, Sparkles, Check, Circle, ChevronDown/Up). Matches design-system recommendation in `docs/07_DESIGN_SYSTEM.md`. | Phase 04 build |
| 2026-05-27 | **Greeting on Home is time-of-day + name** ("Good afternoon, Sarah"). Name hardcoded for Phase 04; localStorage `preferences.displayName` wiring is Phase 06 with a generic fallback when unset. | Phase 04 build |
| 2026-05-27 | **TaskCard has two presentations of the same data:** large card (Recommended) and compact row (Explore all). Treated as two components (`TaskCard`, `TaskRow`), both consuming the same `TaskConfig` shape. | Phase 04 build |
| 2026-05-27 | **Recommended set on Home is hardcoded** to the wireframe's returning-user 4-card set (Write a greeting, Ask a question, Plan an event or trip, Write your first email). New-user vs returning-user split is Phase 06 with onboarding state. | Phase 04 build |
| 2026-05-27 | **Progress mock data is wireframe-aligned, not personalised.** Real capability-to-task mapping and dynamic suggestions are Phase 09. | Phase 04 build |
| 2026-05-27 | **`CoachCard` deferred to Phase 05.** The wireframe's Home left column is a plain `PageHeading` (title + subtitle), not a coaching card. `CoachCard` is reserved for in-task coaching moments that the Task wireframe will define. | Wireframe review |
| 2026-05-28 | **Nav refresh (implemented):** renamed "Home" → "Today" (echoes the Today's task hero, daily-rhythm semantics); replaced pill nav with plain text + warm-amber underline for active; kept 3 items (Today / Progress / Settings); inactive = graphite weight-500, no underline; hover = warm-amber underline reveal. Mobile bottom bar uses the same text-and-underline pattern. Wordmark `klaro` remains a backup home affordance. **Rationale:** Mobbin sweep of calm / wellness / learning peers (Open, Headspace, MasterClass, Brilliant) confirms text-with-underline is the category default; pills are reserved for content filters or CTAs in that peer group. Klaro Blue stays reserved for primary CTAs; warm-amber claims "you are here" + confidence moments. Reverses the Phase 04 pill decision but preserves the same three destinations. | Mobbin review |
| 2026-05-28 | **Home redesigned to hero direction.** Single-column layout: greeting → `TodaysTaskHero` (warm-amber accent strip + TODAY'S TASK label + h1 title + tagline + clock + Begin button + illustration slot) → "Or, try one of these:" row of 3 `TaskCard`s → `ExploreAllTasks`. Replaces the Phase 4 2-column "greeting left, 2x2 grid right" layout. Today's task and alternatives are hardcoded (ask-question + the other 3 Level 1 tasks); Phase 6 onboarding state will switch the new-user vs returning-user variants. | Wireframe `01_HOME_HERO_ALTERNATIVE.jpg` |
| 2026-05-28 | **Tailwind `content` array now includes `./components/**`.** Without this, classes used only inside files under `components/` (e.g., `md:grid-cols-12`, `md:col-span-7`) were never generated by JIT, causing the hero to collapse on desktop. | Hero collapse bug |
| 2026-05-28 | **localStorage keys prefixed with `klaro:`** to avoid collisions on shared origins in development. SSR-safe access via try/catch returning defaults. Persistence degrades silently if disabled or quota-exceeded. | Phase 06 build |
| 2026-05-28 | **Today's task on Home computed from onboarding state.** First uncompleted task in `TASKS` order is featured (Level 1 first, then Level 2). Alternatives are the next three uncompleted. Replaces hardcoded slugs from the Phase 4/redesign. New-user vs returning-user copy variant driven by `onboarding.completedSlugs.length`. | Phase 06 build |
| 2026-05-28 | **Persistence happens on Reflection step entry**, not on AI result. `TaskFlow` calls `persistTaskCompletion(task.slug, task.capabilitiesEarned)` in a `useEffect` keyed on `step === "reflection"`. Idempotent — re-entering the step would no-op. | Phase 06 build |
| 2026-05-28 | **Text size / spacing / explanation depth persist but don't yet apply visually.** They're stored correctly; rendering effects (rem scaling, density modes, AI verbosity) are Phase 11 polish. | Phase 06 build |
| 2026-05-28 | **Drag-and-drop file validation runs at runtime in addition to the picker's `accept` attribute.** The accept attribute only restricts the picker dialog; drag-and-drop can deliver any MIME type. `UploadStep.handleFile` checks `/^image\/(png\|jpeg)$/` before reading the file. | Phase 07 build |
| 2026-05-28 | **Upload error copy stays calm.** Per TONE_AND_PRINCIPLES "Privacy language" + "Reflection language" — no fear-based or technical language for upload errors. Wrong-file message reads as a polite redirect, not a warning. | Phase 07 build |
| 2026-05-28 | **Redaction colour swapped from warm-amber to graphite (#2C3137).** Amber felt attention-grabbing in practice; graphite reads as "this area is covered" without competing with brand accents. Brand still avoids pure black; graphite is the brand's near-black. | User feedback |
| 2026-05-28 | **Anthropic Claude chosen as the real AI provider.** Strong calm/neutral voice match for Klaro's tone, native tool-use for structured output. Model: `claude-3-5-sonnet-latest` (model string is the only thing that needs updating to upgrade). | Phase 08 plan |
| 2026-05-28 | **Server route holds the API key, client adapter is a thin fetch wrapper.** `ANTHROPIC_API_KEY` is server-only (no `NEXT_PUBLIC_` prefix). `NEXT_PUBLIC_AI_PROVIDER` is client-readable but contains only the provider name, not any secret. | Phase 08 build |
| 2026-05-28 | **Structured output is enforced via Claude tool-use, not prompt-engineering for JSON.** We declare a `klaro_response` tool whose input schema is the `AIResponse` shape, then force `tool_choice: { type: "tool", name: "klaro_response" }`. The four sections come back as a typed object. More reliable than asking the model to produce JSON in free text. | Phase 08 build |
| 2026-05-28 | **TaskFlow now shows a calm error state on AI failure.** Previously the user was stuck on "Thinking" forever if the API call failed. The error screen says "That didn't work" with a Try again button that returns to the Review-before-sharing step. Phase 11 may refine further. | Phase 08 build |
| 2026-05-28 | **`reflectionItems` added to TaskConfig** — 3 task-specific `{ label, moment }` items per task, separate from the binary `capabilitiesEarned`. Powers the wireframe's "Recently tried" on /progress with concrete moments ("You reviewed what information to share") rather than generic capability descriptions. | Phase 09 build |
| 2026-05-28 | **"Recently tried" shows items from the most recent task only, not aggregated.** Depth over breadth — matches the wireframe pattern. If the user does multiple tasks, only the latest one's three items appear. Future refinement (an aggregated timeline view) is intentionally not in scope. | Phase 09 design |
| 2026-05-28 | **Suggested Next Step prefers unearned capabilities.** Walks `TASKS` in order, picks the first uncompleted task whose `capabilitiesEarned` includes at least one capability the user has not yet earned. Falls back to "first uncompleted" if everything is already covered. | Phase 09 build |
| 2026-05-28 | **Two new colour tokens for WCAG AA: `warm-amber-deep` (#8C6914) and `mid-gray-deep` (#5F676E).** The brand's `warm-amber` (1.85:1) and `mid-gray` (3.92:1) on canvas don't meet WCAG AA contrast for body text. Added the `-deep` variants for text contexts; reserved the originals for decorative use. Brand intent (warm accent / subtle secondary) is preserved by keeping the originals on accent strips, sparkle icons, and the nav active underline (where bold weight is the primary state indicator). | Phase 10 audit |
| 2026-05-28 | **`prefers-reduced-motion` honoured globally.** A `@media (prefers-reduced-motion: reduce)` rule in `globals.css` clamps all animation and transition durations to 0.01ms. Respects WCAG 2.3.3 and the brand's "calm, not over-animated" intent. | Phase 10 build |
| 2026-05-28 | **TaskFlow AI-error promoted to `role="alert"`** (was `aria-live="polite"`). The error blocks the flow, so screen readers should announce it immediately. ProcessingStep keeps `aria-live="polite"` because it's a transient loading state. | Phase 10 build |
| 2026-05-28 | **Page-entrance fade implemented as CSS keyframe**, not Framer Motion. The brief allowed Framer Motion to be installed in Phase 11; the simple opacity + 6px translate-Y animation didn't justify the dependency. `prefers-reduced-motion` clamps it to 0.01ms. | Phase 11 build |
| 2026-05-28 | **Disabled buttons fixed without opacity.** Old `disabled:opacity-40` washed the klaro-blue button into near-invisibility (light text on light bg). Replaced with explicit colour change: primary CTAs get `disabled:bg-divider disabled:text-mid-gray-deep`; secondary buttons get `disabled:bg-surface disabled:text-mid-gray-deep`. | Phase 11 build |
| 2026-05-28 | **`textSize` preference applied via `html { font-size }`.** Since all Tailwind sizing is rem-based, scaling the root scales the entire UI proportionally. `PreferencesApplier` is a no-render client component that reads from localStorage on mount. | Phase 11 build |
| 2026-05-28 | **`spacing` preference persists but doesn't visually apply.** Setting it writes correctly, and `html[data-spacing]` carries the value for future CSS to consume. Applying it across every gap/padding would require systemic CSS variable refactor — out of scope. | Phase 11 build |
| 2026-05-28 | **`explanationDepth` carried in `AIRequest` and adjusts the Anthropic system prompt.** Brief = 2 sentences no analogies; standard = current behaviour; in-depth = up to 6 sentences with analogy. MockProvider ignores it; only the Anthropic route reads it. | Phase 11 build |
| 2026-05-28 | **Privacy step renamed to "Review before sharing"** in the golden path. The step now explicitly shows the user's typed question for review, with an "Edit my question" link back to Step 1. Checklist grows from 4 items to 5 (adds Signatures). Source: TONE_AND_PRINCIPLES.md "Review before sharing" section. | Tone update |
| 2026-05-28 | **Phase 5 step machine = React state, not URL-driven.** Step transitions happen via `setState` in `TaskFlow`. Going back preserves all typed input and uploaded files. Closing the tab or navigating away discards everything (per the no-persistence rule). URL deep-linking to a specific step is intentionally not supported. | Phase 05 build |
| 2026-05-28 | **`lib/ai/provider.ts` is the single import point for the active AI provider.** Consumers import `provider` from there. The concrete `MockProvider` (Phase 5) and future real providers (Phase 8) are wired in this one file only. Honors the "consumers never depend on a concrete provider" rule from the Phase 0 orientation. | Phase 05 build |
| 2026-05-28 | **Redaction is solid warm-amber fill, not blur.** Per docs/05 and 07: blur can be reversed; a solid rectangle cannot. Continuing with zero rectangles is allowed (the Review-before-sharing step already did privacy's job). Canvas supports mouse + touch; no resize handles for v1. | Phase 05 build |
| 2026-05-28 | **Brand direction: playful minimalist.** Confirmed via side-by-side JPG mockup (`outputs/klaro_today_vs_playful.jpg`). Cream canvas stays; coral (#EE8569) replaces both klaro-blue and warm-amber as the single confident accent; Plus Jakarta Sans replaces Manrope for display (friendly geometric, not Manrope's slightly mechanical feel); warm-dark (#3D2618) replaces deep-blue for headings so the palette reads as one warm family; radii bump up; abstract soft-geometric illustrations (coral blob + yellow companion) replace lucide-icon-in-tinted-box. Target reference: Microsoft Copilot's restrained playful warmth, not Headspace mascot territory. Earlier "editorial notebook / Craft.do" direction explored and parked. | Brand refresh Step 1 |
| 2026-05-28 | **Brand refresh Step 2: tokens added additively, font swapped at the CSS-variable level.** New coral/peach/warm-yellow + warm-dark/warm-mid + warm-canvas tokens added to `tailwind.config.ts` alongside the existing klaro-blue/warm-amber/deep-blue/graphite/mid-gray tokens, so the running app continues to render while Step 3 migrates each surface. Radii scale bumped (DEFAULT 16 → 24). Heading weight 600 → 700 with light negative tracking. Manrope retired; Plus Jakarta Sans loaded via `next/font/google` and bound to the same `--font-manrope` CSS variable so every `font-brand` consumer picks up the new face with zero component edits. `globals.css` updated to use warm-dark for headings, coral-deep for links, coral for focus ring. Semantic CSS variables (`--klaro-accent`, `--klaro-companion`, `--klaro-text` etc.) added for non-Tailwind surfaces. | Brand refresh Step 2 |
| 2026-05-29 | **Brand accent confirmed: terracotta (#D17442 burnt sienna) with warm-yellow companion (#E6B85B).** After Step 2 the user explored coral (rejected), three editorial directions (rejected as "all editorial"), premium playful (rejected as still SaaS-y), lighter outlined (rejected — went too pastel), brighter outlined coral, and three accent comparisons (terracotta / cobalt / mustard, then forest / plum / warm-gray+tomato). Decision shot: `outputs/klaro_three_accents.jpg` panel A. Direction reads grown-up and grounded on the cream canvas; reads less candy than coral and more confident than warm-amber. | Brand refresh Step 2.5 |
| 2026-05-29 | **Card visual language: 0.75px warm outline + soft warm-toned drop shadow combined.** Outlines give clear edge definition; the shadow does the elevation work. Together they read as defined-but-quiet objects lifting gently off the cream canvas. Standard surfaces use `border-outline` (#E8D9C0) + `shadow-sm`; featured / terracotta-leaning surfaces (hero, Answer card) use `border-outline-warm` (#FAC5A0) + `shadow-warm`. CTAs get a slim `terracotta-deep` outline + `shadow-cta` (inset highlight + double drop). Replaces the previous shadow-only or flat-surface patterns. | Brand refresh Step 2.5 |
| 2026-05-29 | **Step 3 landmark Home migration complete; task journey + Progress + Settings deferred to Steps 4 + 5.** Migrated: `TodaysTaskHero` (full rewrite with SVG blob illustration), `TaskCard`, `TaskRow`, `PrimaryNav`, `PageHeading`, `ExploreAllTasks`, `app/layout.tsx` (body color graphite → warm-dark, wordmark mark to outlined two-shape), `app/page.tsx` (section label pattern), `lib/tasks/icons.tsx` (5-family → 2-family TERRA/AMBER alternation). The task journey and Progress will look mid-migrated (legacy klaro-blue / warm-amber / graphite still referenced) until those steps are executed. Acceptable for now. | Brand refresh Step 3 |
| 2026-05-29 | **Step 4 task journey migration complete; Progress + Settings remain on legacy tokens for Step 5.** All 9 task-journey components rebuilt in the playful-minimalist + terracotta language: `AIResultCard` (featured Answer with warm gradient + outline-warm + shadow-warm + 18px body; supporting trio in standard outline+shadow cards with terracotta-dot labels); `IntentStep` (active option pill in terracotta + tint, terracotta focus on textarea, unified CTA); `ReviewBeforeSharingStep` (warm-canvas quote card, terracotta-ring checklist circles); `UploadStep` (warm dashed drop zone, terracotta drag-over, warm-canvas preview); `RedactionStep` (warm shell — REDACTION_FILL deliberately stays graphite for safety contrast); `ProcessingStep` (pulsing terracotta dot eyebrow); `ReflectionCard` (terracotta-tint capability badges, warm-canvas item rows); `StepIndicator` (terracotta progress dots); `TaskFlow` error state (warm tone + unified retry pill). CTA pattern unified across the entire app: terracotta filled pill with 0.75px terracotta-deep outline, shadow-cta, arrow-chip on right that translates 2px on hover. | Brand refresh Step 4 |
| 2026-05-29 | **Step 5 Progress + Settings migration complete; brand refresh functionally done from the user's perspective.** Migrated: `RecentlyTriedCard` (outline+shadow on white paper, terracotta Sparkles), `CapabilityCard` (earned items get terracotta-tint badge + Check glyph, not-yet outlined warm-mid), `SuggestedNextCard` (bare circle replaced with full task-preview row using sticker icons + outline+shadow on warm-canvas), `SegmentedControl` (warm-canvas track + inset shadow, terracotta-deep active segment with outline-warm and shadow-sm), `app/settings/page.tsx` (warm-dark labels, outlined input with terracotta focus). Every component-level reference to legacy tokens (klaro-blue / deep-blue / warm-amber / mid-gray / graphite) is gone — remaining mentions are only in comments. Step 6 = housekeeping delete of unused tokens. | Brand refresh Step 5 |
| 2026-05-29 | **Step 6 token cleanup complete; brand refresh closed.** Deleted `klaro-blue`, `deep-blue`, `warm-amber`, `warm-amber-deep`, `mid-gray`, `mid-gray-deep`, and `graphite` from `tailwind.config.ts`. Token system is now tight: surfaces (canvas / surface / elevated / warm-canvas), terracotta family (4 stops), warm-yellow companion (2 stops), peach-tint, warm text palette (dark / mid / soft), outline pair (outline / outline-warm), and functional semantics (divider / success / warning / error). Tailwind config docstring rewritten to document the closed system + the outline+elevated card pattern. No visual change from this step. Step 7 (polish + iterate based on lived feel) reserved for future. | Brand refresh Step 6 |
| 2026-05-29 | **Step 7a per-task hero illustrations.** Added `lib/tasks/illustrations.tsx` with nine self-contained SVG components (one per task slug) and a `Generic` fallback. Shared 220×220 viewBox, shared gradient defs (`hi-primary`, `hi-companion`, `hi-peach`), shared palette via CSS variables. Each composition nods abstractly to the task (idea-sparks for get-ideas, soft C-hook for ask-question, envelope-with-stamp for write-first-email, shield-with-check for fact-check, etc.) without using faces, mascots, or literal icons. `TodaysTaskHero` calls `getTaskHeroIllustration(task.slug)` and renders the matching composition; hero layout unchanged. Reference shot in `outputs/klaro_hero_illustrations.jpg`. | Brand refresh Step 7a |
| 2026-05-29 | **Step 7b spacing preference now applies visually.** Added `--klaro-density` CSS variable in `globals.css` that scales 0.78 (compact) / 1.0 (standard) / 1.22 (roomy). Applied to top-level page rhythm only: `<main>` vertical padding + direct-child gaps on the `flex.flex-col` (Home, Settings) and `grid` (Progress, TaskFlow) page wrappers. Card internal padding + micro-gaps deliberately NOT scaled so cards keep their tuned rhythm regardless of density setting. Selector specificity (`html[data-spacing] main > .flex.flex-col`) overrides Tailwind utility classes without `!important`. PreferencesApplier already sets `<html data-spacing>` from localStorage; Step 7b wired the visual consumption side. | Brand refresh Step 7b |
| 2026-05-29 | **First Vercel deployment shipped.** Live at https://klaro-ai-confident.vercel.app via GitHub → Vercel auto-deploy. Initial deploy ran in mock mode (no Anthropic env vars set). Two build fixes required to ship: (a) `Anthropic.Messages.ContentBlockParam` does not exist in SDK 0.27 — replaced with a local union `TextBlockParam \| ImageBlockParam`. (b) unescaped apostrophe in `app/not-found.tsx` blocked production build — escaped to `&rsquo;`. Lesson: `tsc --noEmit` does not catch Next.js-specific ESLint rules; run `npm run build` at every phase boundary. | First deploy |
| 2026-06-03 | **Reset progress in Settings.** Added `resetProgress()` helper in `lib/storage/store.ts` clearing `klaro:capabilities`, `klaro:recentTasks`, `klaro:onboarding`. Preferences (display name, text size, spacing, explanation depth) deliberately preserved. Settings page got a two-click confirm UI: outlined "Reset progress" button → "Are you sure?" inline confirm with primary "Yes, reset" + Cancel → confirmation pill ("Progress reset. You're starting fresh."). No modal; matches Klaro's calm tone. `router.refresh()` called after reset so Home + Progress pick up the cleared state on next visit. | Post-ship UX request |
| 2026-06-03 | **Hero illustration swapped from SVG to PNG.** `public/hero.svg` replaced by `public/hero_img.png` — softer 3D-style render of laptop + speech bubble + book stack + leaves. Palette aligns with brand (peach + terracotta + sage + cream) instead of fighting it (old SVG was magenta + hot-pink + bright-red). Decision shot: `case_study/klaro_hero_swap_mockup.png` (side-by-side). Single shared image across all tasks; the per-task system in `lib/tasks/illustrations.tsx` (Step 7a) was built but never wired in. **Both files deleted in same session** since `TodaysTaskHero` is the only consumer. Tradeoff: PNG is ~590KB vs SVG ~19KB. Acceptable for now; can be optimized to WebP (~80KB) later. | User-supplied asset |
| 2026-06-03 | **Hero `<img>` scale bumped from 1.2 to 1.45.** New PNG fills less of its 1024×1024 canvas than the old SVG filled its viewBox, so the in-card visual presence was lighter than intended. Bumped to `scale-[1.45]` (~21% larger) to restore equivalent visual weight. | Visual tuning |
| 2026-06-03 | **Hero card aligned with page padding on mobile + desktop.** Removed `-mx-6 sm:-mx-10` from the hero `<section>`. Old behavior bled the hero beyond the content column (intentional billboard effect, never quite right on mobile). New behavior: hero shares the same horizontal padding as TaskCards, "OR PICK ANOTHER" label, and `ExploreAllTasks`. Reads as one of the cards instead of a floating banner. | Mobile alignment request |
| 2026-06-03 | **`ExploreAllTasks` accordion header corner radius is now conditional on open state.** Closed: `rounded-md` (all corners rounded, hover fill matches the full section card). Open: `rounded-t-md` (top corners rounded, bottom corners square so the hover fill meets the first `TaskRow` cleanly with no inset gap). Same hover color (`#FDB322/15`); just the radius changes. | Visual polish |
| 2026-06-03 | **AI request markers in `AIResultCard` switched from dots/circles to MoveRight arrows.** "AI helped by" list (warm-yellow-deep dot → MoveRight arrow in warm-yellow-deep), "Consider checking" list (warm-mid outlined circle → MoveRight arrow in warm-mid). Cleaner directional read. Preserves each list's color identity. | Visual polish |
| 2026-06-03 | **Privacy "Things to leave out" checklist markers switched to white-X-on-red-circle.** Previously terracotta-ring circles (then briefly MoveRight arrows). The X-on-red reads as "exclude these" more clearly than an arrow, which read as "do this next." | Visual polish |
| 2026-06-03 | **Real Anthropic provider went live.** Added `NEXT_PUBLIC_AI_PROVIDER=anthropic` and `ANTHROPIC_API_KEY=sk-ant-...` env vars in Vercel (Production + Preview). First real-AI deploy failed with 404 on `claude-3-5-sonnet-latest` — that model alias was retired when Anthropic moved to the 4-series. **Pinned to explicit `claude-sonnet-4-6` instead of an alias** to avoid surprise breakages from future deprecations. Tradeoff: explicit pinning requires manual version bumps but eliminates "alias 404" failures. Cost note: Klaro's short structured responses are a great fit for Haiku 4.5 (`claude-haiku-4-5-20251001`); model swap is one-line if cost matters. | First real-AI deploy |
| 2026-06-03 | **Dead code removed.** Deleted `public/hero.svg` (replaced by `hero_img.png`) and `lib/tasks/illustrations.tsx` (built in Step 7a, never consumed by any component). Confirmed no remaining references via grep before deletion. | Cleanup |

Append a row here whenever a decision is made that future sessions need to honor.

---

## Open Questions

All open questions from the previous orientation pass have been resolved (see Decision Log). New questions will be added here as they arise during phase work.

---

## Session Continuation Instructions

At the start of every new session:

1. Read `CLAUDE.md` (this file) in full.
2. Read `docs/00_BUILD_BRIEF.md`.
3. Check the **Current Build Phase** section above to know where work stands.
4. Read the relevant section of `docs/06_CLAUDE_EXECUTION_PLAN.md` for the current and next phase only.
5. Read `docs/05_BRAND_GUIDELINES.md` and `docs/07_DESIGN_SYSTEM.md` if the upcoming phase touches visuals, typography, motion, or spacing tokens.
6. Read `docs/TONE_AND_PRINCIPLES.md` before writing any user-facing copy (headings, body, microcopy, errors, AI response framing).
7. Read `docs/golden_path_ask_question.md` before implementing Phase 5 (Task Flow) or any task-journey step.
8. Read `docs/capability_map.md` before working on Phase 9 (Reflection + Progress) or task-to-capability wiring.
9. Read PRDs (`01`–`04`) only if priority docs leave a specific question unanswered.
10. Confirm the current phase with the user before doing any work.
11. Honor the workflow rules: plan, build, review, **stop**, wait for approval.

When a phase finishes:

- Update the **Current Build Phase** section.
- Add any new decisions to the **Decision Log**.
- Move resolved items out of **Open Questions** (into the Decision Log if they're durable choices).
- Update **Folder Structure** if new directories were created.
- Then stop and report.
