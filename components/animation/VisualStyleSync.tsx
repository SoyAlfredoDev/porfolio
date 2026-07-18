"use client";

import { useLayoutEffect } from "react";
import { useVisualStyle } from "@/context/VisualStyleContext";

/** Keeps <html data-style> in sync with React state (belt + suspenders). */
export function VisualStyleSync() {
  const { style } = useVisualStyle();

  useLayoutEffect(() => {
    document.documentElement.dataset.style = style;
    document.documentElement.dataset.visualStyle = style;
  }, [style]);

  return null;
}
