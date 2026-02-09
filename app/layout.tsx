import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "Senior Frontend Engineer and Creative Developer crafting modern, accessible, and high-performance web applications.",
  keywords: ["Frontend Engineer", "Creative Developer", "React", "Next.js", "TypeScript", "Tailwind CSS", "Portfolio"],
  openGraph: {
    title: "Alfredo Hurtado | Creative Developer",
    description: "Senior Frontend Engineer and Creative Developer crafting modern, accessible, and high-performance web applications.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
