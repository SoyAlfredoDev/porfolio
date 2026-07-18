"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLocale, useT } from "@/context/LanguageContext";
import { getLocalizedPath, type RouteKey } from "@/lib/routes";
import { StyleSwitcher } from "@/skills/animation-system/components/StyleSwitcher";
import { MagneticButton } from "@/skills/animation-system/primitives";
import { useVisualStyle } from "@/context/VisualStyleContext";

const navKeys: RouteKey[] = ["home", "portfolio", "play", "contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const locale = useLocale();
  const t = useT();
  const { style } = useVisualStyle();
  const isRetro = style === "retro";

  const navLinks = navKeys.map((key) => ({
    key,
    name: t(`nav.${key}`),
    href: getLocalizedPath(locale, key),
  }));

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: isRetro ? -40 : -100 }}
      animate={{ y: 0 }}
      transition={
        isRetro
          ? { type: "spring", stiffness: 500, damping: 28 }
          : { duration: 0.45 }
      }
      className={cn(
        "site-nav fixed top-0 left-0 right-0 z-[80] transition-all duration-300",
        scrolled || isOpen
          ? "glass border-b border-border/40 py-3 md:py-4"
          : "py-4 md:py-6 bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4">
        <Link
          href={getLocalizedPath(locale, "home")}
          className="site-brand text-lg md:text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity min-h-11 inline-flex items-center shrink-0"
          data-retro-label
          onClick={() => setIsOpen(false)}
        >
          <span className="md:hidden">
            Alfredo<span className="text-primary">.</span>
          </span>
          <span className="hidden md:inline">
            Soy Alfredo<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) =>
            link.key === "contact" ? (
              <MagneticButton key={link.key} strength={isRetro ? 0.12 : 0.22}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group min-h-11 inline-flex items-center"
                  data-retro-label
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                </Link>
              </MagneticButton>
            ) : (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group min-h-11 inline-flex items-center"
                data-retro-label
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
            ),
          )}
          <StyleSwitcher />
          <ThemeToggle />
        </div>

        <div className="relative z-[80] flex items-center gap-1 sm:gap-1.5 md:hidden pointer-events-auto shrink-0">
          <StyleSwitcher className="shrink-0" />
          <ThemeToggle />
          <button
            type="button"
            className="ui-btn ui-btn-ghost text-foreground min-h-11 min-w-11 inline-flex items-center justify-center p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-1 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="mobile-nav-link text-lg font-medium text-muted-foreground hover:text-primary active:text-primary transition-colors"
                  data-retro-label
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
