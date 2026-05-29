# Klaro

Confidence through clarity.

A responsive web application that helps adults who are new to AI build confidence through guided everyday tasks.

## Setup

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The app runs on http://localhost:3000.

## AI Provider

By default, Klaro uses a `MockProvider` that returns canned responses. No API key needed — useful for design work, demos, and offline development.

To use real AI (Anthropic Claude):

1. Get an API key from <https://console.anthropic.com>.
2. Create `.env.local` in the project root:

   ```bash
   NEXT_PUBLIC_AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Restart the dev server.

`ANTHROPIC_API_KEY` stays server-side — it never reaches the browser bundle. The client adapter (`lib/ai/anthropic-provider.ts`) calls `/api/ai/generate`, which holds the key and makes the upstream call.

Structured output is enforced via Claude's tool-use mechanism: the four-section response shape (`answer / aiHelpedBy / considerChecking / nextStep`) comes back as a typed object, not free-form text we have to parse.

For Vercel, set both env vars in the project's Environment Variables settings.

## Project Documentation

See `CLAUDE.md` and `docs/`. Read in this priority order:

1. `docs/00_BUILD_BRIEF.md`
2. `docs/06_CLAUDE_EXECUTION_PLAN.md`
3. `docs/TONE_AND_PRINCIPLES.md`
4. `docs/05_BRAND_GUIDELINES.md`
5. `docs/07_DESIGN_SYSTEM.md`
6. `docs/golden_path_ask_question.md`
7. `docs/capability_map.md`

## Current Build Phase

Phase 08 — AI Integration. Real Anthropic Claude provider behind the existing `AIProvider` interface.

## Deployment

Target: Vercel via GitHub. Local-first build with standard Next.js + Vercel conventions preserved throughout.
