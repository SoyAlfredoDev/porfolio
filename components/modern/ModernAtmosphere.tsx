"use client";

import type { CSSProperties } from "react";
import { useMotion } from "@/context/MotionProvider";

type Density = "full" | "light";

type Props = {
  density?: Density;
};

/**
 * Subtle modern ambient — CSS only (no canvas / no ambient slot).
 * Home = fuller orbs + dust; other views = quieter wash.
 */
export function ModernAtmosphere({ density = "light" }: Props) {
  const { style, motionLevel, reducedMotion } = useMotion();

  if (style !== "modern" || motionLevel === "none") {
    return null;
  }

  const animate = !reducedMotion;

  return (
    <div
      className={`modern-atmosphere modern-atmosphere-${density}${animate ? "" : " modern-static"}`}
      aria-hidden
    >
      <div className="modern-orb modern-orb-a" />
      <div className="modern-orb modern-orb-b" />
      {density === "full" && <div className="modern-orb modern-orb-c" />}

      <div className="modern-dust">
        {Array.from({ length: density === "full" ? 12 : 6 }, (_, i) => (
          <span
            key={i}
            className="modern-dust-dot"
            style={
              {
                ["--d-x"]: `${8 + ((i * 17) % 84)}%`,
                ["--d-delay"]: `${(i * 0.55) % 6}s`,
                ["--d-dur"]: `${10 + (i % 5) * 1.4}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {density === "full" && <div className="modern-sweep" />}
      <div className="modern-vignette" />
    </div>
  );
}
