# Klaro — problems faced and how we solved them

A complete inventory of issues encountered during the Klaro build, organized by category. Each entry pairs the problem with the fix that landed.

---

## Build and deploy

**1. Anthropic SDK type `ContentBlockParam` did not exist.**
The route file referenced `Anthropic.Messages.ContentBlockParam` but SDK 0.27 never exported that union. Build failed at `route.ts:108:43`.
*Fix:* declared a local union of only the two block kinds the route actually pushes: `TextBlockParam | ImageBlockParam`. Both are real exports on `Anthropic.Messages.*` and compose correctly into `MessageParam.content`.

**2. Unescaped apostrophe in `not-found.tsx` blocked production build.**
ESLint rule `react/no-unescaped-entities` failed on `couldn't`. Local `tsc --noEmit` did not catch it; `next build` did.
*Fix:* escaped to `&rsquo;` to match the curly-apostrophe style used everywhere else in the codebase.

**3. Git refused first commit (no user identity).**
`*** Please tell me who you are.`
*Fix:* ran `git config --global user.email "..."` and `git config --global user.name "..."`, then retried the commit.

**4. `npm run build` not run between phases.**
`tsc --noEmit` was run regularly but missed Next.js-specific lint rules (#2) and SDK type issues (#1). Both surfaced only at ship time.
*Fix:* lesson learned, not a code change. Should be part of every phase boundary check going forward.

---

## Tooling and environment

**5. `next/font/google` did not include Elms Sans in its allowlist.**
Trying to register Elms Sans the same way as Open Sans threw a `next/font` error.
*Fix:* loaded Elms Sans via a manual `<link rel="stylesheet">` in `<head>`, then defined `--font-manrope` in `:root` so every `font-brand` consumer picked up the new face without component edits.

**6. Adobe Illustrator SVG exports had trailing null bytes.**
`hero.svg` and `logo.svg` arrived with binary padding after the closing `</svg>`. Browsers rendered them as broken / black-only images.
*Fix:* a small Python script trimmed everything after `</svg>` via `data.rfind(b'</svg>')`. The cleaned files were placed in `public/`.

**7. OneDrive sync interfered with cross-mount writes.**
Copying files between the Linux sandbox and the Windows OneDrive folder sometimes left them truncated or padded with garbage. Same null-byte pattern as #6, different cause.
*Fix:* treat `public/` as the canonical location for SVG assets; avoid writing through the OneDrive sync layer when possible. Same pattern reappeared at the end on `ReflectionCard.tsx` and `ReviewBeforeSharingStep.tsx` in the sandbox view but did not block the Windows build.

**8. node_modules installed by user on Windows, not by agent.**
Risked cross-platform binary mismatch between the Linux sandbox and the Windows runtime.
*Fix:* user always ran `npm install` themselves. Agent never installed packages.

**9. Elms Sans weight check returned only one weight initially.**
Default Linux user-agent on the Google Fonts CSS API returned a single weight, suggesting Elms Sans only shipped in one weight.
*Fix:* re-ran the check with a Chrome user-agent and confirmed all 9 weights (100-900) are available. User had spotted the inconsistency first.

**10. Playwright Chrome executable path mismatch.**
First screenshot attempt failed with "executable doesn't exist at chromium-1223/chrome-linux/chrome". The path was actually `chrome-linux64/chrome`.
*Fix:* used `find` to locate the actual binary path, then passed `PLAYWRIGHT_BROWSERS_PATH` and the correct `executablePath`.

**11. Claude-in-Chrome extension not connected.**
Wanted to take live screenshots; the extension required a paired Chrome browser the user did not have set up.
*Fix:* switched to running Playwright in the sandbox against the public Vercel URL.

---

## Visual rendering

**12. Map icon middle lines invisible despite gradient stroke.**
Tried CSS specificity overrides, `!important` rules, and selector tweaks. None worked. Spent several rounds chasing the wrong root cause.
*Fix:* real root cause was that zero-width `<line>` SVG elements cannot resolve a gradient using the default `objectBoundingBox` units. Switched to inline SVG components per task slug, with `gradientUnits="userSpaceOnUse"` and absolute coordinates on the gradient. Lines rendered correctly.

**13. Hero collapsed on desktop after Phase 4.**
`md:grid-cols-12` and `md:col-span-7` were never generated in the CSS bundle, so the two-column hero rendered as a single stacked column.
*Fix:* Tailwind JIT only scans files in its `content` array. Added `./components/**` to `tailwind.config.ts`. A one-line fix that took noticeably longer than one line of debugging.

**14. Disabled buttons washed to near-invisibility.**
`disabled:opacity-40` over light brand text on canvas read as ghosted to the point of being unreadable.
*Fix:* replaced with explicit color tokens on the disabled state: `disabled:bg-divider disabled:text-mid-gray-deep` for primary, `disabled:bg-surface disabled:text-mid-gray-deep` for secondary. Clearly muted, clearly readable.

**15. Circle icons in three lists were vertically misaligned after a text-size sweep.**
After the site-wide text-base → text-lg bump, the markers in AI helped by / Consider checking / privacy checklist no longer aligned with their text.
*Fix:* changed `items-start` to `items-center` on each list item, removed the `mt-1` offsets, added `leading-snug` to the text spans.

**16. Sparkles icon on Progress page was top-aligned with the whole text block.**
The user wanted alignment with the title only, not the title + moment block.
*Fix:* restructured each `<li>` so the icon sits in a flex row with the title only, and the moment text drops below with `pl-[42px]` (icon width + gap).

---

## Architecture and information architecture

**17. `/review` was originally a top-level nav destination.**
Per the no-persistence rule, `/review` had no meaningful state outside an active task. It would have been an empty-state trap.
*Fix:* deleted the route, folded the Review screen into the `/task/[taskSlug]` state machine as an internal step. Top-nav reduced from 4 items to 3 (Today / Progress / Settings).

**18. Initial pill nav felt out of category.**
A Mobbin sweep of calm / wellness / learning peers (Headspace, MasterClass, Brilliant) showed text-with-underline was the category default; pills read as filter or CTA in that peer group.
*Fix:* swapped pill nav for text + warm-amber underline for active. Same three destinations.

**19. Phase 4 home layout did not match the wireframe direction.**
A two-column "greeting + 2x2 grid" was built before re-checking the wireframe set.
*Fix:* rebuilt as single-column with `TodaysTaskHero` + 3 alternative TaskCards + `ExploreAllTasks` per `01_HOME_HERO_ALTERNATIVE.jpg`.

**20. Brand refresh had to migrate the entire codebase without breaking the running app.**
Replacing every legacy token at once would have left the dev server unusable for hours.
*Fix:* additive token strategy. Step 2 added new tokens alongside legacy ones. Steps 3-5 migrated components landmark-by-landmark. Step 6 deleted legacy tokens once nothing referenced them.

**21. Coral palette tokens added in Step 2 then replaced wholesale in Step 2.5.**
Direct cost of not waiting for direction confirmation before merging tokens into the live config.
*Fix:* user input on direction; the coral tokens were swapped out for terracotta. Lesson: branch token changes; do not commit them until the visual direction is confirmed.

**22. Generic competence / "tasteful SaaS wireframe" feel after Phase 11.**
The product met every documented rule and was visually unmemorable. Agent had declared the build complete.
*Fix:* user surfaced the issue; ran a full brand-direction exploration (Steps 1-7b) using side-by-side JPG mockups before any code was touched. Landed on playful-minimalist with terracotta + warm-yellow on cream canvas.

---

## Code-level bugs

**23. `IntentStep` Continue button bug.**
Build-time bug in Phase 5; details in CLAUDE.md history.
*Fix:* corrected in same phase.

**24. Root `not-found` regression after Phase 2.**
Investigation revealed root cause; restored with a fix in the not-found handler.

**25. `TaskFlow` stuck on "Thinking" forever if the AI call failed.**
No error UI in Phase 5; user could not recover from a failed API call.
*Fix:* Phase 8 added a calm error state ("That didn't work") with a Try again button that returns to the Review-before-sharing step. `role="alert"` for screen readers.

**26. AI free-text JSON parsing would have been unreliable.**
Asking the model to produce JSON in plain text frequently fails or drifts.
*Fix:* enforced structured output via Claude's tool-use mechanism. Declared a `klaro_response` tool whose input schema is the `AIResponse` shape, then forced `tool_choice: { type: "tool", name: "klaro_response" }`. Four sections came back as a typed object.

---

## Tone and UX

**27. Initial copy had em-dashes, hype words, productivity framing.**
Brief required calm neutral voice; first pass drifted toward "unlock", "dive in", and conversational coaching.
*Fix:* Step 2 of the brand-refresh phase did a tone sweep across every user-facing string. The TONE_AND_PRINCIPLES doc was extended with explicit avoid-lists and the dual-voice rule (UI warm, AI neutral).

**28. Redaction fill in warm-amber felt attention-grabbing.**
Per docs the redaction had to be solid (not blur), but amber competed with brand accents while pretending to be a safety tool.
*Fix:* swapped to graphite `#2C3137`. Reads as "this area is covered" without grabbing attention. The redaction colour deliberately did not migrate during the brand refresh.

**29. Upload error message was too technical.**
Drag-and-drop bypassed the picker's `accept` attribute, so an MP4 could land. The initial message used technical language.
*Fix:* rewrote calm and non-fear-based: "That's not a PNG or JPG. Please choose an image file."

**30. "Welcome back. Where would you like to go today?" did not feel right.**
Returning-user subtitle felt slightly off, possibly because the answer space was unclear.
*Fix:* user suggested "Welcome back. Pick up where you left off, or try something new." Adopted.

---

## Accessibility

**31. `warm-amber` (`#E6B65B`) contrast was 1.85:1 on canvas.**
Failed WCAG AA for text usage. Used widely as text in early phases.
*Fix:* added `warm-amber-deep` (`#8C6914`, 4.8:1) and reserved `warm-amber` for decorative use only (accent strips, decorative icons).

**32. `mid-gray` (`#767E87`) contrast was 3.92:1 on canvas.**
Failed WCAG AA for body text (just barely).
*Fix:* added `mid-gray-deep` (`#5F676E`, 5.5:1) for secondary body text. `mid-gray` retired to decorative only.

**33. No respect for `prefers-reduced-motion`.**
Page-entrance fade and other transitions ran for users who had requested reduced motion.
*Fix:* `@media (prefers-reduced-motion: reduce)` rule in `globals.css` clamps every animation and transition duration to 0.01ms. Respects WCAG 2.3.3.

**34. `TaskFlow` AI error was `aria-live="polite"`, not announced urgently.**
The error blocks the flow, so screen readers should announce it immediately.
*Fix:* promoted to `role="alert"`. `ProcessingStep` kept polite because it is a transient loading state.

---

## Settings and features

**35. Three Settings options were not functional but were visible.**
Text size, spacing, and explanation depth all persisted to localStorage but had no visible effect (originally).
*Fix:* user weighed "remove or disable" and chose disable. Each control got an `(coming soon)` italic hint and was marked disabled. Underlying state still persisted.

**36. `spacing` preference persisted but did not visually apply.**
Setting Compact / Standard / Roomy wrote the value but nothing consumed it.
*Fix:* Step 7b added a `--klaro-density` CSS variable in `globals.css` (0.78 / 1.0 / 1.22) consumed by selectors on `<main>` padding and direct-child gaps of page wrappers. Card internal padding deliberately did not scale.

**37. Reset progress was missing.**
No way for a user to wipe their state and start fresh.
*Fix:* added `resetProgress()` helper to clear `klaro:capabilities`, `klaro:recentTasks`, and `klaro:onboarding` (preferences preserved). Settings page got a two-click confirm UI with idle / confirming / done states.

---

## Documentation

**38. No visual record of build phases 1-11.**
The product evolved over 11 phases without any captured visuals. The "tasteful SaaS" baseline that triggered the brand refresh is only described.
*Fix:* not recoverable for the historical phases. Captured the final form via Playwright after deploy (`case_study/03_final_form/` has 9 screenshots covering Today, the full task journey, Progress, and Settings).

---

## Pattern

A recurring shape across these problems: the failures were almost never where I first looked. The Map icon was framed as a CSS specificity problem when it was an SVG paint-server problem. The hero collapse was framed as a layout problem when it was a Tailwind content-scanning problem. The "tasteful SaaS" feel was framed as polish-not-yet-done when it was a brand-direction problem. Reframing the question was usually the fix that mattered; the code change after that was small.
