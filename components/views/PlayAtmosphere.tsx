"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMotion } from "@/context/MotionProvider";
import { getActiveEffects } from "@/skills/animation-system/utils/activation";

const EnergyParticles = dynamic(
  () =>
    import("@/skills/animation-system/effects/EnergyParticles").then(
      (m) => m.EnergyParticles,
    ),
  { ssr: false, loading: () => null },
);

export function PlayAtmosphere() {
  const motion = useMotion();
  const effects = useMemo(
    () =>
      getActiveEffects("play", motion.style, {
        motionLevel: motion.motionLevel,
        deviceTier: motion.deviceTier,
        reducedMotion: motion.reducedMotion,
        isMobile: motion.isMobile,
        saveData: motion.saveData,
        canHeavyFx: motion.canHeavyFx,
        can3D: motion.can3D,
      }),
    [
      motion.style,
      motion.motionLevel,
      motion.deviceTier,
      motion.reducedMotion,
      motion.isMobile,
      motion.saveData,
      motion.canHeavyFx,
      motion.can3D,
    ],
  );

  if (!effects.has("energyParticles")) return null;

  return <EnergyParticles enabled />;
}
