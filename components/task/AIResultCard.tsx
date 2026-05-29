import { MoveRight } from "lucide-react";
import type { AIResponse } from "@/lib/ai/types";

/**
 * AIResultCard — Step 5 of the task journey (the "Review" step).
 *
 * Renders the four sections of the structured AI response:
 *   - Answer  (featured — warm gradient + outline-warm + shadow-warm)
 *   - AI helped by
 *   - Consider checking
 *   - Suggested next step
 *
 * The Answer is the AI's neutral, informative voice (per the dual-voice rule
 * in docs/TONE_AND_PRINCIPLES.md). The other sections are Klaro UI describing
 * the AI's behavior, encouraging reflection.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Featured Answer card gets warm radial-gradient background, 0.75px
 *     outline-warm border, shadow-warm lift, and a slightly larger body type
 *     so it reads as the headline of the response — not just the first of four.
 *   - Supporting cards (helped by / consider / next step) use the standard
 *     outline + shadow-sm card treatment with small terracotta dot marks
 *     next to the labels. Bullet glyphs lose their diamond character in favor
 *     of small warm-yellow-deep dots and outlined-circle ticks.
 *   - All labels in tracked uppercase terracotta-deep with a small accent
 *     dot, replacing the warm-amber-deep labels that used a ◆ glyph.
 *   - CTA matches the TodaysTaskHero terracotta pill with arrow chip.
 */

type Props = {
  response: AIResponse;
  onContinue: () => void;
};

export function AIResultCard({ response, onContinue }: Props) {
  return (
    <section>
      <h2>Here&rsquo;s what AI said</h2>

      {/* Featured Answer card — playful gradient (light yellow + orange over
          white), warm orange shadow. Mirrors TodaysTaskHero's gradient style. */}
      <article
        className="mt-6 overflow-hidden rounded-md border-[0.75px] border-outline-warm px-11 py-[34px] sm:px-12 sm:py-[38px]"
        style={{
          background:
            "radial-gradient(circle at 88% 14%, rgba(253,179,34,0.45) 0%, rgba(253,179,34,0) 55%), radial-gradient(circle at 12% 92%, rgba(249,116,51,0.38) 0%, rgba(249,116,51,0) 55%), radial-gradient(ellipse 600px 400px at 60% 70%, rgba(255,225,180,0.35) 0%, rgba(255,225,180,0) 60%), #FFFFFF",
          boxShadow:
            "0 2px 0 rgba(243,85,38,0.05), 0 14px 36px -8px rgba(243,85,38,0.22)"
        }}
      >
        <h3 className="mb-3 mt-0 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
          Answer
        </h3>
        <p className="text-lg leading-relaxed text-warm-dark">
          {response.answer}
        </p>
      </article>

      {/* Supporting card · AI helped by */}
      <article className="mt-4 rounded-md border-[0.75px] border-outline bg-elevated px-11 py-[34px] shadow-sm">
        <h3 className="mb-3 mt-0 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
          AI helped by
        </h3>
        <ul className="flex flex-col gap-3">
          {response.aiHelpedBy.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-warm-dark"
            >
              <MoveRight
                aria-hidden="true"
                className="h-5 w-5 flex-none text-warm-yellow-deep"
              />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </article>

      {/* Supporting card · Consider checking */}
      <article className="mt-4 rounded-md border-[0.75px] border-outline bg-elevated px-11 py-[34px] shadow-sm">
        <h3 className="mb-3 mt-0 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
          Consider checking
        </h3>
        <ul className="flex flex-col gap-3">
          {response.considerChecking.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-warm-dark"
            >
              <MoveRight
                aria-hidden="true"
                className="h-5 w-5 flex-none text-warm-mid"
              />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </article>

      {/* Supporting card · Suggested next step (subtly featured) */}
      <article className="mt-4 rounded-md border-[0.75px] border-outline-warm bg-elevated px-11 py-[34px] shadow-sm">
        <h3 className="mb-3 mt-0 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
          Suggested next step
        </h3>
        <p className="font-semibold text-warm-dark">{response.nextStep}</p>
      </article>

      <div className="mt-8">
        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5"
        >
          Continue to reflection
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/22 transition-transform group-hover:translate-x-0.5">
            <svg
              aria-hidden="true"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
            >
              <path
                d="M2 5.5h7M5.5 2L9 5.5 5.5 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
