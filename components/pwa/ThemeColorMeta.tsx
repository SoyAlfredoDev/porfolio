"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useVisualStyle } from "@/context/VisualStyleContext";

const THEME_BY_STYLE: Record<string, { light: string; dark: string }> = {
  modern: { light: "#01c676", dark: "#021f41" },
  retro: { light: "#5c94fc", dark: "#0b1020" },
  christmas: { light: "#c41e3a", dark: "#0f1f14" },
};

/** Keeps <meta name="theme-color"> in sync with visual style + color scheme. */
export function ThemeColorMeta() {
  const { style } = useVisualStyle();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const palette = THEME_BY_STYLE[style] ?? THEME_BY_STYLE.modern;
    const isDark = resolvedTheme === "dark";
    const color = isDark ? palette.dark : palette.light;

    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }, [style, resolvedTheme]);

  return null;
}
