"use client";

import { Button } from "@/components/ui/Button";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/context/LanguageContext";
import { Reveal } from "@/components/animation";
import { MagneticButton } from "@/skills/animation-system/primitives";
import { SpotlightEffect } from "@/skills/animation-system/effects";

export function Contact() {
  const t = useT();
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-secondary/20 pointer-events-none" />

      <div className="container mx-auto px-6">
        <Reveal inView className="mb-16 text-center max-w-2xl mx-auto">
          <span
            className="retro-badge inline-block text-primary font-mono text-sm tracking-wider uppercase mb-4 px-3 py-1"
            data-retro-badge
          >
            05. {t("contact.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("contact.description")}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">{t("contact.title2")}</h3>
            <p className="text-muted-foreground">{t("contact.description2")}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:soyalfredo.dev@gmail.com">
                  soyalfredo.dev@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>{t("contact.address")}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="lobby-card space-y-6 bg-card/80 p-5 sm:p-8 rounded-2xl border border-border/40 mb-16 md:mb-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t("contact.form.name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  inputMode="text"
                  required
                  className="w-full bg-background/50 border border-border rounded-[var(--radius)] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("contact.form.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="next"
                  required
                  className="w-full bg-background/50 border border-border rounded-[var(--radius)] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                enterKeyHint="send"
                className="w-full bg-background/50 border border-border rounded-[var(--radius)] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                placeholder={t("contact.form.messagePlaceholder")}
              />
            </div>

            <SpotlightEffect>
              <MagneticButton className="w-full">
                <Button
                  type="submit"
                  className={cn(
                    "w-full transition-all",
                    formState === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : "",
                  )}
                  disabled={
                    formState === "submitting" || formState === "success"
                  }
                >
                  {formState === "submitting" ? (
                    t("contact.form.sending")
                  ) : formState === "success" ? (
                    t("contact.form.success")
                  ) : (
                    <>
                      {t("contact.form.submit")}{" "}
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </MagneticButton>
            </SpotlightEffect>
          </form>
        </div>
      </div>
    </section>
  );
}
