"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useT } from "@/context/LanguageContext";
import {
  CATEGORY_ACCENTS,
  PORTFOLIO_PROJECTS,
  PROJECT_CATEGORIES,
  type PortfolioProject,
  type ProjectCategory,
} from "@/lib/portfolio-data";
import { type Locale } from "@/lib/translation";
import { cn } from "@/lib/utils";
import { HoverGlow } from "@/skills/animation-system/primitives";
import styles from "./PortfolioWorks.module.css";

type FilterKey = "all" | ProjectCategory;

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 800;

function getDisplayUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function FloatingDecor() {
  return (
    <div className={styles.decor} aria-hidden="true">
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          className={styles.spark}
          style={{
            left: `${(i * 13 + 7) % 92}%`,
            top: `${(i * 19 + 12) % 78}%`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${4 + (i % 3)}s`,
          }}
        />
      ))}
      <div className={styles.mesh} />
    </div>
  );
}

function SitePreviewFallback({
  page,
  accent,
  isActive,
}: {
  page: PortfolioProject;
  accent: { from: string; to: string; glow: string };
  isActive: boolean;
}) {
  const domain = page.url ? getDisplayUrl(page.url) : page.name;

  return (
    <div
      className={cn(styles.fallback, isActive && styles.fallbackActive)}
      style={
        {
          "--works-accent-from": accent.from,
          "--works-accent-to": accent.to,
          "--works-accent-glow": accent.glow,
        } as CSSProperties
      }
    >
      <div
        className={styles.fallbackBg}
        style={{
          background: `linear-gradient(145deg, ${accent.from}18, ${accent.to}28, var(--card))`,
        }}
      />
      <div className={styles.fallbackContent}>
        <div className={styles.fallbackIcon}>
          {domain.charAt(0).toUpperCase()}
        </div>
        <p className={styles.fallbackName}>{page.name}</p>
        <p className={styles.fallbackDomain}>{domain}</p>
      </div>
      <div className={styles.fallbackLines}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function BrowserPreview({
  page,
  isActive,
  accent,
}: {
  page: PortfolioProject;
  isActive: boolean;
  accent: { from: string; to: string; glow: string };
}) {
  const browserRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [iframeFailed, setIframeFailed] = useState(false);

  useEffect(() => {
    setIframeFailed(false);
  }, [page.url]);

  useEffect(() => {
    const browser = browserRef.current;
    if (!browser) return;

    const updateScale = () => {
      const screen = browser.querySelector(`.${styles.browserScreen}`);
      const w =
        (screen as HTMLElement | null)?.clientWidth || browser.clientWidth;
      if (!w) return;
      setScale(w / PREVIEW_WIDTH);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(browser);
    return () => observer.disconnect();
  }, []);

  const showIframe = Boolean(page.url) && !iframeFailed;
  const previewHeight = PREVIEW_HEIGHT * scale;

  return (
    <div
      ref={browserRef}
      className={cn(styles.browser, isActive && styles.browserActive)}
      style={
        {
          "--works-accent-from": accent.from,
          "--works-accent-to": accent.to,
          "--works-accent-glow": accent.glow,
        } as CSSProperties
      }
    >
      <div className={styles.browserBar}>
        <span className={cn(styles.browserDot, styles.dotRed)} />
        <span className={cn(styles.browserDot, styles.dotYellow)} />
        <span className={cn(styles.browserDot, styles.dotGreen)} />
        <div className={styles.browserUrl}>
          {page.url
            ? getDisplayUrl(page.url)
            : `${page.name.toLowerCase().replace(/\s+/g, "")}.cl`}
        </div>
      </div>
      <div
        className={styles.browserScreen}
        style={{
          width: "100%",
          height: previewHeight > 0 ? previewHeight : "auto",
          aspectRatio: `${PREVIEW_WIDTH} / ${PREVIEW_HEIGHT}`,
        }}
      >
        {page.url && (
          <SitePreviewFallback
            page={page}
            accent={accent}
            isActive={isActive}
          />
        )}
        {showIframe ? (
          <div className={styles.iframeWrap} style={{ height: previewHeight }}>
            <iframe
              src={page.url}
              title={page.name}
              className={styles.iframe}
              loading="lazy"
              tabIndex={-1}
              style={{
                width: PREVIEW_WIDTH,
                height: PREVIEW_HEIGHT,
                transform: `scale(${scale})`,
              }}
              onError={() => setIframeFailed(true)}
            />
          </div>
        ) : !page.url ? (
          <div className={styles.placeholder}>
            <div className={styles.placeholderNav} />
            <div className={styles.placeholderHero}>
              <div
                className={cn(styles.placeholderLine, styles.placeholderLineLg)}
              />
              <div
                className={cn(styles.placeholderLine, styles.placeholderLineMd)}
              />
              <div className={styles.placeholderBtn} />
            </div>
            <div className={styles.placeholderGrid}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles.placeholderBlock} />
              ))}
            </div>
          </div>
        ) : null}
        <div className={styles.shine} />
      </div>
    </div>
  );
}

function PageCard({
  page,
  index,
  isFeatured,
}: {
  page: PortfolioProject;
  index: number;
  isFeatured: boolean;
}) {
  const t = useT();
  const locale = useLocale() as Locale;
  const [hovered, setHovered] = useState(false);
  const hasUrl = Boolean(page.url);
  const accent = CATEGORY_ACCENTS[page.category];
  const description =
    page.description[locale] ?? page.description.es ?? page.description.en;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        layout: { duration: 0.35 },
      }}
      className={cn(styles.card, isFeatured && styles.cardFeatured)}
      style={
        {
          "--works-accent-from": accent.from,
          "--works-accent-to": accent.to,
          "--works-accent-glow": accent.glow,
        } as CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <HoverGlow color={accent.glow} className="h-full rounded-[20px]">
        <div className={cn(styles.cardGlow, hovered && styles.cardGlowOn)} />
        <motion.div
          animate={{
            y: hovered ? -8 : 0,
            rotate: hovered ? (index % 2 === 0 ? -0.6 : 0.6) : 0,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
        >
          <BrowserPreview page={page} isActive={hovered} accent={accent} />
        </motion.div>

        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <span className={styles.cardCategory}>
              {t(`portfolio.filters.${page.category}`)}
            </span>
            {hasUrl && (
              <a
                href={page.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                {t("portfolio.viewSite")}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>

          <h3 className={styles.cardTitle}>{page.name}</h3>
          <div className={styles.cardDivider} />
          <p className={styles.cardDesc}>{description}</p>

          <div className={styles.tags}>
            {page.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className={styles.tag}
                whileHover={{ scale: 1.06, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                style={{ transitionDelay: `${tagIndex * 0.03}s` }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </HoverGlow>
    </motion.article>
  );
}

export function PortfolioWorks() {
  const t = useT();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const filterKeys: FilterKey[] = ["all", ...PROJECT_CATEGORIES];

  const filteredPages =
    activeFilter === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    setActiveIndex(0);
    gridRef.current?.scrollTo({ left: 0 });
  }, [activeFilter]);

  const handleScroll = () => {
    if (!gridRef.current) return;
    const container = gridRef.current;
    const children = container.children;
    if (!children.length) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    setActiveIndex(closest);
  };

  const scrollToCard = (index: number) => {
    if (!gridRef.current?.children[index]) return;
    const container = gridRef.current;
    const child = container.children[index] as HTMLElement;
    container.scrollTo({
      left: child.offsetLeft - (container.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const countLabel = t("portfolio.count").replace(
    "{count}",
    String(PORTFOLIO_PROJECTS.length),
  );

  return (
    <section id="portfolio-works" className={styles.works}>
      <div className={cn(styles.orb, styles.orbLeft)} />
      <div className={cn(styles.orb, styles.orbRight)} />
      <div className={cn(styles.orb, styles.orbCenter)} />
      <FloatingDecor />

      <div className={styles.container}>
        <header className={styles.header}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.badgeDot} />
            <span>{t("portfolio.badge")}</span>
            <span className={styles.badgeCount}>{countLabel}</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("portfolio.title")}{" "}
            <span className={styles.titleHighlight}>
              {t("portfolio.titleHighlight")}
            </span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {t("portfolio.subtitle")}
          </motion.p>
        </header>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {filterKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              className={cn(
                styles.filter,
                activeFilter === key && styles.filterActive,
              )}
            >
              {activeFilter === key && (
                <motion.span
                  layoutId="portfolio-works-filter-pill"
                  className={styles.filterBg}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={styles.filterLabel}>
                {t(`portfolio.filters.${key}`)}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div layout className={styles.gridWrap}>
          <AnimatePresence mode="popLayout">
            <div
              key={activeFilter}
              className={styles.grid}
              ref={gridRef}
              onScroll={handleScroll}
            >
              {filteredPages.map((page, index) => (
                <PageCard
                  key={page.id}
                  page={page}
                  index={index}
                  isFeatured={index === 0 && filteredPages.length > 2}
                />
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        <div className={styles.dots}>
          {filteredPages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToCard(index)}
              className={cn(
                styles.dot,
                activeIndex === index && styles.dotActive,
              )}
              aria-label={t("portfolio.goToProject").replace(
                "{n}",
                String(index + 1),
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
