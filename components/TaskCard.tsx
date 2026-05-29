import Link from "next/link";
import { Clock } from "lucide-react";
import type { TaskConfig } from "@/lib/tasks/config";
import { TaskCardIcon } from "./TaskCardIcon";

/**
 * TaskCard — large variant for the alternatives row on Home.
 *
 * Layout:
 *   - Title + description sit at the top of the card
 *   - Duration (clock + minutes) sits bottom-left
 *   - Icon sticker sits bottom-right, ~20% larger than the standard sticker
 *
 * Card chrome: outline + soft shadow combined treatment, white paper
 * background, light-yellow hover wash.
 */

type Props = {
  task: TaskConfig;
};

export function TaskCard({ task }: Props) {
  return (
    <Link
      href={`/task/${task.slug}`}
      className="group flex h-full min-h-48 flex-col justify-between rounded-md border-[0.75px] border-outline bg-elevated p-6 text-warm-dark shadow-sm transition-colors hover:bg-[#FDB322]/15"
    >
      {/* Top: title + description — flush against the card's top-left
          padding. mt-0 clears the base h3 margin from globals.css. */}
      <div>
        <h3 className="mb-2 mt-0 font-brand text-h3 leading-tight tracking-tight text-warm-dark">
          {task.title}
        </h3>
        <p className="text-lg leading-normal text-warm-mid">{task.shortDescription}</p>
      </div>

      {/* Bottom: duration (left) + icon (right). Icon has no background —
          its stroke renders as a 45° orange→yellow gradient via
          .icon-gradient-stroke + the SVG defs in layout.tsx. */}
      <div className="mt-6 flex items-end justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-lg text-warm-mid">
          <Clock aria-hidden="true" className="h-4 w-4" />
          <span>{task.estimatedMinutes} min.</span>
        </span>
        <span
          aria-hidden="true"
          className="flex h-[67px] w-[67px] flex-none items-center justify-center"
        >
          <TaskCardIcon
            slug={task.slug}
            className="h-[58px] w-[58px]"
            strokeWidth={1.8}
          />
        </span>
      </div>
    </Link>
  );
}
