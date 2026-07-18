"use client";

import { useMotion } from "@/context/MotionProvider";
import { useMousePosition } from "./useMousePosition";

/** Returns translate offsets from mouse; zero when reduced-motion / touch-first. */
export function useParallax(factor = 12) {
  const { shouldAnimate, isMobile, motionLevel } = useMotion();
  const enabled = shouldAnimate && !isMobile && motionLevel === "full";
  const { x, y } = useMousePosition(enabled);

  if (!enabled) return { x: 0, y: 0, style: { transform: "none" } as const };

  return {
    x: x * factor,
    y: y * factor,
    style: {
      transform: `translate3d(${x * factor}px, ${y * factor}px, 0)`,
    } as const,
  };
}
