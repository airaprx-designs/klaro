import type { ReactElement } from "react";

/**
 * Per-task hero illustrations.
 *
 * Step 7 of the brand refresh. Each task gets a small SVG composition that
 * sits in the right column of the Today's task hero (TodaysTaskHero). The
 * compositions share a discipline so the hero language stays coherent:
 *
 *   - 220 × 220 viewBox
 *   - One primary shape (terracotta) + one companion shape (warm-yellow or
 *     peach) + one small accent (dark dot or tiny dotted texture)
 *   - Colors come from the brand CSS variables defined in app/globals.css
 *     so a future palette swap doesn't require touching this file
 *   - Each composition nods at the task's nature WITHOUT being literal —
 *     no icons reproduced, no mascots, no faces, no obvious symbols
 *
 * If a slug doesn't have a custom illustration, the generic blob composition
 * (the old default — terracotta blob + yellow companion + dark accent dot)
 * is returned.
 */

type Illustration = () => ReactElement;

// Shared gradient defs reused across illustrations to keep colors in sync
// with --klaro-accent / --klaro-companion at every call site.
function Defs() {
  return (
    <defs>
      <radialGradient id="hi-primary" cx="32%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#E8865A" />
        <stop offset="60%" stopColor="var(--klaro-accent)" />
        <stop offset="100%" stopColor="var(--klaro-accent-deep)" />
      </radialGradient>
      <radialGradient id="hi-companion" cx="38%" cy="38%" r="60%">
        <stop offset="0%" stopColor="#F3CC78" />
        <stop offset="100%" stopColor="var(--klaro-companion-deep)" />
      </radialGradient>
      <linearGradient id="hi-peach" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDD9C0" />
        <stop offset="100%" stopColor="#F4B797" />
      </linearGradient>
    </defs>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Default — generic blob composition (kept as fallback + initial hero)
// ────────────────────────────────────────────────────────────────────────
const Generic: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    <path
      d="M110 20 Q175 32 184 96 Q193 158 122 178 Q52 198 32 132 Q14 64 110 20 Z"
      fill="url(#hi-primary)"
      stroke="var(--klaro-accent-deep)"
      strokeWidth="0.75"
    />
    <ellipse cx="84" cy="76" rx="22" ry="14" fill="#FFFFFF" fillOpacity="0.32" />
    <circle cx="170" cy="160" r="26" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    <circle cx="48" cy="48" r="7" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// get-ideas · spark composition
// Central terracotta circle with a smaller yellow disc behind it offset
// top-right, plus three small terracotta dots scattered above (idea sparks).
// ────────────────────────────────────────────────────────────────────────
const GetIdeas: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* spark dots */}
    <circle cx="62" cy="40" r="4" fill="var(--klaro-accent-deep)" />
    <circle cx="98" cy="28" r="3" fill="var(--klaro-accent-deep)" fillOpacity="0.7" />
    <circle cx="148" cy="42" r="5" fill="var(--klaro-companion)" />
    <circle cx="180" cy="64" r="3" fill="var(--klaro-accent-deep)" fillOpacity="0.6" />
    {/* yellow companion behind */}
    <circle cx="146" cy="106" r="56" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    {/* terracotta primary */}
    <circle cx="92" cy="130" r="68" fill="url(#hi-primary)" stroke="var(--klaro-accent-deep)" strokeWidth="0.75" />
    {/* shine */}
    <ellipse cx="74" cy="108" rx="20" ry="13" fill="#FFFFFF" fillOpacity="0.32" />
    {/* tiny dark dot */}
    <circle cx="180" cy="172" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// ask-question · open-form composition
// Terracotta C-curve suggesting the hook of a question mark, with a small
// terracotta-deep dot below (the period). Yellow companion behind.
// ────────────────────────────────────────────────────────────────────────
const AskQuestion: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* yellow companion */}
    <circle cx="172" cy="62" r="34" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    {/* question-hook: a thick terracotta C */}
    <path
      d="M68 70 Q68 32 110 32 Q160 32 160 78 Q160 110 122 122 Q108 126 108 144"
      stroke="var(--klaro-accent)"
      strokeWidth="34"
      strokeLinecap="round"
      fill="none"
    />
    {/* hook highlight */}
    <path
      d="M82 64 Q88 40 110 40"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeOpacity="0.28"
      fill="none"
    />
    {/* period — bold dot, terracotta-deep */}
    <circle cx="108" cy="184" r="14" fill="var(--klaro-accent-deep)" />
    {/* tiny dark accent */}
    <circle cx="44" cy="172" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// write-greeting · soft warm composition
