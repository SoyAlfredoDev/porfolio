"use client";

import { useEffect, useState, type RefObject } from "react";
import { rafThrottle } from "../utils/raf";

/**
 * Progress 0..1 for an element through the viewport, or page scroll if no ref.
 */
export function useScrollProgress(ref?: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = rafThrottle(() => {
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const traveled = window.innerHeight - rect.top;
        setProgress(Math.min(1, Math.max(0, traveled / total)));
        return;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : window.scrollY / max);
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}
