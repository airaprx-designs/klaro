import Link from "next/link";
import type { TaskConfig } from "@/lib/tasks/config";

/**
 * TodaysTaskHero — the focal card on Home.
 *
 * Brand refresh · Step 3 (2026-05-29):
 *   - Terracotta accent replaces klaro-blue CTA + warm-amber dot.
 *   - Warm radial gradient backdrop (warm-yellow top-right + terracotta-tint
 *     bottom-left layered over warm-canvas) sets the playful-minimalist mood.
 *   - Outline + shadow combined card treatment: 0.75px outline-warm border
 *     + soft warm drop shadow.
 *   - Eyebrow becomes a terracotta-tinted pill with a small accent dot.
 *   - CTA is a terracotta filled pill with a slim deeper outline + a real
 *     coral-tinted shadow + an arrow chip on the right.
 *   - Right side: a layered SVG composition (terracotta blob + warm-yellow
 *     companion disc + small dark accent dot). No more icon-in-tinted-box.
 *
 * See the decision shot: outputs/klaro_three_accents.jpg (panel A).
 *
 * 2026-05-31:
 *   - Hero illustration swapped from /hero.svg (flat SVG composition) to
 *     /hero_img.png (softer 3D-style render). Single shared image across all
 *     tasks; the per-task illustration system in lib/tasks/illustrations.tsx
 *     remains in the codebase but is unused.
 *   - Compare: case_study/klaro_hero_swap_mockup.png.
 */

type Props = {
  task: TaskConfig;
};

export function TodaysTaskHero({ task }: Props) {
  return (
    <section
      className="-mx-6 overflow-hidden rounded-lg border-[0.75px] border-outline-warm sm:-mx-10"
      style={{
        background:
          "radial-gradient(circle at 88% 14%, rgba(253,179,140,0.55) 0%, rgba(253,179,140,0) 55%), radial-gradient(circle at 12% 92%, rgba(249,148,123,0.45) 0%, rgba(249,148,123,0) 55%), radial-gradient(ellipse 600px 400px at 60% 70%, rgba(255,194,165,0.30) 0%, rgba(255,194,165,0) 60%), #FFFFFF",
        boxShadow:
          "0 2px 0 rgba(243,85,38,0.06), 0 14px 36px -8px rgba(243,85,38,0.28)"
      }}
    >
      <div className="grid gap-8 p-14 md:grid-cols-[1.5fr_1fr] md:items-center md:gap-10 md:p-16">
        {/* Left column · meta + headline + CTA — vertically centered in the grid cell */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border-[0.75px] border-terracotta-tint bg-terracotta/10 px-3 py-1 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
            <span
              aria-hidden="true"
              className="block h-2 w-2 rounded-full bg-terracotta"
            />
            TODAY&rsquo;S TASK
          </p>

          <h2
            className="mt-4 font-brand text-display leading-tight tracking-tight"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #FDB322 0%, #FDB322 60%, #F97433 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent"
            }}
          >
            {task.title}
          </h2>

          <p className="mt-4 max-w-[75%] text-lg text-warm-mid">
            {task.description ?? task.shortDescription}
          </p>

          <p className="mt-6 text-lg font-semibold text-terracotta-deep">
            ~ {task.estimatedMinutes} minutes
          </p>

          <div className="mt-6">
            <Link
              href={`/task/${task.slug}`}
              className="group inline-flex min-h-14 items-center gap-3 rounded-[16px] border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-white shadow-cta hover:text-white"
            >
              Begin
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
            </Link>
          </div>
        </div>

        {/* Right column · static hero illustration from /public/hero_img.png. */}
        <div
          aria-hidden="true"
          className="relative hidden aspect-square w-full items-center justify-center md:flex"
        >
          <img
            src="/hero_img.png"
            alt=""
            className="h-full w-full scale-[1.45] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
