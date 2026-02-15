import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { getDictionary, type Locale, locales } from "@/lib/translation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfredo Hurtado | Creative Developer & Frontend Engineer",
  description:
    "Senior Frontend Engineer and Creative Developer crafting modern, accessible, and high-performance web applications.",
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
  const dictionary = await getDictionary(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider locale={locale} dictionary={dictionary}>
            {children}
            <LanguageSwitcher />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
