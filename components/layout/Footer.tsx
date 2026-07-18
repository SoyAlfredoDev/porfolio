"use client";

import Link from "next/link";
import { Github, Linkedin, Heart } from "lucide-react";
import { useLocale, useT } from "@/context/LanguageContext";
import { getLocalizedPath, type RouteKey } from "@/lib/routes";

const footerKeys: RouteKey[] = ["home", "portfolio", "play", "contact"];

/**
 * Final page section — opaque shell above style atmospheres.
 * Bridge + solid panel keep snow/clouds/pipes from mixing into footer UI.
 */
export function Footer() {
  const t = useT();
  const locale = useLocale();

  return (
    <div className="site-footer-shell" data-footer-shell>
      <div className="site-footer-bridge" aria-hidden>
        <div className="site-footer-snowbank">
          <span className="site-footer-snowbank-mound site-footer-snowbank-mound-a" />
          <span className="site-footer-snowbank-mound site-footer-snowbank-mound-b" />
          <span className="site-footer-snowbank-mound site-footer-snowbank-mound-c" />
          <span className="site-footer-snowbank-mound site-footer-snowbank-mound-d" />
          <span className="site-footer-snowbank-sparkle" />
        </div>
      </div>
      <footer className="site-footer">
        <div className="container mx-auto px-6 max-w-3xl">
          <nav
            className="site-footer-nav flex flex-wrap justify-center gap-x-1 gap-y-1 mb-8"
            aria-label="Footer"
          >
            {footerKeys.map((key) => (
              <Link
                key={key}
                href={getLocalizedPath(locale, key)}
                className="site-footer-link min-h-11 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors"
              >
                {t(`footer.links.${key}`)}
              </Link>
            ))}
          </nav>

          <div className="site-footer-socials flex justify-center gap-2 mb-8">
            <Link
              href="https://github.com/soyalfredodev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="site-footer-social min-h-11 min-w-11 inline-flex items-center justify-center rounded-full transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com/soyalfredo.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="site-footer-social min-h-11 min-w-11 inline-flex items-center justify-center rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="site-footer-social min-h-11 min-w-11 inline-flex items-center justify-center rounded-full transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>

          <p className="site-footer-credit text-sm flex flex-wrap items-center justify-center gap-1.5">
            <span>{t("footer.title")}</span>
            <Heart className="w-4 h-4 text-primary shrink-0" aria-hidden />
            <span>{t("footer.by")}</span>
            <span className="site-footer-name font-medium">Alfredo Hurtado</span>
          </p>
          <p className="site-footer-copy text-xs mt-3 opacity-70">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}
