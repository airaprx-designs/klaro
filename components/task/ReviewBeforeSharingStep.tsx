import { X } from "lucide-react";
import type { TaskConfig } from "@/lib/tasks/config";
import { getPrivacyChecklist } from "@/lib/tasks/config";

/**
 * ReviewBeforeSharingStep — Step 2 of the task journey.
 *
 * Per docs/TONE_AND_PRINCIPLES.md (Review before sharing):
 *   "Whenever users upload or share content with AI, Klaro should create a
 *   short moment of awareness before submission."
 *
 * The user's typed input is shown read-only so they re-read their own words.
 * The privacy checklist surfaces the things to leave out. An "Edit my
 * question" link returns to Step 1 (preserving state in TaskFlow).
 *
 * This is awareness, not friction. Continuing without changes is fine.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Quote-card uses outline-warm + soft shadow with a warm-canvas tint
 *     (so it reads as paper inside the page) and a small terracotta marker
 *     by the "What you'll share:" caption.
 *   - Edit link in terracotta-deep with underline.
 *   - Checklist becomes an outlined+shadowed card. Items get small terracotta-
 *     ring circles instead of grey-bordered squares.
 *   - CTA matches the unified terracotta pill with arrow chip.
 */

type Props = {
  task: TaskConfig;
  userInput: string;
  onEdit: () => void;
  onContinue: () => void;
};

export function ReviewBeforeSharingStep({
  task,
  userInput,
  onEdit,
  onContinue
}: Props) {
  const checklist = getPrivacyChecklist(task);

  return (
    <section>
      <h2>Before we ask AI</h2>
      <p className="text-warm-mid">
        Share only what&rsquo;s relevant to your question.
      </p>

      {/* User's typed input, quoted back to them */}
      <figure className="mt-6 rounded-md border-[0.75px] border-outline-warm bg-warm-canvas px-11 py-[30px] shadow-sm">
        <figcaption className="mb-2 text-lg text-warm-mid">
          What you&rsquo;ll share:
        </figcaption>
        <blockquote className="text-lg text-warm-dark">
          {userInput}
        </blockquote>
      </figure>

      <p className="mt-3 text-lg">
        <button
          type="button"
          onClick={onEdit}
          className="text-terracotta-deep underline underline-offset-4 transition-colors hover:text-warm-dark"
        >
          Edit my question
        </button>
      </p>

      {/* Privacy checklist */}
      <div className="mt-8 rounded-md border-[0.75px] border-outline bg-elevated px-11 py-[34px] shadow-sm">
        <h3 className="mb-4 mt-0 font-brand text-lg font-semibold text-warm-dark">
          Things to leave out:
        </h3>
        <ul className="flex flex-col gap-3">
          {checklist.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-warm-dark"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-error text-white"
              >
                <X className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5"
        >
          I&rsquo;ve checked my question
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/22 transition-transform group-hover:translate-x-0.5">
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
