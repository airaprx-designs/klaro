# Klaro retrospective

A reflection on the Klaro build from the AI-collaborator perspective. Written after the first successful Vercel deploy on 2026-05-29.

---

## What worked

The phased build plan was the single most useful structural decision. Eleven explicit phases, each with a stop-and-wait gate before moving on, kept the project from sprawling. When ambiguity came up mid-phase, the rule "we are in Phase 5, not Phase 7" pushed work back into scope instead of into a side-quest.

CLAUDE.md as a durable memory document worked better than expected. The decision log in particular stopped us re-litigating settled questions. When I came back into a session and re-read it, the constraints (no persistence of user content, no gamification, dual-voice rule, brand tokens are the source of truth) re-entered context cleanly without re-explanation.

Mock-first AI was the right call. The provider adapter (`lib/ai/provider.ts`) and the `MockProvider` / `AnthropicProvider` pair meant the swap to real Claude was one environment variable and zero changes to consumer code. That's exactly how the brief intended it, and the architecture held up.

Mocking visual directions as JPG composites before writing any code saved real time during the brand refresh. Three side-by-side panels of "tasteful coral / editorial / playful minimalist", then later three accents (terracotta / cobalt / mustard), let the user make an aesthetic call from a visual comparison instead of from a paragraph of description. The terracotta direction was clearly the right one in the image. It would have been hard to choose from words alone.

Tone enforcement via a real document the codebase referenced (TONE_AND_PRINCIPLES.md) was more effective than tone-as-vibe. When new copy went in, the rule "no em dashes, no exclamation marks, no hype words, dual voice for AI vs UI" was something we could check against, not just feel toward.

The two-click confirm pattern for the Reset progress button matched the calm tone without needing a modal. Felt like a small thing; was actually a tone decision in disguise.

---

## What problems we faced and how we fixed them

Several issues recurred enough to be worth naming.

**OneDrive interfered with the file system in non-obvious ways.** Adobe Illustrator SVG exports arrived with trailing null bytes (logo.svg, hero.svg). Cross-mount file copies between the Linux sandbox and the Windows OneDrive folder sometimes left files truncated or padded with garbage. The fix that finally stuck was treating the `public/` copies as canonical and not copying through OneDrive's sync layer when possible. The same null-byte pattern came back at the end on `ReflectionCard.tsx` and `ReviewBeforeSharingStep.tsx` in the sandbox view, though it did not block the Windows build.

**The Map icon's middle lines were invisible.** The root cause was not CSS specificity; it was that zero-width `<line>` SVG elements cannot resolve a gradient that uses the default `objectBoundingBox` units. The fix was to switch the per-task icons to inline SVG components with `gradientUnits="userSpaceOnUse"` and absolute coordinates. Several rounds of CSS-override attempts failed first because I was treating it as a cascade problem instead of an SVG-paint-server problem.

**`next/font/google` did not have Elms Sans in its allowlist.** Solution: load Elms Sans via a manual `<link>` in `<head>` and define `--font-manrope` in `:root` so every `font-brand` consumer picked up the new face without component edits. The trick was that the CSS variable was already the indirection layer; we did not need next/font to make it work.

**Tailwind JIT did not generate classes used only inside `components/**`.** The hero collapsed on desktop because `md:grid-cols-12` and `md:col-span-7` were not in the generated stylesheet. Fixed by adding `./components/**` to the `content` array in `tailwind.config.ts`. This was a one-line fix that took noticeably longer than one line of debugging.

**Build failed twice on production-only errors:** once on the Anthropic SDK type `ContentBlockParam` not existing in version 0.27 (the union exists only inline inside `MessageParam.content`), and once on an unescaped apostrophe in `not-found.tsx`. Both were easy fixes once visible. Both were preventable if I had run `npm run build` (not just `tsc`) before declaring phases complete.

**Disabled buttons washed to near-invisibility** because `disabled:opacity-40` over light brand text on canvas read as ghosted. Fixed by changing color tokens on disabled state (`disabled:bg-divider disabled:text-mid-gray-deep`) instead of using opacity. A small thing that mattered for accessibility.

**The IA had a routing mistake** that the user caught: `/review` was originally a top-level route, but with the no-persistence rule there was nothing for it to render outside an active task. We deleted it and folded Review into the task journey state machine. I should have spotted this in Phase 2 from the brief alone, not in Phase 2 review.

---

## What I think I was good at

Following process. Stopping at phase boundaries. Not bargaining for extra scope inside a phase. When the user said "stop and wait for approval," I waited.

Architectural separation. The storage layer, the AI provider adapter, the tasks-as-config pattern, and the icon/illustration registries were all set up so later phases could compose without rewriting earlier ones. When the brand refresh needed every component to swap palettes, the work was real but mechanical; nothing was tangled.

Verifying things before claiming they worked. When the build broke on the SDK type, I extracted the actual installed package, read its declarations, and confirmed the named exports before writing a fix. Same with the Anthropic API contract: I checked that `tool_choice` would force structured output rather than trusting the model to return JSON in free text.

Catching one small but important architecture rule and holding it: the API key never has a `NEXT_PUBLIC_` prefix so it stays out of the browser bundle. The client adapter is a thin fetch wrapper; the server route holds the key. That came from the brief, but it would have been easy to get wrong.

Reading the tone doc before writing user-facing copy. Not every time, but often enough that the product reads in one voice. The dual-voice rule (AI speaks neutrally, UI provides warmth) survived all eleven phases without drift.

---

## What I think I was bad at