// Two overlapping rounded forms suggesting embrace / warmth, without being
// a literal heart. Layered peach + terracotta.
// ────────────────────────────────────────────────────────────────────────
const WriteGreeting: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* peach soft background blob */}
    <path
      d="M50 70 Q50 30 100 30 Q160 30 160 75 Q160 130 110 168 Q60 130 50 90 Z"
      fill="url(#hi-peach)"
    />
    {/* terracotta wave on top */}
    <path
      d="M70 84 Q70 54 110 54 Q150 54 150 92 Q150 124 112 152 Q74 124 70 96 Z"
      fill="url(#hi-primary)"
      stroke="var(--klaro-accent-deep)"
      strokeWidth="0.75"
    />
    {/* shine */}
    <ellipse cx="98" cy="86" rx="18" ry="11" fill="#FFFFFF" fillOpacity="0.35" />
    {/* warm-yellow small disc */}
    <circle cx="172" cy="152" r="22" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    {/* tiny dark accent */}
    <circle cx="42" cy="172" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// plan-event-or-trip · path + destination
// Dotted arc from a small yellow "start" disc to a larger terracotta
// "destination" disc. Suggests journey without an obvious map icon.
// ────────────────────────────────────────────────────────────────────────
const PlanEventOrTrip: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* dotted path */}
    <path
      d="M48 170 Q90 60 184 56"
      stroke="var(--klaro-accent-deep)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="2 9"
      strokeOpacity="0.55"
      fill="none"
    />
    {/* start disc — warm-yellow */}
    <circle cx="48" cy="170" r="18" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    {/* destination disc — terracotta */}
    <circle cx="160" cy="64" r="44" fill="url(#hi-primary)" stroke="var(--klaro-accent-deep)" strokeWidth="0.75" />
    {/* destination pin nub */}
    <circle cx="160" cy="64" r="10" fill="#FFFFFF" fillOpacity="0.45" />
    {/* tiny dark accent */}
    <circle cx="96" cy="186" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// write-first-email · envelope-ish folded form
// Terracotta rounded rectangle with a fold line suggesting envelope flap,
// plus a small warm-yellow "stamp" dot top-right.
// ────────────────────────────────────────────────────────────────────────
const WriteFirstEmail: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* peach back-card */}
    <rect x="32" y="72" width="148" height="104" rx="14" fill="url(#hi-peach)" />
    {/* terracotta envelope front */}
    <rect x="44" y="86" width="148" height="104" rx="14" fill="url(#hi-primary)" stroke="var(--klaro-accent-deep)" strokeWidth="0.75" />
    {/* flap fold */}
    <path
      d="M44 96 L118 144 L192 96"
      stroke="var(--klaro-accent-deep)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeOpacity="0.7"
    />
    {/* stamp dot */}
    <circle cx="172" cy="70" r="16" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    {/* tiny accent */}
    <circle cx="40" cy="40" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// explain-screenshot · frame + content composition
// Terracotta rounded rectangle frame with a warm-yellow disc inside and
// a small horizontal hairline suggesting a content edge.
// ────────────────────────────────────────────────────────────────────────
const ExplainScreenshot: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* frame */}
    <rect
      x="38"
      y="44"
      width="148"
      height="124"
      rx="14"
      fill="var(--klaro-accent-tint)"
      stroke="var(--klaro-accent)"
      strokeWidth="2"
    />
    {/* inner content — yellow disc */}
    <circle cx="146" cy="118" r="34" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    {/* small overlapping terracotta detail (a triangle/mountain hint) */}
    <path
      d="M48 156 L82 110 L120 142 L162 116 L176 156 Z"
      fill="var(--klaro-accent)"
      stroke="var(--klaro-accent-deep)"
      strokeWidth="0.75"
    />
    {/* tiny accent */}
    <circle cx="184" cy="184" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// understand-document · stacked pages
