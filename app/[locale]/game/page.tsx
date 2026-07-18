import { redirect } from "next/navigation";
import { getLocalizedPath } from "@/lib/routes";
import { type Locale, locales } from "@/lib/translation";

export default async function GameRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locales.includes(locale as Locale) ? locale : "es") as Locale;
  redirect(getLocalizedPath(loc, "play"));
}
