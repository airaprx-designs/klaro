"use client";

/**
 * SegmentedControl — three-option toggle used in Settings.
 *
 * Pill container with a warm-canvas track + outline border. The active
 * option is an elevated white pill with a terracotta-tinted outline and
 * terracotta-deep text. Inactive options are quiet warm-mid text.
 *
 * Brand refresh · Step 5 (2026-05-29):
 *   - Track shifts from flat surface to warm-canvas + 0.75px outline + soft
 *     inner shadow (subtle inset feel).
 *   - Active segment uses outline-warm + warm shadow + terracotta-deep text.
 *   - Inactive segments hover to warm-dark.
 *
 * Visual only. Controlled — `value` and `onChange` managed by the parent.
 */

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
  disabled?: boolean;
};

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  disabled = false
}: Props<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={`inline-flex rounded-full border-[0.75px] border-outline bg-warm-canvas p-1 ${
        disabled ? "opacity-50" : ""
      }`}
      style={{ boxShadow: "inset 0 1px 2px rgba(60,40,28,0.05)" }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={`min-h-12 rounded-full border-[0.75px] px-6 text-lg transition-all disabled:cursor-not-allowed ${
              disabled ? "" : "cursor-pointer"
            } ${
              active
                ? "border-outline-warm bg-elevated font-semibold text-terracotta-deep shadow-sm"
                : "border-transparent text-warm-mid hover:text-warm-dark"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
