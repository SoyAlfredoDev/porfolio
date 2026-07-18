import type { RevealPreset, VisualStyle } from "./types";

/** Shared timings — keep short; premium ≠ slow. */
export const MOTION_DURATION = {
  none: 0,
  reduced: 0.2,
  full: 0.45,
  /** Arcade hop — snappy */
  retro: 0.28,
  /** Soft festive enter */
  christmas: 0.5,
} as const;

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

/** Steps-feeling cubic for arcade (approx blink/hop). */
export const MOTION_EASE_RETRO = [0.34, 1.56, 0.64, 1] as const;

/** Soft ease for festive fade */
export const MOTION_EASE_CHRISTMAS = [0.16, 1, 0.3, 1] as const;

const modernReveal: RevealPreset = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/** Hop + scale — arcade insert coin energy */
const retroReveal: RevealPreset = {
  hidden: { opacity: 0, y: 28, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const christmasReveal: RevealPreset = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const REVEAL_BY_STYLE: Record<VisualStyle, RevealPreset> = {
  modern: modernReveal,
  retro: retroReveal,
  christmas: christmasReveal,
};

/** Instant / opacity-only when motion is off or reduced. */
export const REVEAL_STATIC: RevealPreset = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const REVEAL_NONE: RevealPreset = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function getStagger(style: VisualStyle, full: boolean): number {
  if (!full) return 0.04;
  switch (style) {
    case "retro":
      return 0.06;
    case "christmas":
      return 0.08;
    default:
      return 0.07;
  }
}

export function getMotionDuration(
  style: VisualStyle,
  level: "none" | "reduced" | "full",
): number {
  if (level === "none") return MOTION_DURATION.none;
  if (level === "reduced") return MOTION_DURATION.reduced;
  if (style === "retro") return MOTION_DURATION.retro;
  if (style === "christmas") return MOTION_DURATION.christmas;
  return MOTION_DURATION.full;
}
