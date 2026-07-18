export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export type Dictionary = Record<string, any>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "es": {
      const [hero, footer, about, contact, nav, portfolio] = await Promise.all([
        import("@/dictionaries/es/hero.json"),
        import("@/dictionaries/es/footer.json"),
        import("@/dictionaries/es/about.json"),
        import("@/dictionaries/es/contact.json"),
        import("@/dictionaries/es/nav.json"),
        import("@/dictionaries/es/portfolio.json"),
      ]);
      return {
        ...hero.default,
        ...footer.default,
        ...about.default,
        ...contact.default,
        ...nav.default,
        ...portfolio.default,
      };
    }
    case "en": {
      const [hero, footer, about, contact, nav, portfolio] = await Promise.all([
        import("@/dictionaries/en/hero.json"),
        import("@/dictionaries/en/footer.json"),
        import("@/dictionaries/en/about.json"),
        import("@/dictionaries/en/contact.json"),
        import("@/dictionaries/en/nav.json"),
        import("@/dictionaries/en/portfolio.json"),
      ]);
      return {
        ...hero.default,
        ...footer.default,
        ...about.default,
        ...contact.default,
        ...nav.default,
        ...portfolio.default,
      };
    }
    default:
      return getDictionary("es");
  }
}

export function createT(dict: Dictionary) {
  return (key: string) => dict[key] ?? key;
}
