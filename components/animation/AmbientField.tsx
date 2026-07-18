"use client";

import { useEffect, useId, useState } from "react";
import { useMotion } from "@/context/MotionProvider";
import {
  claimAnimationSlot,
  releaseAnimationSlot,
} from "@/lib/animation";
import { cn } from "@/lib/utils";

type AmbientFieldProps = {
  className?: string;
  /** Only one ambient should mount site-wide (Home hero recommended). */
  enabled?: boolean;
};

/**
 * Lightweight CSS ambient glow — the single "heavy background" for modern.
 * Disabled on mobile / reduced motion / low-tier via MotionProvider.
 * Does not load WebGL. Max one instance via animation budget.
 */
export function AmbientField({
  className,
  enabled = true,
}: AmbientFieldProps) {
  const ownerId = useId();
  const { canHeavyFx, style, shouldAnimate } = useMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled || !canHeavyFx || !shouldAnimate) {
      setActive(false);
      return;
    }
    const ok = claimAnimationSlot("ambient", ownerId);
    setActive(ok);
    return () => releaseAnimationSlot("ambient", ownerId);
  }, [enabled, canHeavyFx, shouldAnimate, ownerId]);

  if (!active) return null;

  // Style-tinted accents without stacking particle systems.
  const orbA =
    style === "christmas"
      ? "bg-red-500/15"
      : style === "retro"
        ? "bg-amber-400/15"
        : "bg-primary/20";
  const orbB =
    style === "christmas"
      ? "bg-emerald-500/12"
      : style === "retro"
        ? "bg-fuchsia-500/10"
        : "bg-sky-500/10";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "absolute top-0 left-1/4 h-96 w-96 rounded-full blur-[128px]",
          orbA,
          shouldAnimate && "animate-pulse",
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-[128px]",
          orbB,
        )}
      />
    </div>
  );
}
