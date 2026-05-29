import type { Config } from "tailwindcss";

// Klaro design tokens.
//
// Sources: docs/05_BRAND_GUIDELINES.md, docs/07_DESIGN_SYSTEM.md.
//
// ── Brand refresh · playful minimalist (Steps 1–6 complete, 2026-05-29) ────
// Klaro's palette is a single warm-coral system: cream canvas + terracotta
// accent + warm-yellow companion + warm-dark/mid/soft for text. Card
// surfaces use a 0.75px warm outline + a soft warm-toned drop shadow
// (the "outline + elevated" pattern) — defined edges plus gentle lift.
// The legacy cool palette (klaro-blue, deep-blue, warm-amber*, mid-gray*,
// graphite) was removed in Step 6 once no component referenced it.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // ── Surfaces ─────────────────────────────────────────────────────
        canvas: "#FEF3EC",     // page background — warm peachy cream
        surface: "#F4F1EC",
        elevated: "#FEFDFB",   // card surface — barely-off white, brighter than canvas
        // Warmer canvas option for surfaces that want a richer cream
        // (used on the hero card, redact preview, reflection items, etc.).
        // Tuned to sit warmer than the page canvas so featured surfaces
        // (like TodaysTaskHero) still read as the warmer, raised plane.
        "warm-canvas": "#FFEEDB",

        // ── Single confident accent: bright red-orange ──────────────────
        terracotta: "#F35526",
        "terracotta-deep": "#984F22",   // text-grade — WCAG AA on canvas
        "terracotta-tint": "#FDD9C0",   // sticker / pill / focus tint
        "terracotta-tint-2": "#FFE4D0",

        // ── Companion: warm yellow (the small disc on the hero, second
        //                            sticker family, "AI helped by" bullets)
        "warm-yellow": "#E6B85B",
        "warm-yellow-deep": "#A67E22",

        // ── Peach tint kept for very soft fills ─────────────────────────
        "peach-tint": "#FBE5C1",

        // ── Warm-toned text palette ─────────────────────────────────────
        "warm-dark": "#3D2618",   // primary text + headings — 9.2:1 on canvas
        "warm-mid": "#6B4E3A",    // secondary body            — 5.6:1
        "warm-soft": "#968370",   // tertiary / metadata

        // ── Outline + shadow card treatment ─────────────────────────────
        outline: "#E9D7C9",        // standard warm card border (0.75px)
        "outline-warm": "#FAC5A0", // terracotta-tinted for featured surfaces

        // ── Functional semantics ────────────────────────────────────────
        divider: "#C9CDD2",
        success: "#5A9D6B",
        warning: "#D98B44",
        error: "#C65D5D"
      },
      borderColor: {
        DEFAULT: "#C9CDD2"
      },
      fontFamily: {
        // font-brand now points at Plus Jakarta Sans via the same CSS
        // variable name used previously by Manrope — so every existing
        // `font-brand` consumer picks up the new face without changes.
        brand: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.15", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.25", fontWeight: "700" }],
        body: ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["1rem", { lineHeight: "1.6", fontWeight: "400" }]
      },
      borderRadius: {
        // Radii bump up across the board for the playful-minimalist feel.
        // The DEFAULT (no suffix) is the most-used card radius.
        DEFAULT: "24px",
        sm: "12px",
        md: "20px",
        lg: "28px",
        xl: "36px"
      },
      boxShadow: {
        // Outline+shadow combined treatment (Step 2.5). Soft warm-toned
        // shadows tuned for the cream canvas. Used together with the
        // `border-outline` / `border-outline-warm` 0.75px outline.
        sm: "0 1px 0 rgba(60,40,28,0.03), 0 6px 16px -8px rgba(60,40,28,0.14)",
        DEFAULT: "0 2px 0 rgba(60,40,28,0.04), 0 8px 22px -10px rgba(60,40,28,0.18)",
        md: "0 2px 0 rgba(60,40,28,0.04), 0 8px 22px -10px rgba(60,40,28,0.18)",
        // Warm-tinted shadow for terracotta-leaning surfaces.
        warm: "0 2px 0 rgba(152,79,34,0.06), 0 10px 26px -10px rgba(152,79,34,0.22)",
        // CTA shadow — terracotta tint for a subtle warm "lift."
        cta: "0 1px 0 rgba(255,255,255,0.35) inset, 0 6px 14px -4px rgba(209,116,66,0.50), 0 2px 5px -2px rgba(209,116,66,0.35)"
      },
      maxWidth: {
        content: "1200px",
        reading: "720px"
      }
    }
  },
  plugins: []
};

export default config;
