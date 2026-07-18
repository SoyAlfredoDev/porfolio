import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
  Press_Start_2P,
} from "next/font/google";
import "@/app/globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { VisualStyleProvider } from "@/context/VisualStyleContext";
import { MotionProvider } from "@/context/MotionProvider";
import { getDictionary, type Locale, locales } from "@/lib/translation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { VisualStyleSync } from "@/components/animation/VisualStyleSync";
import { SmoothScrollProvider } from "@/skills/animation-system/providers";
import { ChristmasLayer } from "@/skills/animation-system/components/ChristmasLayer";
import { RetroLayer } from "@/components/retro";
import { ModernLayer } from "@/components/modern";
import { RegisterSW } from "@/components/pwa/RegisterSW";
import { ThemeColorMeta } from "@/components/pwa/ThemeColorMeta";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-christmas",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#01c676" },
    { media: "(prefers-color-scheme: dark)", color: "#021f41" },
  ],
};

export const metadata: Metadata = {
  title: "Alfredo Hurtado | Creative Developer & Frontend Engineer",
  description:
    "Senior Frontend Engineer and Creative Developer crafting modern, accessible, and high-performance web applications.",
  applicationName: "Alfredo",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Alfredo",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  keywords: [
    "Frontend Engineer",
    "Creative Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
  ],
  openGraph: {
    title: "Alfredo Hurtado | Creative Developer",
    description:
      "Senior Frontend Engineer and Creative Developer crafting modern, accessible, and high-performance web applications.",
    type: "website",
    locale: "en_US",
    url: "https://portfolio.alfredohurtado.com",
    siteName: "Alfredo Hurtado Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfredo Hurtado | Creative Developer",
    description: "Senior Frontend Engineer & Creative Developer.",
    creator: "@alfredohurtado",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning data-style="modern">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} ${cormorant.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider locale={locale} dictionary={dictionary}>
            <VisualStyleProvider defaultStyle="modern">
              <MotionProvider>
                <SmoothScrollProvider>
                  <VisualStyleSync />
                  <ThemeColorMeta />
                  <RegisterSW />
                  <ModernLayer />
                  {children}
                  <ChristmasLayer />
                  <RetroLayer />
                  <LanguageSwitcher />
                </SmoothScrollProvider>
              </MotionProvider>
            </VisualStyleProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
