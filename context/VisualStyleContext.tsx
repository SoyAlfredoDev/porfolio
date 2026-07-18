"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import type { VisualStyle } from "@/lib/animation";

type VisualStyleContextValue = {
  style: VisualStyle;
  setStyle: (style: VisualStyle) => void;
};

const VisualStyleContext = createContext<VisualStyleContextValue | null>(null);

export const STYLE_STORAGE_KEY = "portfolio-visual-style";

function isVisualStyle(value: string | null | undefined): value is VisualStyle {
  return value === "modern" || value === "retro" || value === "christmas";
}

function readStoredStyle(): VisualStyle {
  if (typeof window === "undefined") return "modern";
  try {
    const raw = window.localStorage.getItem(STYLE_STORAGE_KEY);
    if (isVisualStyle(raw)) return raw;
  } catch {
    /* ignore */
  }
  return "modern";
}

function applyStyleToDocument(next: VisualStyle) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.style = next;
  document.documentElement.dataset.visualStyle = next;
}

export function VisualStyleProvider({
  children,
  defaultStyle = "modern",
}: {
  children: React.ReactNode;
  defaultStyle?: VisualStyle;
}) {
  // Always track real style — never gate UI on a stale "defaultStyle" during hydrate
  const [style, setStyleState] = useState<VisualStyle>(defaultStyle);

  useLayoutEffect(() => {
    const stored = readStoredStyle();
    setStyleState(stored);
    applyStyleToDocument(stored);
  }, []);

  const setStyle = useCallback((next: VisualStyle) => {
    setStyleState(next);
    applyStyleToDocument(next);
    try {
      window.localStorage.setItem(STYLE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ style, setStyle }), [style, setStyle]);

  return (
    <VisualStyleContext.Provider value={value}>
      {children}
    </VisualStyleContext.Provider>
  );
}

export function useVisualStyle() {
  const ctx = useContext(VisualStyleContext);
  if (!ctx) {
    throw new Error("useVisualStyle must be used inside <VisualStyleProvider />");
  }
  return ctx;
}
