/**
 * Klaro localStorage layer.
 *
 * Stores only the four keys defined in docs/00_BUILD_BRIEF.md:
 *   preferences, capabilities, recentTasks, onboarding.
 *
 * Never stores uploads, prompts, AI outputs, or any other user content —
 * see the storage anti-patterns in CLAUDE.md.
 *
 * All keys are prefixed `klaro:` to avoid collisions with other apps that
 * might share the origin in development.
 *
 * Reads and writes are wrapped in try/catch so a disabled or full
 * localStorage degrades silently to in-memory defaults.
 */

import type { CapabilityId } from "@/lib/capabilities";

// ── Types ────────────────────────────────────────────────────────────────

export type TextSize = "smaller" | "standard" | "larger";
export type Spacing = "compact" | "standard" | "roomy";
export type ExplanationDepth = "brief" | "standard" | "in-depth";

export type Preferences = {
  displayName: string;
  textSize: TextSize;
  spacing: Spacing;
  explanationDepth: ExplanationDepth;
};

export type CapabilitiesState = {
  earned: CapabilityId[];
};

export type RecentTasksState = {
  slugs: string[]; // most recent first, capped
};

export type OnboardingState = {
  completedSlugs: string[]; // unique, order = first-completed first
};

// ── Defaults ─────────────────────────────────────────────────────────────

export const DEFAULT_PREFERENCES: Preferences = {
  displayName: "",
  textSize: "standard",
  spacing: "standard",
  explanationDepth: "standard"
};

export const DEFAULT_CAPABILITIES: CapabilitiesState = { earned: [] };
export const DEFAULT_RECENT_TASKS: RecentTasksState = { slugs: [] };
export const DEFAULT_ONBOARDING: OnboardingState = { completedSlugs: [] };

// ── Keys ─────────────────────────────────────────────────────────────────

const KEYS = {
  preferences: "klaro:preferences",
  capabilities: "klaro:capabilities",
  recentTasks: "klaro:recentTasks",
  onboarding: "klaro:onboarding"
} as const;

const MAX_RECENT_TASKS = 8;

// ── SSR-safe primitive get/set ───────────────────────────────────────────

function safeGet<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be disabled or quota-exceeded; degrade silently.
  }
}

// ── Preferences ──────────────────────────────────────────────────────────

export function getPreferences(): Preferences {
  // Merge with defaults so missing fields don't break consumers.
  return { ...DEFAULT_PREFERENCES, ...safeGet<Partial<Preferences>>(KEYS.preferences, {}) };
}

export function setPreferences(prefs: Preferences): void {
  safeSet(KEYS.preferences, prefs);
}

// ── Capabilities ─────────────────────────────────────────────────────────

export function getCapabilities(): CapabilitiesState {
  return safeGet(KEYS.capabilities, DEFAULT_CAPABILITIES);
}

/**
 * Marks the given capabilities as earned. Idempotent — re-marking an
 * already-earned capability does nothing.
 */
export function markCapabilitiesEarned(ids: CapabilityId[]): CapabilitiesState {
  const current = getCapabilities();
  const next: CapabilitiesState = {
    earned: Array.from(new Set([...current.earned, ...ids]))
  };
  safeSet(KEYS.capabilities, next);
  return next;
}

// ── Recent tasks ─────────────────────────────────────────────────────────

export function getRecentTasks(): RecentTasksState {
  return safeGet(KEYS.recentTasks, DEFAULT_RECENT_TASKS);
}

/**
 * Adds a task slug to the front of the recent list. Idempotent — if the
 * slug already exists, it moves to the front rather than being duplicated.
 * Capped at MAX_RECENT_TASKS.
 */
export function addRecentTask(slug: string): RecentTasksState {
  const current = getRecentTasks();
  const next: RecentTasksState = {
    slugs: [slug, ...current.slugs.filter((s) => s !== slug)].slice(
      0,
      MAX_RECENT_TASKS
    )
  };
  safeSet(KEYS.recentTasks, next);
  return next;
}

// ── Onboarding ───────────────────────────────────────────────────────────

export function getOnboarding(): OnboardingState {
  return safeGet(KEYS.onboarding, DEFAULT_ONBOARDING);
}

/**
 * Marks a task slug as completed. Idempotent.
 */
export function markTaskCompleted(slug: string): OnboardingState {
  const current = getOnboarding();
  if (current.completedSlugs.includes(slug)) return current;
  const next: OnboardingState = {
    completedSlugs: [...current.completedSlugs, slug]
  };
  safeSet(KEYS.onboarding, next);
  return next;
}

// ── Composite ────────────────────────────────────────────────────────────

/**
 * Called from TaskFlow when the user reaches the Reflection step.
 * Persists everything we need to remember about the completion.
 */
export function persistTaskCompletion(
  taskSlug: string,
  capabilities: CapabilityId[]
): void {
  markCapabilitiesEarned(capabilities);
  addRecentTask(taskSlug);
  markTaskCompleted(taskSlug);
}

/**
 * Clears the user's task progress: earned capabilities, recent tasks, and
 * onboarding completion. Preferences (display name, text size, spacing,
 * explanation depth) are deliberately preserved — the user keeps their
 * personal settings, only the progress trail is reset.
 *
 * Used by the "Reset progress" control on the Settings page.
 */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEYS.capabilities);
    window.localStorage.removeItem(KEYS.recentTasks);
    window.localStorage.removeItem(KEYS.onboarding);
  } catch {
    // localStorage may be disabled; degrade silently.
  }
}
