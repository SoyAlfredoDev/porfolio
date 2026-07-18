"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useMotion } from "@/context/MotionProvider";

/**
 * Lenis smooth scroll — off on mobile/touch (native scroll feels better),
 * and when reduced-motion / motionLevel none.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { motionLevel, shouldAnimate, isMobile } = useMotion();

  useEffect(() => {
    if (!shouldAnimate || motionLevel === "none" || isMobile) return;

    // Prefer native touch scrolling on coarse pointers
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [shouldAnimate, motionLevel, isMobile]);

  return <>{children}</>;
}
