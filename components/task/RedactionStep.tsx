"use client";

import { useEffect, useRef, useState } from "react";

/**
 * RedactionStep — Phase 5 component, Phase 7 polished.
 *
 * Lets the user cover sensitive parts of the uploaded image with graphite
 * rectangles before AI sees it. Solid fill, not blur, because blur can be
 * reversed.
 *
 * Continuing with no rectangles is allowed. The privacy step already did
 * its job; this step is for additional protection.
 *
 * When the user continues, we render the canvas (image + rectangles) to a
 * data URL and pass it to the parent. The original image is never sent.
 *
 * Brand refresh · Step 4 (2026-05-29):
 *   - Surrounding UI shell migrated to warm-toned outline + soft shadow.
 *   - Undo / Clear become outlined warm-canvas pills (hover lifts via
 *     border-outline-warm); disabled state uses warm-soft text.
 *   - Primary "Looks ready" CTA matches the unified terracotta pill.
 *   - Back link in terracotta-deep with underline.
 *   - REDACTION_FILL stays graphite (#2C3137) — the redaction cover-up tool
 *     deliberately retains its dark color because high contrast against ANY
 *     image is required for the safety guarantee; this is not a brand decision
 *     and the brand refresh does not touch it.
 */

type Rect = { x: number; y: number; w: number; h: number };

type Props = {
  imageDataUrl: string;
  onContinue: (redactedDataUrl: string) => void;
  onBack: () => void;
};

const REDACTION_FILL = "#2C3137"; // intentionally graphite — high contrast against any image
const MAX_CANVAS_WIDTH = 720;
const MIN_RECT_SIZE = 6;

export function RedactionStep({ imageDataUrl, onContinue, onBack }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [rects, setRects] = useState<Rect[]>([]);
  const draggingRef = useRef<{ startX: number; startY: number } | null>(null);
  const [draftRect, setDraftRect] = useState<Rect | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ratio = Math.min(MAX_CANVAS_WIDTH / img.width, 1);
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      render();
    };
    img.src = imageDataUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageDataUrl]);

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rects, draftRect]);

  function render() {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = REDACTION_FILL;
    rects.forEach((r) => ctx.fillRect(r.x, r.y, r.w, r.h));
    if (draftRect) {
      ctx.fillStyle = REDACTION_FILL;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(draftRect.x, draftRect.y, draftRect.w, draftRect.h);
      ctx.globalAlpha = 1;
    }
  }

  function pointerFromEvent(
    clientX: number,
    clientY: number
  ): { x: number; y: number } {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function startDrag(x: number, y: number) {
    draggingRef.current = { startX: x, startY: y };
    setDraftRect({ x, y, w: 0, h: 0 });
  }

  function moveDrag(x: number, y: number) {
    const start = draggingRef.current;
    if (!start) return;
    setDraftRect({
      x: Math.min(start.startX, x),
      y: Math.min(start.startY, y),
      w: Math.abs(x - start.startX),
      h: Math.abs(y - start.startY)
    });
  }

  function endDrag() {
    if (draftRect && draftRect.w >= MIN_RECT_SIZE && draftRect.h >= MIN_RECT_SIZE) {
      setRects((prev) => [...prev, draftRect]);
    }
    draggingRef.current = null;
    setDraftRect(null);
  }

  function onMouseDown(e: React.MouseEvent) {
    const p = pointerFromEvent(e.clientX, e.clientY);
    startDrag(p.x, p.y);
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!draggingRef.current) return;
    const p = pointerFromEvent(e.clientX, e.clientY);
    moveDrag(p.x, p.y);
  }
  function onMouseUp() {
    endDrag();
  }

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    const p = pointerFromEvent(t.clientX, t.clientY);
    startDrag(p.x, p.y);
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!draggingRef.current) return;
    const t = e.touches[0];
    if (!t) return;
    e.preventDefault();
    const p = pointerFromEvent(t.clientX, t.clientY);
    moveDrag(p.x, p.y);
  }
  function onTouchEnd() {
    endDrag();
  }

  function handleContinue() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    render();
    const dataUrl = canvas.toDataURL("image/png");
    onContinue(dataUrl);
  }

  const hasRects = rects.length > 0;

  return (
    <section>
      <h2>Cover anything you want to keep private</h2>
      <p className="text-warm-mid">
        Names, addresses, or anything personal. AI will only see the covered
        version. If there&apos;s nothing to cover, you can continue.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setRects((prev) => prev.slice(0, -1))}
          disabled={!hasRects}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border-[0.75px] border-outline bg-white px-5 text-lg font-medium text-warm-dark transition-colors hover:border-[#F35526] disabled:cursor-not-allowed disabled:border-outline disabled:text-warm-soft disabled:hover:border-outline"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => setRects([])}
          disabled={!hasRects}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border-[0.75px] border-outline bg-white px-5 text-lg font-medium text-warm-dark transition-colors hover:border-[#F35526] disabled:cursor-not-allowed disabled:border-outline disabled:text-warm-soft disabled:hover:border-outline"
        >
          Clear all
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-md border-[0.75px] border-outline bg-elevated p-3 shadow-sm">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={endDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="block max-w-full cursor-crosshair touch-none"
          style={{ width: "100%", height: "auto" }}
          aria-label="Image redaction canvas. Drag to cover an area."
        />
      </div>

      <p className="mt-3 text-lg text-warm-mid">
        Tap and drag to cover an area.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleContinue}
          className="group inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full border-[0.75px] border-terracotta-deep bg-terracotta px-7 text-lg font-semibold text-canvas shadow-cta transition-transform hover:-translate-y-0.5"
        >
          Looks ready
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
          onClick={onBack}
          className="text-terracotta-deep underline underline-offset-4 transition-colors hover:text-warm-dark"
        >
          &larr; Back
        </button>
      </div>
    </section>
  );
}
