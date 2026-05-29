import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  HelpCircle,
  Heart,
  Map,
  Mail,
  Image as ImageIcon,
  FileText,
  Scale,
  ShieldCheck
} from "lucide-react";

/**
 * Per-task iconography and colour accents.
 *
 * Each task carries one lucide icon and one accent theme. The accent gives
 * the sticker slot in TaskCard / TaskRow a tinted background + matching icon
 * colour. Within the playful-minimalist palette there are only two accent
 * families — terracotta (warmer) and warm-yellow (companion) — so colour
 * variation stays restrained and the page reads as one warm family.
 *
 * Brand refresh · Step 3 (2026-05-29): swapped klaro-blue / deep-blue /
 * warm-amber / success / warning accent assignments for the new two-family
 * system. Tasks alternate between terracotta and warm-yellow stickers so
 * the alternatives row has visible variety without breaking the palette.
 *
 * Accents map to literal Tailwind class names so the JIT scanner picks them
 * up — see the comment on each accent value.
 */

export type TaskIcon = LucideIcon;

export type TaskAccent = {
  bg: string; // background class, e.g. "bg-terracotta-tint"
  text: string; // icon foreground class, e.g. "text-terracotta-deep"
};

const TASK_ICONS: Record<string, LucideIcon> = {
  "get-ideas": Lightbulb,
  "ask-question": HelpCircle,
  "write-greeting": Heart,
  "plan-event-or-trip": Map,
  "write-first-email": Mail,
  "explain-screenshot": ImageIcon,
  "understand-document": FileText,
  "compare-products": Scale,
  "fact-check": ShieldCheck
};

/**
 * Two accent families alternated by task type:
 *   - TERRA: warm coral-toned sticker (terracotta-tint bg, terracotta-deep icon)
 *   - AMBER: warm yellow-toned sticker (warm-yellow at 32% bg, warm-yellow-deep icon)
 *
 * Literal class strings — Tailwind JIT scans this file (under lib/**),
 * so writing them here is enough to compile them into the bundle even
 * when consumed via dynamic className composition.
 */
const TERRA: TaskAccent = {
  bg: "bg-terracotta-tint",
  text: "text-terracotta-deep"
};
const AMBER: TaskAccent = {
  bg: "bg-warm-yellow/32",
  text: "text-warm-yellow-deep"
};

const TASK_ACCENTS: Record<string, TaskAccent> = {
  "get-ideas": TERRA,
  "ask-question": AMBER,
  "write-greeting": TERRA,
  "plan-event-or-trip": AMBER,
  "write-first-email": TERRA,
  "explain-screenshot": AMBER,
  "understand-document": TERRA,
  "compare-products": AMBER,
  "fact-check": TERRA
};

const FALLBACK_ACCENT: TaskAccent = TERRA;

export function getTaskIcon(slug: string): LucideIcon {
  return TASK_ICONS[slug] ?? HelpCircle;
}

export function getTaskAccent(slug: string): TaskAccent {
  return TASK_ACCENTS[slug] ?? FALLBACK_ACCENT;
}