// Two stacked rounded rectangles suggesting documents, with subtle interior
// hairlines on the front sheet (text). Yellow back, terracotta-tint front.
// ────────────────────────────────────────────────────────────────────────
const UnderstandDocument: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* back sheet — warm-yellow */}
    <rect x="52" y="38" width="112" height="144" rx="10" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" transform="rotate(-4 108 110)" />
    {/* front sheet — terracotta-tint with terracotta-deep outline */}
    <rect x="60" y="48" width="112" height="144" rx="10" fill="var(--klaro-accent-tint)" stroke="var(--klaro-accent-deep)" strokeWidth="1.4" />
    {/* text hairlines */}
    <line x1="76" y1="82" x2="148" y2="82" stroke="var(--klaro-accent-deep)" strokeWidth="2" strokeLinecap="round" />
    <line x1="76" y1="102" x2="156" y2="102" stroke="var(--klaro-accent-deep)" strokeWidth="2" strokeLinecap="round" />
    <line x1="76" y1="122" x2="132" y2="122" stroke="var(--klaro-accent-deep)" strokeWidth="2" strokeLinecap="round" />
    <line x1="76" y1="142" x2="148" y2="142" stroke="var(--klaro-accent-deep)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55" />
    {/* tiny dark accent */}
    <circle cx="44" cy="186" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// compare-products · balance / two-disc composition
// Two discs at different heights connected by a slim terracotta-deep beam.
// Terracotta left, warm-yellow right.
// ────────────────────────────────────────────────────────────────────────
const CompareProducts: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* beam */}
    <path
      d="M62 90 Q110 60 168 116"
      stroke="var(--klaro-accent-deep)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      strokeOpacity="0.65"
    />
    {/* vertical line from beam center to ground */}
    <line x1="110" y1="74" x2="110" y2="186" stroke="var(--klaro-accent-deep)" strokeWidth="1.6" strokeOpacity="0.45" strokeDasharray="3 6" />
    <circle cx="110" cy="74" r="4" fill="var(--klaro-accent-deep)" />
    {/* left disc — terracotta */}
    <circle cx="62" cy="118" r="36" fill="url(#hi-primary)" stroke="var(--klaro-accent-deep)" strokeWidth="0.75" />
    {/* right disc — warm-yellow */}
    <circle cx="168" cy="144" r="30" fill="url(#hi-companion)" stroke="var(--klaro-companion-deep)" strokeWidth="0.75" />
    {/* shine on terracotta */}
    <ellipse cx="50" cy="102" rx="10" ry="6" fill="#FFFFFF" fillOpacity="0.35" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// fact-check · shield + check
// Terracotta shield form with a warm-yellow check stroke inside.
// ────────────────────────────────────────────────────────────────────────
const FactCheck: Illustration = () => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <Defs />
    {/* shield */}
    <path
      d="M110 28 Q160 36 168 56 L168 116 Q168 156 110 192 Q52 156 52 116 L52 56 Q60 36 110 28 Z"
      fill="url(#hi-primary)"
      stroke="var(--klaro-accent-deep)"
      strokeWidth="0.75"
    />
    {/* inner shine */}
    <ellipse cx="92" cy="76" rx="22" ry="12" fill="#FFFFFF" fillOpacity="0.32" />
    {/* check stroke — warm-yellow */}
    <path
      d="M76 116 L102 138 L150 86"
      stroke="var(--klaro-companion)"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* tiny dark accent */}
    <circle cx="186" cy="184" r="6" fill="var(--klaro-text)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// Registry
// ────────────────────────────────────────────────────────────────────────
const ILLUSTRATIONS: Record<string, Illustration> = {
  "get-ideas": GetIdeas,
  "ask-question": AskQuestion,
  "write-greeting": WriteGreeting,
  "plan-event-or-trip": PlanEventOrTrip,
  "write-first-email": WriteFirstEmail,
  "explain-screenshot": ExplainScreenshot,
  "understand-document": UnderstandDocument,
  "compare-products": CompareProducts,
  "fact-check": FactCheck
};

export function getTaskHeroIllustration(slug: string): ReactElement {
  const Comp = ILLUSTRATIONS[slug] ?? Generic;
  return <Comp />;
}
