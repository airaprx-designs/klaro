/**
 * StepIndicator — left-column orientation for the task journey.
 *
 * Renders the task title, a small "Step N of M · Label" line, and a row of
 * progress dots (terracotta for completed and current, outline for upcoming).
 *
 * Visual only. State lives in TaskFlow.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Status line in warm-mid (was mid-gray-deep).
 *   - Progress dots use terracotta for completed/current and outline tone
 *     for upcoming (was graphite + divider).
 */

type Props = {
  taskTitle: string;
  stepIndex: number; // 1-based for display
  stepLabel: string;
  totalSteps: number;
};

export function StepIndicator({
  taskTitle,
  stepIndex,
  stepLabel,
  totalSteps
}: Props) {
  const dots = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <header>
      <h1>{taskTitle}</h1>
      <p className="text-lg text-warm-mid">
        Step {stepIndex} of {totalSteps} &middot; {stepLabel}
      </p>
      <ul
        aria-label={`Progress: step ${stepIndex} of ${totalSteps}`}
        className="mt-6 flex items-center gap-2"
      >
        {dots.map((d) => (
          <li
            key={d}
            aria-hidden="true"
            className={[
              "block h-3 w-3 rounded-full",
              d <= stepIndex ? "bg-[#E04974]" : "bg-outline"
            ].join(" ")}
          />
        ))}
      </ul>
    </header>
  );
}
