"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useMemo, useState } from "react";
import { useMotion } from "@/context/MotionProvider";
import {
  claimAnimationSlot,
  releaseAnimationSlot,
} from "@/lib/animation";
import { getActiveEffects } from "../utils/activation";
import { hasWebGL } from "../utils/raf";

const InteractiveHero = dynamic(() => import("./InteractiveHero"), {
  ssr: false,
  loading: () => null,
});

const AuroraBackground = dynamic(
  () =>
    import("../effects/AuroraBackground").then((m) => m.AuroraBackground),
  { ssr: false, loading: () => null },
);

const ParticleField = dynamic(
  () => import("../effects/ParticleField").then((m) => m.ParticleField),
  { ssr: false, loading: () => null },
);

const FireworksBackground = dynamic(
  () =>
    import("../effects/FireworksBackground").then(
      (m) => m.FireworksBackground,
    ),
  { ssr: false, loading: () => null },
);

const FloatingLeaves = dynamic(
  () => import("../effects/FloatingLeaves").then((m) => m.FloatingLeaves),
  { ssr: false, loading: () => null },
);

/**
 * Orchestrates Home Hero heavy FX by style + capability.
 * Text/LCP content stays outside — this mounts after hydration.
 */
export function HeroAtmosphere() {
  const motion = useMotion();
  const ownerId = useId();
  const [webgl, setWebgl] = useState(false);
  const [sceneOk, setSceneOk] = useState(false);

  const effects = useMemo(
    () =>
      getActiveEffects("home", motion.style, {
        motionLevel: motion.motionLevel,
        deviceTier: motion.deviceTier,
        reducedMotion: motion.reducedMotion,
        isMobile: motion.isMobile,
        saveData: motion.saveData,
        canHeavyFx: motion.canHeavyFx,
        can3D: motion.can3D && webgl,
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
      webgl,
    ],
  );

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  useEffect(() => {
    if (!effects.has("interactiveHero")) {
      setSceneOk(false);
      return;
    }
    const ok = claimAnimationSlot("scene3d", ownerId);
    setSceneOk(ok);
    return () => {
      releaseAnimationSlot("scene3d", ownerId);
      setSceneOk(false);
    };
  }, [effects, ownerId]);

  return (
    <>
      {effects.has("aurora") && <AuroraBackground enabled />}
      {/* Retro stars live in RetroLayer; Christmas FX in ChristmasLayer */}
      {motion.style !== "retro" && effects.has("particleField") && (
        <ParticleField enabled preset="stars" />
      )}
      {motion.style !== "christmas" && effects.has("fireworks") && (
        <FireworksBackground enabled />
      )}
      {motion.style !== "christmas" && effects.has("snow") && (
        <FloatingLeaves enabled mode="snow" />
      )}
      {effects.has("interactiveHero") && sceneOk && <InteractiveHero />}
    </>
  );
}
