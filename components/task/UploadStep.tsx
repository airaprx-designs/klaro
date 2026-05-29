"use client";

import { useRef, useState } from "react";

/**
 * UploadStep — Phase 5 component, Phase 7 polished.
 *
 * Single PNG / JPG upload. Held in React state only; never persisted.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Drop zone: warm dashed outline by default, switches to terracotta solid
 *     + terracotta-tint background when a file is being dragged.
 *   - Preview surface: outline + soft shadow on warm-canvas.
 *   - All CTAs unified to the terracotta pill with arrow chip.
 *   - Secondary "Choose a different file" button uses warm-canvas + outline,
 *     hover swaps to outline-warm.
 *   - Error message in terracotta-tinted alert; back link in terracotta-deep.
 */

type Props = {
  imageDataUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  onImageSelected: (
    dataUrl: string,
    fileName: string,
    fileSize: number
  ) => void;
  onImageCleared: () => void;
  onContinue: () => void;
  onBack: () => void;
};

const ACCEPTED = "image/png,image/jpeg";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadStep({
  imageDataUrl,
  fileName,
  fileSize,
  onImageSelected,
  onImageCleared,
  onContinue,
  onBack
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | undefined) {
    setError(null);
    if (!file) return;

    // Validate type. The file picker's accept attribute restricts its dialog,
    // but drag-and-drop can deliver anything.
    if (!/^image\/(png|jpeg)$/.test(file.type)) {
      setError("That's not a PNG or JPG. Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageSelected(reader.result, file.name, file.size);
      }
    };
    reader.onerror = () => {
      setError("Something went wrong reading the file. Try again?");
    };
    reader.readAsDataURL(file);
  }

  return (
    <section>
      <h2>Add a screenshot</h2>
      <p className="text-warm-mid">
        Choose a file from your computer, or drag one here.
      </p>

      {imageDataUrl ? (
        <div className="mt-6 rounded-md border-[0.75px] border-outline bg-warm-canvas p-6 shadow-sm">
          <img
            src={imageDataUrl}
            alt={fileName ? `Preview of ${fileName}` : "Selected upload preview"}
            className="block max-h-96 w-full rounded object-contain"
          />
          {fileName && (
            <p className="mt-4 text-lg text-warm-mid">
              <span className="text-warm-dark">{fileName}</span>
              {fileSize != null && (
                <>
                  {" · "}
                  {formatBytes(fileSize)}
                </>
              )}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onContinue}
              className="group inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5"
            >
              Looks good, continue
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
            <button
              type="button"
              onClick={() => {
                onImageCleared();
                setError(null);
                inputRef.current?.click();
              }}
              className="inline-flex min-h-14 cursor-pointer items-center justify-center rounded-full border-[0.75px] border-outline bg-white px-7 text-lg font-medium text-warm-dark transition-colors hover:border-[#F35526]"
            >
              Choose a different file
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`mt-6 flex flex-col items-center justify-center gap-4 rounded-md px-6 py-12 text-center transition-colors ${
            dragActive
              ? "border-[1.5px] border-terracotta bg-terracotta-tint/40"
              : "border-[1.5px] border-dashed border-outline-warm bg-warm-canvas"
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!dragActive) setDragActive(true);
          }}
          onDragLeave={(e) => {
            if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
        >
          <p className="text-warm-dark">Drag a file here, or browse.</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5"
          >
            Choose a file
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
          <p className="text-lg text-warm-mid">
            PNG or JPG. We won&rsquo;t keep a copy.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
            className="sr-only"
          />
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-md border-[0.75px] border-outline-warm bg-terracotta-tint/40 px-5 py-4 text-lg text-warm-dark"
        >
          {error}
        </p>
      )}

      <p className="mt-6 text-lg">
        <button
          type="button"
          onClick={onBack}
          className="text-terracotta-deep underline underline-offset-4 transition-colors hover:text-warm-dark"
        >
          &larr; Back
        </button>
      </p>
    </section>
  );
}
