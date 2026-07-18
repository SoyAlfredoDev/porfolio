"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import {
  detectCapability,
  SSR_CAPABILITY,
  MOTION_EASE,
  MOTION_EASE_RETRO,
  MOTION_EASE_CHRISTMAS,
  REVEAL_BY_STYLE,
  REVEAL_NONE,
  REVEAL_STATIC,
  getStagger,
  getMotionDuration,
  type AnimationCapability,
  type RevealPreset,
} from "@/lib/animation";
import { useVisualStyle } from "@/context/VisualStyleContext";

type MotionContextValue = AnimationCapability & {
  style: ReturnType<typeof useVisualStyle>["style"];
  duration: number;
  ease: readonly [number, number, number, number];
  reveal: RevealPreset;
  stagger: number;
  /** True when we should run enter/scroll reveals (not "none"). */
  shouldAnimate: boolean;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { style } = useVisualStyle();
  const [capability, setCapability] =
    useState<AnimationCapability>(SSR_CAPABILITY);

  useEffect(() => {
    const update = () => setCapability(detectCapability(reducedMotion));
    update();

    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => update();
    mq.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, [reducedMotion]);

  const value = useMemo<MotionContextValue>(() => {
    const duration = getMotionDuration(style, capability.motionLevel);

    const reveal =
      capability.motionLevel === "none"
        ? REVEAL_NONE
        : capability.motionLevel === "reduced"
          ? REVEAL_STATIC
          : REVEAL_BY_STYLE[style];

    return {
      ...capability,
      style,
      duration,
      ease:
        style === "retro"
          ? MOTION_EASE_RETRO
          : style === "christmas"
            ? MOTION_EASE_CHRISTMAS
            : MOTION_EASE,
      reveal,
      stagger: getStagger(style, capability.motionLevel === "full"),
      shouldAnimate: capability.motionLevel !== "none",
    };
  }, [capability, style]);

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotion must be used inside <MotionProvider />");
  }
  return ctx;
}
