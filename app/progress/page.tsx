"use client";

import { PageHeading } from "@/components/PageHeading";
import {
  RecentlyTriedCard,
  type RecentlyTriedItem
} from "@/components/progress/RecentlyTriedCard";
import {
  CapabilityCard,
  type CapabilityItem
} from "@/components/progress/CapabilityCard";
import { SuggestedNextCard } from "@/components/progress/SuggestedNextCard";
import { useCapabilities, useRecentTasks } from "@/lib/storage/hooks";
import {
  ALL_CAPABILITY_IDS,
  getCapability,
  type CapabilityId
} from "@/lib/capabilities";
import { TASKS, getTaskBySlug } from "@/lib/tasks/config";

/**
 * Progress — Phase 9 refined.
 *
 * Recently tried: 3 task-specific reflection items from the most recent task
 * (from TaskConfig.reflectionItems). Single-task focused, like the wireframe.
 *
 * Capabilities: all 7 capabilities, binary earned-or-not.
 *
 * Suggested next: prefers a task that teaches a capability the user hasn't
 * yet earned. Falls back to "first uncompleted task" if all relevant
 * capabilities are already earned.
 */

function buildRecentlyTriedItems(recentSlugs: string[]): RecentlyTriedItem[] {
  const mostRecentSlug = recentSlugs[0];
  if (!mostRecentSlug) return [];
  const task = getTaskBySlug(mostRecentSlug);
  if (!task) return [];
  return task.reflectionItems;
}

function buildCapabilityItems(earned: CapabilityId[]): CapabilityItem[] {
  const earnedSet = new Set(earned);
  return ALL_CAPABILITY_IDS.map((id) => {
    const cap = getCapability(id);
    return {
      capability: cap.progressLabel,
      earned: earnedSet.has(id)
    };
  });
}

/**
 * Pick the next task to suggest. Prefer tasks that teach a capability the
 * user hasn't earned yet; fall back to first uncompleted task in TASKS
 * order.
 */
function pickSuggestedNext(
  completedSlugs: string[],
  earnedCapabilities: CapabilityId[]
): string | null {
  const completed = new Set(completedSlugs);
  const earned = new Set(earnedCapabilities);

  const teachesUnearned = TASKS.find((t) => {
    if (completed.has(t.slug)) return false;
    return t.capabilitiesEarned.some((c) => !earned.has(c));
  });
  if (teachesUnearned) return teachesUnearned.slug;

  const fallback = TASKS.find((t) => !completed.has(t.slug));
  return fallback?.slug ?? null;
}

export default function ProgressPage() {
  const { recentTasks, hydrated: rtHydrated } = useRecentTasks();
  const { capabilities, hydrated: capHydrated } = useCapabilities();

  const recentItems = buildRecentlyTriedItems(recentTasks.slugs);
  const capItems = buildCapabilityItems(capabilities.earned);
  const suggestedSlug = pickSuggestedNext(
    recentTasks.slugs,
    capabilities.earned
  );

  const hasAnyHistory = recentTasks.slugs.length > 0;
  const subtitle = !rtHydrated
    ? "Loading your progress…"
    : hasAnyHistory
    ? "What you can do with AI grows here as you practice."
    : "Start a task to see what you've learned.";

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-12">
      <section className="md:col-span-4">
        <PageHeading title="Your progress" subtitle={subtitle} />
      </section>

      <section className="flex flex-col gap-8 md:col-span-8">
        {recentItems.length > 0 && <RecentlyTriedCard items={recentItems} />}
        {capHydrated && <CapabilityCard items={capItems} />}
        {suggestedSlug && <SuggestedNextCard taskSlug={suggestedSlug} />}
      </section>
    </div>
  );
}
