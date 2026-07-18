import { type Locale, locales } from "@/lib/translation";

export const routeKeys = ["home", "portfolio", "play", "contact"] as const;
export type RouteKey = (typeof routeKeys)[number];

/** Localized path segments (empty = locale root). */
export const routeSegments: Record<RouteKey, Record<Locale, string>> = {
  home: { es: "", en: "" },
  portfolio: { es: "portafolio", en: "portfolio" },
  play: { es: "juega", en: "play" },
  contact: { es: "contacto", en: "contact" },
};

/** Legacy segments that should map to a route key when switching locale. */
const legacySegmentToKey: Record<string, RouteKey> = {
  game: "play",
};

export function getLocalizedPath(locale: string, key: RouteKey): string {
  const loc = (locales.includes(locale as Locale) ? locale : "es") as Locale;
  const segment = routeSegments[key][loc];
  return segment ? `/${loc}/${segment}` : `/${loc}`;
}

export function getRouteKeyFromSegment(
  segment: string | undefined,
): RouteKey | null {
  if (!segment) return "home";

  if (legacySegmentToKey[segment]) {
    return legacySegmentToKey[segment];
  }

  for (const key of routeKeys) {
    if (key === "home") continue;
    if (
      routeSegments[key].es === segment ||
      routeSegments[key].en === segment
    ) {
      return key;
    }
  }

  return null;
}

/** Swap locale while preserving the equivalent localized route. */
export function translatePathname(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(parts[0] as Locale)
    ? (parts[0] as Locale)
    : null;
  const segment = currentLocale ? parts[1] : parts[0];
  const key = getRouteKeyFromSegment(segment) ?? "home";

  return getLocalizedPath(nextLocale, key);
}
