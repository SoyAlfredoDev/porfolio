"use client";
import Link from "next/link";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { useT } from "@/context/LanguageContext";

export function Footer() {
  const t = useT();
  return (
    <footer className="py-8 border-t border-white/10 bg-background text-center relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-center space-x-6 mb-8 text-muted-foreground">
          <Link
            href="https://github.com/soyalfredodev"
            target="_blank"
            className="hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://instagram.com/soyalfredo.dev"
            target="_blank"
            className="hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
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
              className="w-5 h-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          {t("footer.title")}{" "}
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />{" "}
          <span className="text-foreground font-medium">Alfredo Hurtado</span>
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
