"use client";

import { cn } from "@/lib/utils";
import { useMotion } from "@/context/MotionProvider";

type HoverGlowProps = {
  children: React.ReactNode;
  className?: string;
  /** CSS color for glow; defaults to primary green. */
  color?: string;
};

export function HoverGlow({
  children,
  className,
  color = "rgba(1, 198, 118, 0.35)",
}: HoverGlowProps) {
  const { shouldAnimate, motionLevel, style } = useMotion();
  const active = shouldAnimate && motionLevel !== "none";
  const isRetro = style === "retro";
  const glow =
    style === "christmas" ? "rgba(212, 175, 55, 0.4)" : color;

  return (
    <div
      className={cn(
        "hover-glow relative transition-shadow duration-300",
        active && !isRetro && "hover:shadow-[0_8px_32px_var(--hover-glow)]",
        className,
      )}
      style={isRetro ? undefined : { ["--hover-glow" as string]: glow }}
    >
      {children}
    </div>
  );
}
