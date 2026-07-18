"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useLocale, useT } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/lib/routes";
import { Reveal } from "@/components/animation";
import { useMotion } from "@/context/MotionProvider";
import { MagneticButton, MouseParallax } from "@/skills/animation-system/primitives";
import { SpotlightEffect } from "@/skills/animation-system/effects";

const HeroAtmosphere = dynamic(
  () =>
    import("@/skills/animation-system/three/HeroAtmosphere").then(
      (m) => m.HeroAtmosphere,
    ),
  { ssr: false, loading: () => null },
);

export function Hero() {
  const t = useT();
  const locale = useLocale();
  const { canHeavyFx, can3D, motionLevel } = useMotion();
  const showAtmosphere = motionLevel !== "none";

  return (
    <section className="min-h-[100dvh] flex items-center justify-center pt-24 pb-28 md:pb-16 md:pt-20 relative overflow-hidden">
      {/* LCP-first: static fallback orbs paint immediately */}
      {!canHeavyFx && (
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-[100px]" />
        </div>
      )}

      {/* Heavy FX after hydration — never block text paint */}
      {showAtmosphere && (
        <div className="absolute inset-0 -z-10">
          <HeroAtmosphere />
        </div>
      )}

      <div className="container mx-auto px-6 text-center z-10">
        <Reveal delay={0} className="mb-8 relative w-32 h-32 mx-auto">
          <MouseParallax factor={can3D ? 8 : 4}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-lg opacity-50" />
          </MouseParallax>
          <div className="relative w-full h-full rounded-[var(--radius)] md:rounded-full border-2 border-border overflow-hidden bg-secondary shadow-[var(--retro-shadow,0_0_0_transparent)]">
            <Image
              src="/me/alfredoHurtado.png"
              alt="Alfredo Hurtado"
              fill
              priority
              sizes="128px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <span
            className="retro-badge inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6"
            data-retro-badge
          >
            {t("hero.badge")}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            {t("hero.title")} <span className="text-foreground">Alfredo</span>.
            <br />
            {t("hero.subtitle")}{" "}
            <span className="text-primary">{t("hero.subtitle2")}</span>{" "}
            {t("hero.subtitle3")}
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t("hero.description")}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <SpotlightEffect className="inline-flex">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link href={getLocalizedPath(locale, "portfolio")}>
                  <Button size="lg" className="group">
                    {t("hero.cta.projects")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href={getLocalizedPath(locale, "play")}>
                  <Button variant="outline" size="lg">
                    {t("hero.cta.play")}
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href={getLocalizedPath(locale, "contact")}>
                  <Button variant="outline" size="lg">
                    {t("hero.cta.contact")}
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </SpotlightEffect>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16 flex items-center justify-center gap-6 text-muted-foreground">
            <Link
              href="https://github.com/soyalfredodev"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com/soyalfredo.dev"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link
              href="mailto:soyalfredo.dev@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-xl">@</span>
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
