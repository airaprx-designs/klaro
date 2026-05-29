"use client";

import { PageHeading } from "@/components/PageHeading";
import { TodaysTaskHero } from "@/components/TodaysTaskHero";
import { TaskCard } from "@/components/TaskCard";
import { ExploreAllTasks } from "@/components/ExploreAllTasks";
import { TASKS } from "@/lib/tasks/config";
import { useOnboarding, usePreferences } from "@/lib/storage/hooks";

/**
 * Home — Phase 6 wires onboarding state + display name from localStorage.
 *
 * Today's task is the first task the user hasn't completed yet, walking the
 * TASKS array (Level 1 first, then Level 2). Alternatives are the next three
 * uncompleted tasks. So the surface evolves naturally as the user progresses.
 *
 * Greeting is suppressed until hydrated to avoid SSR / client time-of-day
 * mismatch (server timezone vs user's local time).
 */

function greetingForNow(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const { preferences, hydrated: prefsHydrated } = usePreferences();
  const { onboarding, hydrated: obHydrated } = useOnboarding();
  const hydrated = prefsHydrated && obHydrated;

  const completedSet = new Set(onboarding.completedSlugs);
  const uncompleted = TASKS.filter((t) => !completedSet.has(t.slug));
  const today = uncompleted[0] ?? TASKS[0];
  const alternatives = uncompleted.slice(1, 4);

  // Greeting (suppress until hydrated to keep SSR neutral)
  const name = preferences.displayName.trim();
  const greeting = hydrated
    ? name
      ? `${greetingForNow()}, ${name}`
      : greetingForNow()
    : "Welcome";

  const subtitle = !obHydrated
    ? "Where would you like to start?"
    : onboarding.completedSlugs.length === 0
    ? "Today is a good day to try something simple."
    : "Welcome back. Pick up where you left off, or try something new.";

  return (
    <div className="flex flex-col gap-12">
      <PageHeading title={greeting} subtitle={subtitle} />

      <TodaysTaskHero task={today} />

      <div>
        <p className="mb-4 inline-flex items-center gap-3 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
          <span
            aria-hidden="true"
            className="block h-0.5 w-5 rounded-full bg-terracotta"
          />
          Or pick another
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alternatives.map((task) => (
            <li key={task.slug}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      </div>

      <ExploreAllTasks tasks={TASKS} />
    </div>
  );
}
