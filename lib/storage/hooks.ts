"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PREFERENCES,
  DEFAULT_CAPABILITIES,
  DEFAULT_RECENT_TASKS,
  DEFAULT_ONBOARDING,
  getPreferences,
  setPreferences as savePreferences,
  getCapabilities,
  getRecentTasks,
  getOnboarding,
  type Preferences,
  type CapabilitiesState,
  type RecentTasksState,
  type OnboardingState
} from "./store";

/**
 * React hooks over the storage layer.
 *
 * Each returns `{ value, hydrated, ...mutators? }`. Before mount and during
 * SSR, `value` is the default and `hydrated` is `false`. After mount,
 * `hydrated` flips to `true` and `value` reflects localStorage. Consumers
 * can render neutral content while `hydrated` is false to avoid the SSR /
 * client hydration mismatch on user-specific data.
 */

export function usePreferences(): {
  preferences: Preferences;
  update: (changes: Partial<Preferences>) => void;
  hydrated: boolean;
} {
  const [preferences, setState] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getPreferences());
    setHydrated(true);
  }, []);

  function update(changes: Partial<Preferences>) {
    setState((prev) => {
      const next = { ...prev, ...changes };
      savePreferences(next);
      return next;
    });
  }

  return { preferences, update, hydrated };
}

export function useCapabilities(): {
  capabilities: CapabilitiesState;
  hydrated: boolean;
} {
  const [capabilities, setState] = useState<CapabilitiesState>(DEFAULT_CAPABILITIES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getCapabilities());
    setHydrated(true);
  }, []);

  return { capabilities, hydrated };
}

export function useRecentTasks(): {
  recentTasks: RecentTasksState;
  hydrated: boolean;
} {
  const [recentTasks, setState] = useState<RecentTasksState>(DEFAULT_RECENT_TASKS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getRecentTasks());
    setHydrated(true);
  }, []);

  return { recentTasks, hydrated };
}

export function useOnboarding(): {
  onboarding: OnboardingState;
  hydrated: boolean;
} {
  const [onboarding, setState] = useState<OnboardingState>(DEFAULT_ONBOARDING);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getOnboarding());
    setHydrated(true);
  }, []);

  return { onboarding, hydrated };
}
