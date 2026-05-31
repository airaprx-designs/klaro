# Klaro — visual phases walkthrough

A chronological walk through the visual evolution of Klaro, organized for case-study use. Sources: original wireframes (`01_wireframes/`) and brand-exploration mockups (`02_brand_exploration/`).

**Important caveat.** The build phases 1 through 11 (scaffold → polish) were not visually documented at the time. There are no screenshots of the early shell, the post-Phase-4 TaskCard grid, the pre-brand-refresh "tasteful SaaS" state, or the polish phase. The visual record below covers (a) the original design intent (wireframes) and (b) the brand-direction exploration that happened after Phase 11 completed and led to the current look.

To fill the gap for the case study, capturing screenshots of the deployed Klaro now (and possibly stepping through a task journey on the live URL) is the most efficient way to document the "final form" alongside these earlier artifacts.

---

## Phase A — Wireframes (input, before any code)

These were the user-supplied sketches that defined the IA, layout, and content of the product before development. They are intentionally low-fidelity. Their job was to communicate structure and copy, not look.

Files in `01_wireframes/`:

- `01_HOME_NEW_USER.jpg`, `01_HOME_RETURNING_USER_1.jpg`, `01_HOME_RETURNING_USER_2.jpg` — three Home variants showing the new-user vs returning-user split. The build initially implemented the new-user variant; the returning-user compact-hero variant was parked for future.
- `01_HOME_HERO_ALTERNATIVE.jpg`, `01_HOME_HERO_RETURNING.jpg`, `01_HOME_HERO_MOBILE.jpg` — the hero direction that replaced the original Phase-4 two-column "greeting + 2x2 grid" with a single Today's task hero plus alternatives. This is the layout the live product uses.
- `01_PROGRESS.jpg` — the three-stacked-card pattern on /progress (Recently tried, Capabilities, Suggested next step).
- `02_SETTINGS.jpg` — the form-style settings page.
- `03_TASK_01_INTENT.jpg` through `03_TASK_04_REFLECTION.jpg` — the four key steps of the task journey: intent, privacy review, AI result review, and reflection.

What these define: structure, hierarchy, copy direction, the existence of the dual-voice rule (AI vs UI), the five-item privacy checklist, the four-section AI response shape (Answer / AI helped by / Consider checking / Suggested next step).

What these deliberately do not define: palette, typography, illustration style, brand feeling.

---

## Phase B — Initial build (Phases 1 through 11, no captured visuals)

Built between 2026-05-27 and 2026-05-28 in eleven phases:

1. Scaffold (Next.js + TypeScript + Tailwind)
2. Responsive shell + accessibility floor
3. Brand tokens applied (Manrope + Inter + the original palette of canvas / klaro-blue / deep-blue / warm-amber / graphite)
4. TaskCard + TaskRow + ExploreAllTasks + Progress cards
5. Task journey state machine (8 components: IntentStep → ReviewBeforeSharingStep → UploadStep → RedactionStep → ProcessingStep → AIResultCard → ReflectionCard)
6. localStorage persistence (preferences, capabilities, recent tasks, onboarding)
7. Upload + Redact polish
8. Anthropic provider behind the same interface as the mock
9. Reflection items + Progress refinement
10. WCAG AA accessibility pass
11. Final polish (page-entrance fade, disabled buttons, textSize preference, explanationDepth)

The result at the end of Phase 11 was a functionally complete product that the user described as a "tasteful SaaS wireframe." It was correct against every documented rule, but visually generic. No screenshots were taken of this state. **This is a documented gap in the visual record.**

Decision log entries 1 through 99 in CLAUDE.md cover every architectural and code-level choice made during this period.

---

## Phase C — Brand-direction exploration (post Phase 11)

After Phase 11 completed, the user surfaced the "tasteful SaaS" feel and we ran a brand exploration. This is the period that was visually documented, because each direction was rendered as a JPG composite before any component code was touched.

Files in `02_brand_exploration/`, in approximate decision order:

### 1. `klaro_today_vs_craft.jpg` — Editorial / Craft.do direction

The first alternative explored. Mimicked Craft.do's "editorial notebook" feel: serif headings, more typographic restraint, lots of whitespace. **Parked because it read as a writing app rather than a guided product.** The product needed warmth and approachability, not the cool intellectual feel of a writing tool.

### 2. `klaro_today_vs_playful.jpg` — Playful minimalist (coral) direction

The second alternative, side by side with the current "tasteful SaaS" baseline. Cream canvas stayed; a single confident coral accent replaced both warm-amber and klaro-blue; friendly geometric headings (Plus Jakarta Sans) replaced Manrope; rounder shapes throughout; abstract soft-geometric illustrations replaced lucide-icons-in-tinted-boxes. **This direction was confirmed.** The instructions for the next steps came from this image.

The benchmark referenced: Microsoft Copilot's restrained playful warmth, not Headspace's mascot territory.

### 3. `klaro_three_directions.jpg` — Three Dribbble-quality mockups

A high-fidelity exploration that tested three executions of the playful-minimalist direction at near-final visual quality. Used to feel out the level of polish achievable before any code was written.

### 4. `klaro_premium_playful.jpg` — Premium playful-minimalist iteration

A push toward a more polished, magazine-cover quality of playful-minimalist. **Rejected because the polish read as SaaS-y in the way the original look had.** The lesson: turning up production value alone does not make a product feel itself.

### 5. `klaro_lighter_outlined.jpg` — Lighter palette + soft outlined cards

