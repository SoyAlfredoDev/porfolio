"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useVisualStyle } from "@/context/VisualStyleContext";
import { getRouteKeyFromSegment } from "@/lib/routes";
import type { SiteView } from "../utils/activation";
import { ChristmasAtmosphere } from "./ChristmasAtmosphere";
import { ChristmasDecor } from "./ChristmasDecor";

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
 * Mounts festive atmosphere + decor when style is christmas.
 * Home = full density; other views = light.
 */
export function ChristmasLayer() {
  const { style } = useVisualStyle();
  const view = useSiteView();

  if (style !== "christmas") return null;

  const density = view === "home" ? "full" : "light";

  return (
    <>
      <ChristmasAtmosphere view={view} density={density} />
      <ChristmasDecor density={density} />
    </>
  );
}
