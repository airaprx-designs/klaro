import { Check, Circle } from "lucide-react";

/**
 * CapabilityCard — second stacked card on /progress.
 *
 * Visual only. Items are passed in as props; real data wiring is Phase 09.
 * Matches docs/wireframes/01_PROGRESS.jpg ("You are now capable of:").
 *
 *   - earned: true  → terracotta-tint badge with Check (capability earned)
 *   - earned: false → outlined warm-mid Circle (not yet, but visible as a goal)
 *
 * Brand refresh · Step 5 (2026-05-29):
 *   - Card uses outline + soft shadow on white paper.
 *   - Earned items get a small terracotta-tint badge containing the Check
 *     glyph (was a bare graphite checkmark) — more visible, more on-brand.
 *   - Not-yet items keep the outlined circle but in warm-mid.
 *   - Earned label text in warm-dark; not-yet in warm-soft.
 */

export type CapabilityItem = {
  capability: string;
  earned: boolean;
};

type Props = {
  items: CapabilityItem[];
};

export function CapabilityCard({ items }: Props) {
  return (
    <section className="rounded-md border-[0.75px] border-outline bg-elevated p-6 shadow-sm">
      <h2 className="mb-4 mt-0 font-brand text-h3 text-warm-dark">
        You are now capable of:
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.capability} className="flex items-center gap-4">
            {item.earned ? (
              <span
                aria-label="Earned"
                className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-terracotta-tint"
                style={{
                  boxShadow: "0 1px 4px -1px rgba(152,79,34,0.22)"
                }}
              >
                <Check
                  aria-hidden="true"
                  className="h-4 w-4 text-terracotta-deep"
                  strokeWidth={2.5}
                />
              </span>
            ) : (
              <Circle
                aria-label="Not yet earned"
                className="h-7 w-7 flex-none text-warm-mid"
                strokeWidth={1.5}
              />
            )}
            <span
              className={
                item.earned ? "text-warm-dark" : "text-warm-soft"
              }
            >
              {item.capability}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
