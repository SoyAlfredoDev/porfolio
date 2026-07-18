"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useT } from "@/context/LanguageContext";
import { getLocalizedPath, type RouteKey } from "@/lib/routes";
import { Reveal, Stagger } from "@/components/animation";

const cards: { key: RouteKey; descKey: string }[] = [
  { key: "portfolio", descKey: "lobby.portfolioDesc" },
  { key: "play", descKey: "lobby.playDesc" },
  { key: "contact", descKey: "lobby.contactDesc" },
];

export function LobbyExplore() {
  const t = useT();
  const locale = useLocale();

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <Reveal inView className="mb-10 text-center">
          <span
            className="retro-badge inline-block text-primary font-mono text-sm tracking-wider uppercase mb-4 px-3 py-1"
            data-retro-badge
          >
            {t("lobby.explore")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("lobby.exploreTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("lobby.services")}</p>
        </Reveal>

        <Stagger
          inView
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {cards.map(({ key, descKey }) => (
            <Link
              key={key}
              href={getLocalizedPath(locale, key)}
              className="lobby-card group block p-6 rounded-lg border border-border/40 bg-card/80 hover:border-primary transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                {t(`nav.${key}`)}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
              </h3>
              <p className="text-sm text-muted-foreground">{t(descKey)}</p>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