Tested whether reducing color saturation and using outlined cards instead of filled would land warmer. **Rejected because the palette went too pastel.** The product needed something more grounded.

### 6. `klaro_brighter_outlined.jpg` — Brighter colors on the original structure

Iteration in the opposite direction: keep the outlined card pattern, brighten the accents. Better than the pastel attempt; still not quite right.

### 7. `klaro_three_accents.jpg` — Terracotta / cobalt / mustard comparison

The decisive mockup. Three different accent families compared on the same playful-minimalist structure. **Terracotta was selected.** It read grown-up and grounded on the cream canvas, less candy than coral and more confident than warm-amber. The decision was visible in the image in a way no description had captured.

### 8. `klaro_three_families.jpg` — Forest / plum / warm-gray+tomato

A second comparison ran just after the terracotta call, testing whether any other family changed the conclusion. **It did not.** All three were rejected. Terracotta confirmed.

### 9. `klaro_hero_illustrations.jpg` — Per-task hero illustrations

After terracotta was confirmed and the migration was complete (refresh Steps 3 through 6), the final visual addition was per-task hero illustrations. Nine abstract SVG compositions, one per task slug, sharing a 220 by 220 viewBox and a single palette (terracotta primary + warm-yellow companion + peach support + small warm-dark accent). The reference image shows all nine on the warm hero background.

---

## Phase D — Final form (live build, captured 2026-05-29)

The deployed Klaro at https://klaro-ai-confident.vercel.app, captured via headless Chrome at 1440×900 viewport (2× DPI). Files in `03_final_form/`:

- **`01_today_home.png`** — Today screen. Greeting reads time-of-day ("Good evening"); the hero surfaces *Get ideas* with a custom abstract illustration (laptop with speech bubble, books, apple); three alternative TaskCards below ("Ask a question", "Write a greeting", "Plan an event or trip"); ExploreAllTasks disclosure at the bottom.
- **`02_task_intent.png`** — Step 1 of 4 of the *Get ideas* journey. Three intent chips ("Something I want to make or write", "A decision I'm thinking about", "Something I want to try"), labeled textarea below with example placeholder, Continue CTA disabled until selection.
- **`02b_task_intent_filled.png`** — Same screen with a chip selected and the textarea filled. Step indicator dot 1 is active terracotta.
- **`03_task_review_before_sharing.png`** — Step 2 of 4. The user's question quoted back inside a warm-canvas card; "Edit my question" link below; the privacy checklist ("Things to leave out") with white X on red-circle markers.
- **`04_task_processing.png`** — Step 3 of 4. Calm "Thinking" eyebrow with pulsing terracotta dot, "One moment." heading. No spinner.
- **`05_task_result.png`** — Step 3 of 4 (Read AI's answer). The four-section AI response: featured Answer card (warm gradient, larger body), then AI helped by / Consider checking / Suggested next step in supporting outline+shadow cards. MoveRight arrows in the helped-by and checking lists.
- **`06_task_reflection.png`** — Step 4 of 4. Centered "YOU FINISHED" overline, "Nicely done." display heading, capability badge ("Breaking it into smaller steps") with terracotta-tint check, two CTAs.
- **`07_progress.png`** — Progress page, showing real persisted state from the just-completed task. "You've recently tried" lists the three reflection moments from Get ideas; "You are now capable of" shows "Breaking tasks down" earned (terracotta-tint Check badge); "Suggested next step" surfaces Ask a question as the next Level 1 task with a task-preview row.
- **`08_settings.png`** — Settings page. Functional display-name input; three disabled segmented controls (Text size, Spacing, Explanation depth) with "(coming soon)" hints; the Reset progress section at the bottom with its outlined button.

These eight screenshots are the complete top-level surface of the product. The upload + redact path (used in `explain-screenshot` and `understand-document`) is not captured here; if you want it, run the same script on either of those task slugs and add `03b_upload.png` + `03c_redact.png`.

### What landed in the final form that was not in any wireframe or mockup

- Terracotta-to-warm-yellow gradient on task icons and Sparkles (`#F97433 → #FDB322` at 45°)
- Hot-pink (`#E04974`) for step indicator progress dots and nav active highlight
- `#FDB322/15` (warm-yellow at 15% opacity) hover tint on all cards and option pills
- Elms Sans heading font, replacing Plus Jakarta Sans in the late polish
- MoveRight arrow icons replacing dot markers in the AI helped by / Consider checking lists
- White X on red circle for the privacy "Things to leave out" list
- +20px horizontal padding on all task-page cards
- Reset progress two-click confirm in Settings

---

## Recommendation for the case study

The bundle is incomplete on one important side: there is no "before" state to anchor the brand refresh against. The "tasteful SaaS" baseline that triggered the brand exploration is only described, not shown.

If the case study calls for a true before/after, one option is to git-revert temporarily to a commit before the brand refresh, capture screenshots, then return to the current state. With the current git history (which starts at "Initial commit" after all work was done), this is not possible from this repo. The earliest visible state in any captured image is `klaro_today_vs_playful.jpg`, which already includes "current" on the left as a comparison baseline; the "current" panel in that image is the closest record of the pre-refresh look that survives.

For documenting the final form, capturing the live Vercel deploy is the next step. Walking through Today, a task journey end-to-end (Ask a question is a good choice), Progress, and Settings gives a complete visual story when paired with the wireframes and brand exploration in this folder.
