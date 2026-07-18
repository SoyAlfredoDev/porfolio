"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { useMotion } from "@/context/MotionProvider";

type MagneticState = { x: number; y: number };

/**
 * Spring-like offset toward cursor. Disabled on touch / reduced-motion.
 */
export function useMagneticEffect(strength = 0.35, radius = 120) {
  const { motionLevel, isMobile, shouldAnimate } = useMotion();
  const enabled = shouldAnimate && motionLevel === "full" && !isMobile;
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState<MagneticState>({ x: 0, y: 0 });
  const frame = useRef(0);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || !ref.current) return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius) {
          setOffset({ x: 0, y: 0 });
          return;
        }
        setOffset({ x: dx * strength, y: dy * strength });
      });
    },
    [enabled, radius, strength],
  );

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setOffset({ x: 0, y: 0 });
  }, []);

  return {
    ref,
    enabled,
    style: {
      transform: enabled
        ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
        : undefined,
      transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
    } as CSSProperties,
    handlers: enabled
      ? {
          onPointerMove,
          onPointerLeave,
        }
      : {},
  };
}
