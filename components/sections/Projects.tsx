"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLocale, useT } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/lib/routes";
import {
  CATEGORY_ACCENTS,
  PORTFOLIO_PROJECTS,
  type PortfolioProject,
} from "@/lib/portfolio-data";
import { type Locale } from "@/lib/translation";

type ProjectsProps = {
  limit?: number;
  showArchiveLink?: boolean;
  preview?: boolean;
};

function getHost(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function FeaturedCard({
  project,
  locale,
  index,
  viewLabel,
}: {
  project: PortfolioProject;
  locale: Locale;
  index: number;
  viewLabel: string;
}) {
  const accent = CATEGORY_ACCENTS[project.category];
  const host = getHost(project.url);
  const description = project.description[locale] ?? project.description.es;

  const content = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        boxShadow: `0 18px 40px ${accent.glow}`,
      }}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${accent.from}28, ${accent.to}18, var(--card))`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(11,18,32,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(11,18,32,.4)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: accent.from }}
          />
          {host ?? project.name}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            }}
          >
            {project.name.charAt(0)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight">{project.name}</h3>
          {project.url && (
            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          )}
        </div>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.url && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            {viewLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </motion.article>
  );

  if (!project.url) return content;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`${viewLabel}: ${project.name}`}
    >
      {content}
    </a>
  );
}

export function Projects({
  limit = 4,
  showArchiveLink = true,
  preview = false,
}: ProjectsProps) {
  const t = useT();
  const locale = useLocale();
  const visible = PORTFOLIO_PROJECTS.filter((p) => p.url).slice(0, limit);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(1,198,118,0.12),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <span className="mb-3 block font-mono text-sm uppercase tracking-wider text-primary">
            {preview ? t("lobby.featured") : t("portfolio.titleHighlight")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            {t("portfolio.title")}{" "}
            <span className="text-primary">{t("portfolio.titleHighlight")}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t("lobby.portfolioDesc")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((project, index) => (
            <FeaturedCard
              key={project.id}
              project={project}
              locale={locale as Locale}
              index={index}
              viewLabel={t("portfolio.viewSite")}
            />
          ))}
        </div>

        {(preview || showArchiveLink) && (
          <div className="mt-14 text-center">
            <Link href={getLocalizedPath(locale, "portfolio")}>
              <Button variant="outline" size="lg" className="group">
                {t("lobby.viewAll")}
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
