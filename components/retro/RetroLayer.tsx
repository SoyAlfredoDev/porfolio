"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useVisualStyle } from "@/context/VisualStyleContext";
import { getRouteKeyFromSegment } from "@/lib/routes";
import type { SiteView } from "@/skills/animation-system/utils/activation";
import { RetroAtmosphere } from "./RetroAtmosphere";

function useSiteView(): SiteView {
  const pathname = usePathname();
  return useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const segment = parts[1];
    const key = getRouteKeyFromSegment(segment) ?? "home";
    return key as SiteView;
  }, [pathname]);
}

/**
 * Mounts arcade atmosphere when style is retro.
 * Home = full; other views = light.
 */
export function RetroLayer() {
  const { style } = useVisualStyle();
  const view = useSiteView();

  if (style !== "retro") return null;

  const density = view === "home" ? "full" : "light";

  return <RetroAtmosphere view={view} density={density} />;
}
