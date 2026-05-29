import Link from "next/link";
import { getTaskBySlug } from "@/lib/tasks/config";
import { getTaskIcon, getTaskAccent } from "@/lib/tasks/icons";

/**
 * SuggestedNextCard — third stacked card on /progress.
 *
 * Single suggestion linking the user to /task/[slug].
 * Real suggestion logic lives in /app/progress/page.tsx; this is the view.
 *
 * Brand refresh · Step 5 (2026-05-29):
 *   - Outer card uses outline + soft shadow on white paper.
 *   - Suggested task surfaces with its actual sticker icon + title + tagline
 *     + duration (matches the TaskCard pattern from Home, scaled down a bit).
 *     Replaces the bare "Circle + title" line. Hover shifts title to
 *     terracotta-deep.
 */

type Props = {
  taskSlug: string;
};

export function SuggestedNextCard({ taskSlug }: Props) {
  const task = getTaskBySlug(taskSlug);
  if (!task) return null;

  const Icon = getTaskIcon(task.slug);
  const accent = getTaskAccent(task.slug);

  return (
    <section className="rounded-md border-[0.75px] border-outline bg-elevated p-6 shadow-sm">
      <h2 className="mb-4 mt-0 font-brand text-h3 text-warm-dark">
        Suggested next step:
      </h2>
      <Link
        href={`/task/${task.slug}`}
        className="group flex items-center gap-4 rounded-md border-[0.75px] border-outline bg-warm-canvas px-5 py-4 text-warm-dark shadow-sm transition-colors hover:bg-[#FDB322]/15"
      >
        <span
          aria-hidden="true"
          className="flex h-12 w-12 flex-none items-center justify-center"
          style={{
            background: "linear-gradient(45deg, #F97433, #FDB322)",
            borderRadius: "16px",
            boxShadow: "0 2px 6px -2px rgba(249,116,51,0.30)"
          }}
        >
          <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-brand text-lg font-semibold text-warm-dark">
            {task.title}
          </span>
          <span className="text-lg text-warm-mid">
            {task.shortDescription}
          </span>
        </span>
        <span className="text-lg font-semibold text-terracotta-deep">
          {task.estimatedMinutes} min
        </span>
      </Link>
    </section>
  );
}
