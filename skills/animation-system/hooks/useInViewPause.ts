"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while element intersects viewport — pause heavy FX when false. */
export function useInViewPause(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "80px",
) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
