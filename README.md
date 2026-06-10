# Klaro

Confidence through clarity.

A responsive web application that helps adults who are new to AI build confidence through guided everyday tasks.

**Live:** <https://klaro-ai-confident.vercel.app>

## Status

Shipped. All eleven build phases complete, brand refresh complete, real Anthropic Claude provider live. The product walks adults new to AI through nine guided tasks at two levels of difficulty, with privacy review before sharing, image redaction, reflection-based progress, and localStorage-only state.

## Setup (local dev)

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The app runs on <http://localhost:3000>. By default it uses the `MockProvider` (canned responses, no API key needed) so you can develop without burning credit.

## AI Provider

Two adapters implement the same `AIProvider` interface:

- `MockProvider` (default) — canned responses keyed by task slug. Lives in `lib/ai/mock-provider.ts`.
- `AnthropicProvider` — real Claude via `/api/ai/generate`. Lives in `lib/ai/anthropic-provider.ts`.

The active provider is selected by `NEXT_PUBLIC_AI_PROVIDER` in `lib/ai/provider.ts`. Consumers import from there and never reference a concrete provider.

### Using real Claude locally

1. Get an API key from <https://console.anthropic.com>. Add a few dollars of credit under Settings → Billing if your account is empty.
2. Create `.env.local` in the project root:

   ```bash
   NEXT_PUBLIC_AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Restart the dev server.

### Using real Claude on Vercel

Production reads env vars from the Vercel dashboard, not from `.env.local`.

1. Vercel project → Settings → **Environment Variables**.
2. Add both variables to Production + Preview environments:
   - `NEXT_PUBLIC_AI_PROVIDER` = `anthropic`
   - `ANTHROPIC_API_KEY` = `sk-ant-…`
3. Trigger a redeploy (push a commit, or use the Redeploy button on the latest deployment).

### Why the key is safe

`ANTHROPIC_API_KEY` has no `NEXT_PUBLIC_` prefix, so Next.js does not inline it into the browser bundle. The client adapter only calls `/api/ai/generate`; the API route runs on the server and is the only thing that reads the key. The browser never sees it.

### Model

Pinned to `claude-sonnet-4-6` in `app/api/ai/generate/route.ts`. Pin-by-version (not by `-latest` alias) avoids 404s when Anthropic deprecates older aliases. Swap to `claude-haiku-4-5-20251001` for lower cost — Klaro's short structured responses are well suited to Haiku.

### Structured output

Enforced via Claude's tool-use mechanism: a single tool (`klaro_response`) declares the four-section shape (`answer / aiHelpedBy / considerChecking / nextStep`) as its input schema, and `tool_choice` forces the model to use it. The response comes back as a typed object, not free-form text.

## Deployment

Target: Vercel via GitHub. Pushing to `main` triggers an auto-deploy. The first ship documented two build fixes worth keeping in mind:

- `tsc --noEmit` does not catch Next.js-specific ESLint rules (e.g., `react/no-unescaped-entities`). Run `npm run build` locally before pushing — that is what Vercel runs.
- The Anthropic SDK 0.27 does not export `ContentBlockParam` as a named union; build content-block arrays as the inline `TextBlockParam | ImageBlockParam` union instead.

## Project Documentation

`CLAUDE.md` is the working memory document — read it first if you're returning to this project. The `docs/` folder holds the input documents (read in this priority order):

1. `docs/00_BUILD_BRIEF.md`
2. `docs/06_CLAUDE_EXECUTION_PLAN.md`
3. `docs/TONE_AND_PRINCIPLES.md`
4. `docs/05_BRAND_GUIDELINES.md`
5. `docs/07_DESIGN_SYSTEM.md`
6. `docs/golden_path_ask_question.md`
7. `docs/capability_map.md`

The `case_study/` folder holds wireframes, brand-direction exploration mockups, final-form screenshots in desktop + mobile viewports, a video walkthrough, and three written reflections (`visual_phases.md`, `problems_and_fixes.md`, `klaro_retrospective.md`).
