"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/translation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const currentLocale: Locale = (() => {
    const segments = pathname.split("/");
    const first = segments[1] as Locale | undefined;
    return locales.includes(first as Locale) ? (first as Locale) : "es";
  })();

  const setLocale = (next: Locale) => {
    const parts = pathname.split("/");

    if (locales.includes(parts[1] as Locale)) {
      parts[1] = next;
    } else {
      parts.splice(1, 0, next);
    }

    const newPath = parts.join("/") || `/${next}`;
    router.push(newPath);
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 bg-black/40 backdrop-blur px-2 py-2 rounded-lg border border-white/10">
      <span className="px-2 py-1 text-sm border border-white/10 rounded">
        {(currentLocale ?? "es").toUpperCase()}
      </span>

      <button
        onClick={() => setLocale("es")}
        className="px-3 py-1 rounded border border-white/10 hover:border-white/30"
      >
        ES
      </button>

      <button
        onClick={() => setLocale("en")}
        className="px-3 py-1 rounded border border-white/10 hover:border-white/30"
      >
        EN
      </button>
    </div>
  );
}
