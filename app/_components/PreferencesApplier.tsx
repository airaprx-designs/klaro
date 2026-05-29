"use client";

import { useEffect } from "react";
import { usePreferences } from "@/lib/storage/hooks";

/**
 * PreferencesApplier — applies user preferences to the document on the client.
 *
 * Phase 11 wires textSize (and a data-attribute for spacing). The component
 * renders nothing — it's a hook that sets root font-size and document-level
 * attributes based on the user's saved preferences.
 *
 * textSize: changes html font-size, which (because Tailwind sizing is
 * rem-based) scales the entire UI proportionally.
 *
 *   smaller  → 14px (≈ 87.5% of default)
 *   standard → 16px (browser default)
 *   larger   → 18px (≈ 112.5%)
 *
 * spacing: applied as a data-attribute on <html> so future CSS can opt in
 * via attribute selectors. Currently a no-op visually (preference persists
 * but no rules consume it yet) — a future enhancement.
 */

const TEXT_SIZE_PX: Record<string, string> = {
  smaller: "14px",
  standard: "16px",
  larger: "18px"
};

export function PreferencesApplier() {
  const { preferences, hydrated } = usePreferences();

  useEffect(() => {
    if (!hydrated || typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.fontSize = TEXT_SIZE_PX[preferences.textSize] ?? "16px";
    root.dataset.spacing = preferences.spacing;
  }, [preferences, hydrated]);

  return null;
}
