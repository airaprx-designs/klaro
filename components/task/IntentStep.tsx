"use client";

import type { IntentOption, TaskConfig } from "@/lib/tasks/config";

/**
 * IntentStep — Step 1 of the task journey.
 *
 * Each option is a plain <button> with onClick + aria-pressed. Selection
 * changes both the border and the background fill so the active option is
 * unmistakable.
 *
 * Controlled — value and onChange managed by TaskFlow.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Option pills use the outline + shadow combined treatment. Active state
 *     swaps to a terracotta border + terracotta-tint background + filled
 *     terracotta indicator dot.
 *   - Text input uses outline border, terracotta focus, warm-dark text,
 *     warm-soft placeholder.
 *   - CTA matches the unified terracotta pill (with arrow chip, shadow-cta).
 *   - Heading inherits warm-dark from globals.css; secondary copy in warm-mid.
 */

type Props = {
  task: TaskConfig;
  selectedIntentId: string | null;
  userInput: string;
  onIntentChange: (id: string) => void;
  onInputChange: (value: string) => void;
  onContinue: () => void;
};

export function IntentStep({
  task,
  selectedIntentId,
  userInput,
  onIntentChange,
  onInputChange,
  onContinue
}: Props) {
  const canContinue =
    Boolean(selectedIntentId) && userInput.trim().length > 0;

  return (
    <section>
      <h2>{task.intentHeading}</h2>

      <div className="mt-6 flex flex-col gap-3">
        {task.intentOptions.map((opt: IntentOption) => {
          const checked = opt.id === selectedIntentId;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={checked}
              onClick={() => onIntentChange(opt.id)}
              className={`flex w-full cursor-pointer items-center gap-4 rounded-md px-5 py-4 text-left transition-colors ${
                checked
                  ? "border-[1.5px] border-terracotta bg-terracotta-tint/60 shadow-sm"
                  : "border-[0.75px] border-outline bg-elevated shadow-sm hover:bg-[#FDB322]/15"
              }`}
            >
              <span
                aria-hidden="true"
                className={`inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border-[1.5px] ${
                  checked ? "border-terracotta-deep" : "border-warm-mid"
                }`}
              >
                {checked && (
                  <span className="block h-2 w-2 rounded-full bg-terracotta-deep" />
                )}
              </span>
              <span className="text-lg text-warm-dark">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <label
          htmlFor="task-input"
          className="block font-brand text-lg font-semibold text-warm-dark"
        >
          {task.inputLabel}
        </label>
        <textarea
          id="task-input"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={task.inputPlaceholder}
          rows={4}
          className="mt-3 block w-full resize-none rounded-md border-[0.75px] border-outline bg-elevated px-5 py-4 text-lg text-warm-dark shadow-sm placeholder:text-warm-soft focus-visible:border-terracotta"
        />
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="group inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:border-outline disabled:bg-warm-canvas disabled:text-warm-soft disabled:shadow-none disabled:hover:translate-y-0"
        >
          Continue
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/22 transition-transform group-hover:translate-x-0.5 group-disabled:bg-outline group-disabled:text-warm-soft">
            <svg
              aria-hidden="true"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
            >
              <path
                d="M2 5.5h7M5.5 2L9 5.5 5.5 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