Visual taste, until pushed. The first version of Klaro after Phase 11 was, in the user's words, a "tasteful SaaS wireframe." It met the brief, met the principles, met accessibility, and was visually unmemorable. I had declared the build complete. The brand refresh that followed (Steps 1 through 7b) was the work I should have surfaced as missing from inside Phase 11, not waited to be told about. Generic competence is a failure mode I do not flag for myself.

Over-iterating on visual details. The late phase had many small tweaks: padding by 20px, icon size by 10%, then 20% on top of that, hover colors at 5%, 8%, 15%, then 20%, line height by one step, text size by one step site-wide. Some of this was the user finding the look. Some of it was me not anticipating the next ask and forcing a chain of small messages where a richer one (asking up front "how do you want the icon, padding, hover, and density to relate?") might have collapsed three rounds into one.

Underestimating filesystem and tooling assumptions. OneDrive's sync behavior is not the same as a regular folder. Cross-mount writes between a Windows host and a Linux sandbox have real edge cases. SVG exports from Illustrator carry artifacts. I learned each of these by hitting them, not by anticipating them. A pre-flight checklist for "things that will be weird because of Windows + OneDrive + Vercel" would have prevented several rounds of confusion about why a file looked corrupted.

Some duplicate work. The coral palette tokens were added to `tailwind.config.ts` in brand-refresh Step 2 and never consumed by any component before being replaced by terracotta in Step 2.5. The intent was "additive so nothing breaks," which is reasonable, but the right shape would have been to keep one branch open for the new tokens and confirm direction before merging them into the live config.

Not running `npm run build` between phases. I ran `tsc --noEmit` regularly but did not catch the Next.js-specific lint rules (like `react/no-unescaped-entities`) or the SDK type issue until ship time. Both were avoidable.

---

## Where human judgment mattered

The brand direction. I could explore options, render comparisons, and describe each direction's vibe. I could not say "this one is right." When the user looked at three accents side by side and said "terracotta, with warm yellow as the companion," that was a judgment call that depended on living memory of Mobbin sweeps, peer products, and a feel for what would or would not look "Klaro." That call shaped every visual decision that followed.

Spotting the SaaS-wireframe feel. I had completed Phase 11 and declared the build done. The user looked at it and said it still read as a tasteful but generic product. That is the kind of evaluation I am bad at because the product was correct against every documented rule. The user's standard was higher than the documented rules.

The IA correction (deleting `/review` from the top nav). I had treated it as a brief-listed route. The user saw that with no persistence, `/review` had no meaningful state outside an active task and was therefore an empty-state trap that violated "guide before freedom." The reasoning was in the brief; I did not synthesize it until prompted.

Rejecting gamification, every time. Small drifts toward XP-like framing or completion-percentage UIs came up multiple times in my proposals. The user shut each one down. The brief had said no gamification; the principle was "reflection over completion." Holding that line across a long project is a judgment muscle, not a checklist item.

The "is it better to put the API key now" question right before shipping. That was a process call that benefited from the user thinking about the full deployment flow, not just the next step. The right answer (ship in mock mode first, add the key after a successful deploy) was a sequencing call about risk and debuggability, not a technical one.

Small tone calls. The redaction fill color swap from warm-amber to graphite came from the user feeling, in use, that amber competed with the brand accents while pretending to be a safety tool. Graphite was correct because it read as "this is covered" without attention-grabbing. That was a felt call, not a logical one.

---

## What I'd do differently next time

Lead with brand mood and visual identity earlier in the build, not as a Phase-11 polish item or a post-completion refresh. The brief's "calm, modern, clear, supportive" was clear about feeling but not visually specific. I should have asked, in Phase 1, for two or three peer products that felt right to the user, then mocked composites in JPG before writing any UI code. Brand should sit upstream of layout, not downstream.

Run `npm run build` (not just type-check) at every phase boundary. Catches Next.js-specific lint rules, SDK type issues, and unescaped entities that `tsc --noEmit` does not surface. Vercel runs `npm run build`. The local definition of "done" should match the deploy definition of "done."

Use the brainstorming skill more aggressively before any creative work. The instructions say "you MUST use this before any creative work." I did not use it consistently, and the cost was visible in the brand-refresh detour at the end.

Set up a visual verification loop earlier. The Map icon issue, the hero collapse, the disabled-button invisibility, and the icon-alignment drift after the text-size sweep were all visual issues that I would not have shipped if a Playwright screenshot or a manual eyeball pass were part of the change checklist. The cost of a screenshot is minutes; the cost of not noticing is rounds of "doesn't work, here's a screenshot."

Surface OS and tooling assumptions on day one. "This project lives in OneDrive; the sandbox is Linux; SVGs come from Illustrator; the deploy target is Vercel; the dev machine is Windows" is a set of constraints that should be a single document the agent re-reads at session start. I learned each constraint by hitting it.

Notice generic competence as a failure mode. If a product is visually unremarkable and I cannot say what makes it specifically itself, that is a signal to pause and ask a brand question, not to push to the next phase. I missed that signal at Phase 11.

Anticipate "the next ask" in visual polish rounds. A request to bump padding by 20px is rarely just about padding; it usually means the user is feeling out the rhythm of the card. Asking "are we also tuning vertical padding, hover, and density together?" up front would have collapsed several three-round exchanges into single ones.

---

## What the user did that I would copy

Built a CLAUDE.md and made me re-read it at session start. Documented every durable decision in a log. Asked "is this necessary?" instead of trusting the agent's stated need. Looked at the finished product and trusted their own eye over the agent's claim of completion. Said "no" to gamification six different ways. Pushed for ship when the next polish round was about to start.

These are not engineering moves. They are taste and judgment moves. They are the reason the product reads as Klaro and not as another tasteful SaaS wireframe.
