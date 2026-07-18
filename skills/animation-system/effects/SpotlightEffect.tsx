"use client";

import { useRef, useState, type PointerEvent } from "react";
import { useMotion } from "@/context/MotionProvider";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
};

/** Subtle radial spotlight that follows pointer over CTAs. */
export function SpotlightEffect({
  children,
  className,
  enabled = true,
}: Props) {
  const { motionLevel, isMobile, shouldAnimate } = useMotion();
  const active =
    enabled && shouldAnimate && motionLevel === "full" && !isMobile;
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: PointerEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setSpot({
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
        on: true,
      });
    });
  };

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onPointerMove={active ? onMove : undefined}
      onPointerLeave={() => {
        cancelAnimationFrame(frame.current);
        setSpot((s) => ({ ...s, on: false }));
      }}
    >
      {active && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: spot.on ? 1 : 0,
            background: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, rgba(1,198,118,0.18), transparent 55%)`,
          }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
