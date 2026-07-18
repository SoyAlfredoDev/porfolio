"use client";

import { useMemo } from "react";
import { useMotion } from "@/context/MotionProvider";
import type { VisualStyle } from "@/lib/animation";

export type ParticlePreset = "stars" | "energy" | "snow" | "aurora-dust";

export type ParticleConfig = {
  count: number;
  density: number;
  opacity: number;
  preset: ParticlePreset;
  enabled: boolean;
};

const BASE_COUNT: Record<ParticlePreset, number> = {
  stars: 48,
  energy: 28,
  snow: 56,
  "aurora-dust": 40,
};

export function useParticleSystem(
  preset: ParticlePreset,
  style?: VisualStyle,
): ParticleConfig {
  const { deviceTier, isMobile, canHeavyFx, motionLevel, style: ctxStyle } =
    useMotion();
  const activeStyle = style ?? ctxStyle;

  return useMemo(() => {
    if (motionLevel === "none") {
      return {
        count: 0,
        density: 0,
        opacity: 0,
        preset,
        enabled: false,
      };
    }

    // Festive snow is light; allow without heavy FX (mobile / save-data).
    const lightSnow =
      activeStyle === "christmas" && preset === "snow";

    if (!canHeavyFx && !lightSnow) {
      return {
        count: 0,
        density: 0,
        opacity: 0,
        preset,
        enabled: false,
      };
    }

    let count = BASE_COUNT[preset];
    if (deviceTier === "medium") count = Math.round(count * 0.65);
    if (isMobile) count = Math.round(count * 0.45);
    if (lightSnow && !canHeavyFx) count = Math.max(16, Math.round(count * 0.6));
    if (lightSnow && isMobile) count = Math.max(14, count);
    if (activeStyle === "christmas" && preset === "snow" && canHeavyFx) {
      count += 12;
    }
    if (activeStyle === "retro" && preset === "stars") count += 12;

    return {
      count,
      density: isMobile ? 0.4 : deviceTier === "high" ? 1 : 0.7,
      opacity: preset === "energy" ? 0.35 : 0.55,
      preset,
      enabled: count > 0,
    };
  }, [preset, deviceTier, isMobile, canHeavyFx, motionLevel, activeStyle]);
}
