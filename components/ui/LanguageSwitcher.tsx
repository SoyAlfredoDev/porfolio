"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/translation";
import { translatePathname } from "@/lib/routes";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const currentLocale: Locale = (() => {
    const segments = pathname.split("/");
    const first = segments[1] as Locale | undefined;
    return locales.includes(first as Locale) ? (first as Locale) : "es";
  })();

  const setLocale = (next: Locale) => {
    router.push(translatePathname(pathname, next));
  };

  return (
    <div className="lang-switcher fixed bottom-4 right-4 z-[90] flex gap-1 bg-black/50 backdrop-blur-md px-1.5 py-1.5 rounded-xl border border-border/40 shadow-lg">
      <button
        type="button"
        onClick={() => setLocale("es")}
        aria-pressed={currentLocale === "es"}
        aria-label="Español"
        data-retro-label
        className={`ui-btn ui-btn-outline min-h-11 min-w-11 px-3 py-2 rounded-lg border border-border/40 text-sm font-semibold ${
          currentLocale === "es"
            ? "bg-primary text-primary-foreground border-primary"
            : "hover:border-primary active:bg-primary/10"
        }`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={currentLocale === "en"}
        aria-label="English"
        data-retro-label
        className={`ui-btn ui-btn-outline min-h-11 min-w-11 px-3 py-2 rounded-lg border border-border/40 text-sm font-semibold ${
          currentLocale === "en"
            ? "bg-primary text-primary-foreground border-primary"
            : "hover:border-primary active:bg-primary/10"
        }`}
      >
        EN
      </button>
    </div>
  );
}
