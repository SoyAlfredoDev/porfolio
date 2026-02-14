"use client";

import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#021f41] border border-[#01c676]/30 text-[#01c676] rounded-full px-4 py-2 shadow-lg backdrop-blur-sm hover:border-[#01c676] transition-all hover:scale-105 active:scale-95 cursor-pointer"
    >
      <div className="relative flex items-center gap-2">
        <span className="text-sm font-bold tracking-wider pt-0.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={language}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {language.toUpperCase()}
            </motion.span>
          </AnimatePresence>
        </span>
        <div className="w-2 h-2 rounded-full bg-[#01c676] animate-pulse" />
      </div>
    </button>
  );
}
