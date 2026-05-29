/**
 * ProcessingStep — shown while the AI provider call is in flight.
 *
 * Calm by design. No spinner, no progress bar, no AI sparkle. Just a short
 * status line with a small pulsing terracotta dot for life signal.
 * TaskFlow auto-advances to the result step when the response resolves.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Body copy in warm-mid (was graphite).
 *   - Small terracotta pulse dot before the heading for a calm life signal
 *     without resorting to a spinner.
 */

export function ProcessingStep() {
  return (
    <section aria-live="polite">
      <p className="mb-2 inline-flex items-center gap-3 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
        <span
          aria-hidden="true"
          className="relative block h-2 w-2 rounded-full bg-terracotta"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-terracotta opacity-60" />
        </span>
        Thinking
      </p>
      <h2>One moment.</h2>
      <p className="text-warm-mid">
        Klaro is sending your question to AI and reading the response.
      </p>
    </section>
  );
}
