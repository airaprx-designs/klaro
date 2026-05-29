"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { TaskConfig } from "@/lib/tasks/config";
import { TaskRow } from "./TaskRow";

/**
 * ExploreAllTasks — collapsible disclosure listing every task as a TaskRow.
 *
 * Defaults to collapsed (matches docs/wireframes/01_HOME_RETURNING_USER_1.jpg).
 * Expansion is local UI state only — no persistence.
 */

type Props = {
  tasks: TaskConfig[];
};

export function ExploreAllTasks({ tasks }: Props) {
  const [open, setOpen] = useState(false);
  const Icon = open ? ChevronUp : ChevronDown;

  return (
    <section className="overflow-hidden rounded-md border-[0.75px] border-outline bg-elevated shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="explore-all-tasks-list"
        className="flex w-full items-center justify-between rounded-md px-6 py-6 text-left text-warm-dark transition-colors hover:bg-[#FDB322]/15"
      >
        <span className="font-brand text-xl font-semibold">
          Explore all tasks:
        </span>
        <Icon aria-hidden="true" className="h-5 w-5 text-warm-mid" />
      </button>

      {open ? (
        <ul
          id="explore-all-tasks-list"
          className="flex flex-col gap-0 px-0 pb-0"
        >
          {tasks.map((task) => (
            <li key={task.slug}>
              <TaskRow task={task} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
