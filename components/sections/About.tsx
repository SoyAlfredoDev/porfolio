"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useT } from "@/context/LanguageContext";
import { Reveal } from "@/components/animation";

export function About() {
  const t = useT();
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal inView className="max-w-4xl mx-auto">
          <span
            className="retro-badge inline-block text-primary font-mono text-sm tracking-wider uppercase mb-4 px-3 py-1"
            data-retro-badge
          >
            {t("about.badge")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            {t("about.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{t("about.description")}</p>
              <p>{t("about.description2")}</p>

              <Link
                href="/resume.pdf"
                target="_blank"
                className="inline-block mt-4"
              >
                <Button
                  variant="ghost"
                  className="pl-0 hover:pl-2 transition-all group"
                >
                  {t("about.cta.resume")}{" "}
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-2xl transform rotate-3 group-hover:rotate-1 transition-transform duration-300 opacity-20" />
              <div className="relative bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl h-full min-h-[300px] overflow-hidden">
                <Image
                  src="/me/alfredoHurtado.png"
                  alt="Alfredo Hurtado"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
