"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useT } from "@/context/LanguageContext";

export function About() {
  const t = useT();
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
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
                {/* Replace with /public/about.jpg */}
                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-muted-foreground">
                  <div className="text-center">
                    <p className="text-sm">About Image Placeholder</p>
                    <p className="text-xs text-muted-foreground/50 opacity-60">
                      1080x1350px recommended
                    </p>
                  </div>
                </div>
                {/* <Image src="/about.jpg" alt="Alfredo Hurtado" fill className="object-cover" /> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
