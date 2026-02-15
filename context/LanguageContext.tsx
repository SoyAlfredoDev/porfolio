"use client";

import React, { createContext, useContext, useMemo } from "react";

type Dictionary = Record<string, any>;

type LanguageContextValue = {
  locale: string;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getByPath(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

export function LanguageProvider({
  locale,
  dictionary,
  children,
}: {
  locale: string;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const t = useMemo(() => {
    return (key: string) => {
      const value = getByPath(dictionary, key);
      return typeof value === "string" ? value : key;
    };
  }, [dictionary]);

  const value = useMemo(() => ({ locale, t }), [locale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used inside <LanguageProvider />");
  return ctx.t; // ✅ esto es una función
}

export function useLocale() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLocale must be used inside <LanguageProvider />");
  return ctx.locale;
}
