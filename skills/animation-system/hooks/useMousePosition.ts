"use client";

import { useEffect, useState } from "react";
import { rafThrottle } from "../utils/raf";

export type MouseNorm = { x: number; y: number };

/** Normalized mouse position in -1..1 relative to viewport center. */
export function useMousePosition(enabled = true): MouseNorm {
  const [pos, setPos] = useState<MouseNorm>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const onMove = rafThrottle((e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPos({ x, y });
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  return pos;
}
