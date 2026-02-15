export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export type Dictionary = Record<string, any>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "es": {
      const [hero, footer] = await Promise.all([
        import("@/dictionaries/es/hero.json"),
        import("@/dictionaries/es/footer.json"),
      ]);
      return { ...hero.default, ...footer.default };
    }
    case "en": {
      const [hero, footer] = await Promise.all([
        import("@/dictionaries/en/hero.json"),
        import("@/dictionaries/en/footer.json"),
      ]);
      return { ...hero.default, ...footer.default };
    }
    default:
      return getDictionary("es");
  }
}

export function createT(dict: Dictionary) {
  return (key: string) => dict[key] ?? key;
}
