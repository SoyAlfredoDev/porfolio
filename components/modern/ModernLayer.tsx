"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useVisualStyle } from "@/context/VisualStyleContext";
import { getRouteKeyFromSegment } from "@/lib/routes";
import { ModernAtmosphere } from "./ModernAtmosphere";

function useIsHome(): boolean {
  const pathname = usePathname();
  return useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const segment = parts[1];
    const key = getRouteKeyFromSegment(segment) ?? "home";
    return key === "home";
  }, [pathname]);
}

/**
 * Subtle living atmosphere for modern — full on Home, light elsewhere.
 */
export function ModernLayer() {
  const { style } = useVisualStyle();
  const isHome = useIsHome();

  if (style !== "modern") return null;

  return <ModernAtmosphere density={isHome ? "full" : "light"} />;
}
