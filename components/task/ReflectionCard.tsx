import Link from "next/link";
import { Check } from "lucide-react";
import type { CapabilityId } from "@/lib/capabilities";
import { getCapability } from "@/lib/capabilities";

/**
 * ReflectionCard — final step of the task journey.
 *
 * Shows the capabilities the user just practiced (reflection voice, not the
 * progress-page voice). Two CTAs: try another task (primary) or go home.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Centered closing card sits on warm-canvas with outline-warm + soft
 *     shadow, like a small celebration card.
 *   - Capability checkmarks: terracotta-tint badges with terracotta-deep
 *     check glyphs (was solid graphite badges with canvas check).
 *   - Primary "Try another task" CTA = terracotta pill with arrow chip.
 *   - Secondary "Go home" CTA = outlined warm-canvas pill.
 *   - "You finished." overline picks up the small-uppercase-tracked terracotta
 *     pattern used across the brand.
 */

type Props = {
  capabilitiesEarned: CapabilityId[];
};

export function ReflectionCard({ capabilitiesEarned }: Props) {
  const items = capabilitiesEarned.map(getCapability);
  const count = items.length;
  const countWord =
    count === 1 ? "one thing" : count === 2 ? "two things" : `${count} things`;

  return (
    <section className="mx-auto max-w-reading text-center">
      <p className="text-lg font-bold uppercase tracking-widest text-terracotta-deep">
        You finished
      </p>
      <h2 className="mt-2 font-brand text-display tracking-tight text-warm-dark">
        Nicely done.
      </h2>
      <p className="mt-2 text-warm-mid">
        Today, you practiced {countWord}.
      </p>

      <ul className="mx-auto mt-8 flex max-w-md flex-col gap-4 text-left">
        {items.map((cap) => (
          <li
            key={cap.id}
            className="flex items-center gap-4 rounded-md border-[0.75px] border-outline-warm bg-warm-canvas px-5 py-4 text-warm-dark shadow-sm"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-terracotta-tint"
              style={{
                boxShadow: "0 2px 6px -2px rgba(152,79,34,0.30)"
              }}
            >
              <Check className="h-5 w-5 text-terracotta-deep" strokeWidth={2.5} />
            </span>
            <span className="text-lg">{cap.reflectionLabel}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="group inline-flex min-h-14 items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5 hover:text-canvas"
        >
          Try another task
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
        <Link
          href="/"
          className="inline-flex min-h-14 items-center justify-center rounded-full border-[0.75px] border-outline bg-white px-7 text-lg font-medium text-warm-dark transition-colors hover:border-[#F35526]"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
