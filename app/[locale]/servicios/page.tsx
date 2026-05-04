import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard, { type ServiceIconKey } from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const services: { slug: string; iconKey: ServiceIconKey }[] = [
  { slug: "torneado-cnc", iconKey: "cog" },
  { slug: "fresado-cnc", iconKey: "wrench" },
  { slug: "prototipos", iconKey: "flask" },
  { slug: "produccion", iconKey: "factory" },
  { slug: "ingenieria-inversa", iconKey: "scan" },
];

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.10)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-5">
              Manufactura de Precisión CNC
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-[#8B9AA3] text-xl max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ slug, iconKey }, i) => (
              <ServiceCard
                key={slug}
                iconKey={iconKey}
                title={t(`list.${slug}.title` as Parameters<typeof t>[0])}
                description={t(`list.${slug}.desc` as Parameters<typeof t>[0])}
                slug={slug}
                features={t.raw(`list.${slug}.features`) as string[]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
