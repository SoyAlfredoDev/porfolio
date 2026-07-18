"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMotion } from "@/context/MotionProvider";
import { getActiveEffects, type SiteView } from "../utils/activation";

const FloatingLeaves = dynamic(
  () => import("../effects/FloatingLeaves").then((m) => m.FloatingLeaves),
  { ssr: false, loading: () => null },
);

const FireworksBackground = dynamic(
  () =>
    import("../effects/FireworksBackground").then(
      (m) => m.FireworksBackground,
    ),
  { ssr: false, loading: () => null },
);

type Density = "full" | "light";

type Props = {
  view: SiteView;
  density?: Density;
};

/**
 * Site-wide festive ambient: continuous snow + optional soft fireworks (Home/full).
 * Decorative only — never captures pointer events.
 */
export function ChristmasAtmosphere({ view, density = "light" }: Props) {
  const motion = useMotion();

  const effects = useMemo(
    () =>
      getActiveEffects(view, "christmas", {
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

  if (motion.style !== "christmas" || motion.motionLevel === "none") {
    return null;
  }

  const showFireworks =
    density === "full" && effects.has("fireworks") && !motion.isMobile;

  return (
    <div
      className="xmas-atmosphere fixed inset-0 z-[4] pointer-events-none overflow-hidden"
      aria-hidden
    >
      {effects.has("snow") && (
        <FloatingLeaves
          enabled
          mode="snow"
          intensity={density}
          className="xmas-snow-layer absolute inset-0"
        />
      )}
      {showFireworks && <FireworksBackground enabled />}
    </div>
  );
}
