"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { z } from "zod";
import contentCallback from "../dictionaries/content.json";

// Define the schema for the dictionary
const contentSchema = z.object({
  footer: z.object({
    builtWith: z.string(),
    by: z.string(),
    rights: z.string(),
  }),
  switcher: z.object({
    changeTo: z.string(),
  }),
});

export type Content = z.infer<typeof contentSchema>;

// Validate the entire dictionary
const dictionarySchema = z.object({
  es: contentSchema,
  en: contentSchema,
});

const parsedContent = dictionarySchema.parse(contentCallback);

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // t function: accepts a key string, returns translation or fallback
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  // Keep track of mounted state to avoid hydration mismatch if using localStorage
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang && (storedLang === "es" || storedLang === "en")) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = useCallback(
    (key: string): string => {
      // Nested key access function
      const getNestedValue = (obj: any, path: string): string | undefined => {
        return path.split(".").reduce((prev, curr) => {
          return prev ? prev[curr] : undefined;
        }, obj);
      };

      // 1. Try current language
      const value = getNestedValue(parsedContent[language], key);
      if (value) return value;

      // 2. Fallback to default language ('es')
      const fallbackValue = getNestedValue(parsedContent["es"], key);
      if (fallbackValue) return fallbackValue;

      // 3. Return key as last resort
      console.warn(`Translation missing for key: ${key}`);
      return key;
    },
    [language],
  );

  // If not mounted yet, we can render with default or nothing.
  // Given requirements, we render children.
  // "Valor inicial debe ser estrictamente Español" -> useState("es") handles this.

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context; // Returns { language, setLanguage, t }
}
