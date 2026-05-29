import Link from "next/link";
import { Clock } from "lucide-react";
import type { TaskConfig } from "@/lib/tasks/config";
import { getTaskIcon, getTaskAccent } from "@/lib/tasks/icons";

/**
 * TaskRow — compact one-line variant used inside ExploreAllTasks.
 *
 * Brand refresh · Step 3: matches TaskCard's playful-minimalist treatment —
 * outline + soft shadow, sticker icon in the task's accent tint, terracotta
 * hover state on the title, warm-toned secondary text.
 */

type Props = {
  task: TaskConfig;
};

export function TaskRow({ task }: Props) {
  const Icon = getTaskIcon(task.slug);
  const accent = getTaskAccent(task.slug);

  return (
    <Link
      href={`/task/${task.slug}`}
      className="group flex items-center gap-4 rounded-none border-y-[0.75px] border-outline/40 bg-elevated px-6 py-6 text-warm-dark transition-colors hover:bg-[#FDB322]/15"
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
        <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-brand text-xl font-bold text-warm-dark">
          {task.title}
        </span>
        <span className="text-lg text-warm-mid">{task.shortDescription}</span>
      </div>

      <span className="inline-flex flex-none items-center gap-2 text-lg text-warm-mid">
        <Clock aria-hidden="true" className="h-4 w-4" />
        <span>{task.estimatedMinutes} min.</span>
      </span>
    </Link>
  );
}
