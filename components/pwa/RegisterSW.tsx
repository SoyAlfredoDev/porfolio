"use client";

import { useEffect } from "react";

/**
 * Registers the production service worker. Skipped in development
 * so HMR / Turbopack aren't fighting a SW.
 */
export function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch {
        /* ignore — PWA is progressive enhancement */
      }
    };

    void register();
  }, []);

  return null;
}
