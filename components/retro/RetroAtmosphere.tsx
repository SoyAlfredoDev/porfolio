"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMotion } from "@/context/MotionProvider";
import {
  getActiveEffects,
  type SiteView,
} from "@/skills/animation-system/utils/activation";
import { RetroWorldDecor } from "./RetroWorldDecor";

const ParticleField = dynamic(
  () =>
    import("@/skills/animation-system/effects/ParticleField").then(
      (m) => m.ParticleField,
    ),
  { ssr: false, loading: () => null },
);

type Density = "full" | "light";

type Props = {
  view: SiteView;
  density?: Density;
};

/**
 * Arcade ambient: ParticleField stars on Home/full + world decor (SVG/CSS).
 * Avoids a second heavy canvas on light views.
 */
export function RetroAtmosphere({ view, density = "light" }: Props) {
  const motion = useMotion();

  const effects = useMemo(
    () =>
      getActiveEffects(view, "retro", {
        motionLevel: motion.motionLevel,
        deviceTier: motion.deviceTier,
        reducedMotion: motion.reducedMotion,
        isMobile: motion.isMobile,
        saveData: motion.saveData,
        canHeavyFx: motion.canHeavyFx,
        can3D: motion.can3D,
      }),
    [
      view,
      motion.motionLevel,
      motion.deviceTier,
      motion.reducedMotion,
      motion.isMobile,
      motion.saveData,
      motion.canHeavyFx,
      motion.can3D,
    ],
  );

  if (motion.style !== "retro") {
    return null;
  }

  // Particles off when reduced-motion / mobile; SVG world still mounts (static).
  const showParticles =
    density === "full" &&
    motion.motionLevel === "full" &&
    effects.has("particleField") &&
    !motion.isMobile &&
    !motion.reducedMotion &&
    motion.canHeavyFx;

  return (
    <div
      className="retro-atmosphere fixed inset-0 z-[15] pointer-events-none overflow-hidden"
      aria-hidden
    >
      {showParticles && (
        <ParticleField enabled preset="stars" className="absolute inset-0" />
      )}
      <RetroWorldDecor density={density} />
    </div>
  );
}
