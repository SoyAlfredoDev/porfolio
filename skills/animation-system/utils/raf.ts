/** rAF throttle for pointer / scroll handlers. */
export function rafThrottle<T extends (...args: never[]) => void>(fn: T): T {
  let ticking = false;
  let lastArgs: Parameters<T> | null = null;

  const wrapped = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (lastArgs) fn(...lastArgs);
    });
  }) as T;

  return wrapped;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function cappedDpr(max = 1.5): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, max);
}
