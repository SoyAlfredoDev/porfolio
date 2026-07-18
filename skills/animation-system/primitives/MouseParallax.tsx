"use client";

import { cn } from "@/lib/utils";
import { useParallax } from "../hooks/useParallax";

type MouseParallaxProps = {
  children: React.ReactNode;
  className?: string;
  factor?: number;
  /** Decorative only — always aria-hidden. */
};

/** Lightweight decorative parallax. Do not wrap reading text. */
export function MouseParallax({
  children,
  className,
  factor = 10,
}: MouseParallaxProps) {
  const { style } = useParallax(factor);

  return (
    <div
      className={cn("will-change-transform", className)}
      style={style}
      aria-hidden
    >
      {children}
    </div>
  );
}
