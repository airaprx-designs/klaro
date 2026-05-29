"use client";

import { useEffect, useState } from "react";
import type { TaskConfig } from "@/lib/tasks/config";
import type { AIResponse } from "@/lib/ai/types";
import { provider } from "@/lib/ai/provider";
import { persistTaskCompletion } from "@/lib/storage/store";
import { usePreferences } from "@/lib/storage/hooks";
import { StepIndicator } from "./StepIndicator";
import { IntentStep } from "./IntentStep";
import { ReviewBeforeSharingStep } from "./ReviewBeforeSharingStep";
import { UploadStep } from "./UploadStep";
import { RedactionStep } from "./RedactionStep";
import { ProcessingStep } from "./ProcessingStep";
import { AIResultCard } from "./AIResultCard";
import { ReflectionCard } from "./ReflectionCard";

/**
 * TaskFlow — Phase 05 state machine for /task/[taskSlug].
 *
 * Holds all in-flight state in React. Nothing here persists. Closing the tab
 * or navigating away discards intent, input, the uploaded image, the redacted
 * image, and the AI response. That is intentional (per the storage rule).
 *
 * Step sequence:
 *   - Non-upload: intent → review-before-sharing → processing → result → reflection
 *   - Upload:     intent → review-before-sharing → upload → redact → processing → result → reflection
 *
 * "processing" is a transient state that fires the AI call. The step indicator
 * displays "result" while processing so the user knows what's coming.
 */

type Step =
  | "intent"
  | "review-before-sharing"
  | "upload"
  | "redact"
  | "processing"
  | "result"
  | "reflection";

const STEP_LABELS: Record<Step, string> = {
  intent: "Tell us what to do",
  "review-before-sharing": "Review what to share",
  upload: "Add a screenshot",
  redact: "Cover private info",
  processing: "Read AI's answer",
  result: "Read AI's answer",
  reflection: "Reflect"
};

function getSequence(requiresUpload: boolean): Step[] {
  return requiresUpload
    ? ["intent", "review-before-sharing", "upload", "redact", "result", "reflection"]
    : ["intent", "review-before-sharing", "result", "reflection"];
}

type Props = {
  task: TaskConfig;
};

export function TaskFlow({ task }: Props) {
  const [step, setStep] = useState<Step>("intent");
  const [selectedIntentId, setSelectedIntentId] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [imageFileSize, setImageFileSize] = useState<number | null>(null);
  const [redactedImageDataUrl, setRedactedImageDataUrl] = useState<string | null>(
    null
  );
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const { preferences } = usePreferences();

  const sequence = getSequence(task.requiresUpload);
  const indicatorStep: Step = step === "processing" ? "result" : step;
  const indicatorIndex = sequence.indexOf(indicatorStep) + 1;
  const indicatorTotal = sequence.length;

  // Persist completion when entering the Reflection step
  useEffect(() => {
    if (step === "reflection") {
      persistTaskCompletion(task.slug, task.capabilitiesEarned);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Fire the AI call when entering processing
  useEffect(() => {
    if (step !== "processing") return;
    let cancelled = false;
    setAiError(null);

    provider
      .generate({
        taskSlug: task.slug,
        intent: selectedIntentId ?? "",
        userInput,
        attachments: redactedImageDataUrl
          ? [{ kind: "image", dataUrl: redactedImageDataUrl }]
          : undefined,
        explanationDepth: preferences.explanationDepth
      })
      .then((response) => {
        if (!cancelled) {
          setAiResponse(response);
          setStep("result");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("AI provider error", err);
        setAiError(message);
      });

    return () => {
      cancelled = true;
    };
    // We only want this to fire on entering "processing".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Step transitions
  const handleIntentContinue = () => setStep("review-before-sharing");
  const handleReviewEdit = () => setStep("intent");
  const handleReviewContinue = () =>
    setStep(task.requiresUpload ? "upload" : "processing");
  const handleUploadContinue = () => setStep("redact");
  const handleUploadBack = () => setStep("review-before-sharing");
  const handleRedactContinue = (dataUrl: string) => {
    setRedactedImageDataUrl(dataUrl);
    setStep("processing");
  };
  const handleRedactBack = () => setStep("upload");
  const handleResultContinue = () => setStep("reflection");

  const isReflection = step === "reflection";

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-12">
      {!isReflection && (
        <aside className="md:col-span-4">
          <StepIndicator
            taskTitle={task.title}
            stepIndex={indicatorIndex}
            stepLabel={STEP_LABELS[indicatorStep]}
            totalSteps={indicatorTotal}
          />
        </aside>
      )}

      <div className={isReflection ? "md:col-span-12" : "md:col-span-8"}>
        {step === "intent" && (
          <IntentStep
            task={task}
            selectedIntentId={selectedIntentId}
            userInput={userInput}
            onIntentChange={setSelectedIntentId}
            onInputChange={setUserInput}
            onContinue={handleIntentContinue}
          />
        )}

        {step === "review-before-sharing" && (
          <ReviewBeforeSharingStep
            task={task}
            userInput={userInput}
            onEdit={handleReviewEdit}
            onContinue={handleReviewContinue}
          />
        )}

        {step === "upload" && (
          <UploadStep
            imageDataUrl={imageDataUrl}
            fileName={imageFileName}
            fileSize={imageFileSize}
            onImageSelected={(dataUrl, fileName, fileSize) => {
              setImageDataUrl(dataUrl);
              setImageFileName(fileName);
              setImageFileSize(fileSize);
            }}
            onImageCleared={() => {
              setImageDataUrl(null);
              setImageFileName(null);
              setImageFileSize(null);
            }}
            onContinue={handleUploadContinue}
            onBack={handleUploadBack}
          />
        )}

        {step === "redact" && imageDataUrl && (
          <RedactionStep
            imageDataUrl={imageDataUrl}
            onContinue={handleRedactContinue}
            onBack={handleRedactBack}
          />
        )}

        {step === "processing" && !aiError && <ProcessingStep />}

        {step === "processing" && aiError && (
          <section role="alert">
            <p className="mb-2 inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-terracotta-deep">
              <span
                aria-hidden="true"
                className="block h-1.5 w-1.5 rounded-full bg-terracotta"
              />
              Something didn&rsquo;t work
            </p>
            <h2>That didn&rsquo;t work.</h2>
            <p className="text-warm-mid">
              We couldn&rsquo;t reach AI just now. Your question hasn&rsquo;t been
              sent.
            </p>
            <p className="mt-4 rounded-md border-[0.75px] border-outline bg-warm-canvas px-4 py-3 text-lg text-warm-mid">
              {aiError}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setAiError(null);
                  setStep("review-before-sharing");
                }}
                className="group inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5"
              >
                Try again
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
        )}

        {step === "result" && aiResponse && (
          <AIResultCard
            response={aiResponse}
            onContinue={handleResultContinue}
          />
        )}

        {step === "reflection" && (
          <ReflectionCard capabilitiesEarned={task.capabilitiesEarned} />
        )}
      </div>
    </div>
  );
}
