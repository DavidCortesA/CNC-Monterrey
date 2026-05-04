import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const isEs = locale === "es";
  const baseUrl = "https://cncmonterrey.mx";
  const canonical = `${baseUrl}/${locale}`;

  return {
    title: {
      default: isEs
        ? "CNC Monterrey | Maquinado de Alta Precisión"
        : "CNC Monterrey | High-Precision CNC Machining",
      template: isEs
        ? "%s | CNC Monterrey"
        : "%s | CNC Monterrey",
    },
    description: isEs
      ? "Empresa de maquinado CNC de alta precisión en Monterrey, NL. Torneado, fresado, prototipos y producción en serie. +20 años de experiencia industrial."
      : "High-precision CNC machining company in Monterrey, Mexico. Turning, milling, prototypes and serial production. 20+ years of industrial experience.",
    keywords: isEs
      ? ["CNC Monterrey", "maquinado CNC", "torneado CNC", "fresado CNC", "manufactura precisión", "maquinado Nuevo León"]
      : ["CNC machining Monterrey", "precision machining Mexico", "CNC turning", "CNC milling", "manufacturing Mexico"],
    authors: [{ name: "CNC Monterrey" }],
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/es`,
      },
    },
    openGraph: {
      type: "website",
      locale: isEs ? "es_MX" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_MX",
      url: canonical,
      siteName: "CNC Monterrey",
      title: isEs
        ? "CNC Monterrey | Maquinado de Alta Precisión"
        : "CNC Monterrey | High-Precision CNC Machining",
      description: isEs
        ? "Maquinado CNC de alta precisión en Monterrey, NL. +20 años de experiencia."
        : "High-precision CNC machining in Monterrey, Mexico. 20+ years of experience.",
    },
  };
  void t;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col bg-[#060D1A] text-[#E8EDF2]">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
