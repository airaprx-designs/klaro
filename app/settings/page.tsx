"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeading } from "@/components/PageHeading";
import { SegmentedControl } from "@/components/SegmentedControl";
import { usePreferences } from "@/lib/storage/hooks";
import { resetProgress } from "@/lib/storage/store";

/**
 * Settings — preferences persisted to localStorage via usePreferences.
 *
 * Display name is the only fully-functional setting in this build. Text size,
 * spacing, and explanation depth controls are visible but disabled — the
 * underlying data persists, the SegmentedControls are non-interactive and
 * carry a small "(coming soon)" hint so users understand. They'll re-enable
 * when the corresponding behaviour is wired up (text size + spacing apply via
 * PreferencesApplier and a CSS density variable; explanation depth only has
 * effect with the real Anthropic provider).
 *
 * Brand refresh · Step 5: labels in warm-dark; muted to warm-soft when the
 * section is disabled. Display-name input has outline + shadow-sm + terracotta
 * focus border.
 */
export default function SettingsPage() {
  const { preferences, update } = usePreferences();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  function handleReset() {
    resetProgress();
    setConfirming(false);
    setResetDone(true);
    // Refresh server components so /progress + Home reflect the cleared state
    // next time the user visits them.
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-12">
      <PageHeading
        title="Settings"
        subtitle="Choose what works for you."
      />

      {/* Display name — fully functional. Label vertically centered with the
          input box via md:items-center on the parent grid. */}
      <section className="grid gap-4 md:grid-cols-12 md:items-center md:gap-12">
        <div className="md:col-span-4">
          <label
            htmlFor="display-name"
            className="block font-brand text-xl font-semibold text-warm-dark"
          >
            What should we call you?
          </label>
        </div>
        <div className="md:col-span-8">
          <input
            id="display-name"
            type="text"
            value={preferences.displayName}
            onChange={(e) => update({ displayName: e.target.value })}
            placeholder="e.g., Sarah"
            className="block w-full max-w-md rounded-md border-[0.75px] border-outline bg-elevated px-5 py-4 text-lg text-warm-dark shadow-sm placeholder:text-warm-soft focus-visible:border-terracotta"
          />
        </div>
      </section>

      {/* Text size — disabled (works subtly via PreferencesApplier but no
          live preview, so off for v1). */}
      <section className="grid gap-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="block font-brand text-lg font-semibold text-warm-soft">
            Text size{" "}
            <span className="text-base font-medium italic">(coming soon)</span>
          </p>
        </div>
        <div className="md:col-span-8">
          <SegmentedControl
            ariaLabel="Text size"
            value={preferences.textSize}
            disabled
            options={[
              { value: "smaller", label: "Smaller" },
              { value: "standard", label: "Standard" },
              { value: "larger", label: "Larger" }
            ]}
            onChange={(textSize) => update({ textSize })}
          />
        </div>
      </section>

      {/* Spacing — disabled (subtle CSS density scaling, parked for v1). */}
      <section className="grid gap-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="block font-brand text-lg font-semibold text-warm-soft">
            Spacing{" "}
            <span className="text-base font-medium italic">(coming soon)</span>
          </p>
        </div>
        <div className="md:col-span-8">
          <SegmentedControl
            ariaLabel="Spacing"
            value={preferences.spacing}
            disabled
            options={[
              { value: "compact", label: "Compact" },
              { value: "standard", label: "Standard" },
              { value: "roomy", label: "Roomy" }
            ]}
            onChange={(spacing) => update({ spacing })}
          />
        </div>
      </section>

      {/* Explanation depth — disabled (only has effect with the real
          Anthropic provider; no-op while running on the mock). */}
      <section className="grid gap-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="block font-brand text-lg font-semibold text-warm-soft">
            How much detail should AI give?{" "}
            <span className="text-base font-medium italic">(coming soon)</span>
          </p>
        </div>
        <div className="md:col-span-8">
          <SegmentedControl
            ariaLabel="Explanation depth"
            value={preferences.explanationDepth}
            disabled
            options={[
              { value: "brief", label: "Brief" },
              { value: "standard", label: "Standard" },
              { value: "in-depth", label: "In-depth" }
            ]}
            onChange={(explanationDepth) => update({ explanationDepth })}
          />
        </div>
      </section>

      {/* Reset progress — destructive, two-click confirm. Clears earned
          capabilities, recent tasks, and onboarding completion. Display
          name and other preferences are preserved. */}
      <section className="grid gap-4 md:grid-cols-12 md:items-center md:gap-12">
        <div className="md:col-span-4">
          <p className="block font-brand text-xl font-semibold text-warm-dark">
            Reset progress
          </p>
          <p className="mt-1 text-base text-warm-mid">
            Clears the tasks you&rsquo;ve tried and what you&rsquo;ve learned. Your name and other settings stay.
          </p>
        </div>
        <div className="md:col-span-8">
          {resetDone ? (
            <p
              role="status"
              className="inline-flex min-h-14 items-center rounded-full border-[0.75px] border-outline-warm bg-warm-canvas px-6 text-lg text-warm-dark shadow-sm"
            >
              Progress reset. You&rsquo;re starting fresh.
            </p>
          ) : confirming ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg text-warm-dark">Are you sure?</span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-14 cursor-pointer items-center rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-6 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5"
              >
                Yes, reset
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="inline-flex min-h-14 cursor-pointer items-center justify-center rounded-full border-[0.75px] border-outline bg-white px-6 text-lg font-medium text-warm-dark transition-colors hover:border-[#F35526]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex min-h-14 cursor-pointer items-center justify-center rounded-full border-[0.75px] border-outline bg-white px-6 text-lg font-medium text-warm-dark transition-colors hover:border-[#F35526]"
            >
              Reset progress
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
