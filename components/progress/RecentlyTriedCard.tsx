import { Sparkles } from "lucide-react";

/**
 * RecentlyTriedCard — first stacked card on /progress.
 *
 * Surfaces 3 task-specific reflection moments from the user's most recent
 * completed task. Each item has a short capability-style label and a
 * concrete moment description ("You reviewed what information to share").
 *
 * Data comes from TaskConfig.reflectionItems on the most recent task. Per
 * the Phase 9 design, this is single-task focused (not aggregated across
 * recent history) — depth over breadth.
 *
 * Brand refresh · Step 5 (2026-05-29):
 *   - Card uses outline + soft shadow on white paper instead of flat surface.
 *   - Sparkles glyphs shift to terracotta (was warm-amber).
 *   - Labels in warm-dark, moments in warm-mid.
 */

export type RecentlyTriedItem = {
  label: string;
  moment: string;
};

type Props = {
  items: RecentlyTriedItem[];
};

export function RecentlyTriedCard({ items }: Props) {
  return (
    <section className="rounded-md border-[0.75px] border-outline bg-elevated p-6 shadow-sm">
      <h2 className="mb-4 mt-0 font-brand text-h3 text-warm-dark">
        You&rsquo;ve recently tried:
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Sparkles
                aria-hidden="true"
                className="icon-gradient-stroke h-[26px] w-[26px] flex-none"
              />
              <span className="font-semibold text-warm-dark">{item.label}</span>
            </div>
            <span className="pl-[42px] text-lg text-warm-mid">
              {item.moment}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
