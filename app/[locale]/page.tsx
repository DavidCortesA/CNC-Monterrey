import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import ServiceCard, { type ServiceIconKey } from "@/components/ServiceCard";
import IconBox, { type IconKey } from "@/components/IconBox";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: locale === "es"
      ? "CNC Monterrey | Maquinado de Alta Precisión"
      : "CNC Monterrey | High-Precision CNC Machining",
    description: t("hero.subtitle"),
  };
}

const serviceIconKeys: ServiceIconKey[] = ["cog", "wrench", "flask", "factory", "scan"];
const serviceSlugs = ["torneado-cnc", "fresado-cnc", "prototipos", "produccion", "ingenieria-inversa"];

const benefitIconKeys: IconKey[] = ["award", "zap", "shield-check", "layers"];
const benefitKeys = ["precision", "speed", "quality", "materials"] as const;

export default function HomePage() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1666634157070-6fd830fb5672?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="CNC Machining"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060D1A]/80 via-[#060D1A]/60 to-[#060D1A]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(37,99,235,0.15)_0%,_transparent_60%)]" />
        </div>

        <div
          className="inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            <AnimatedSection delay={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/25 rounded-full text-blue-400 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                {t("hero.badge")}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
                {t("hero.title")}
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-400 leading-tight mb-6">
                {t("hero.title_highlight")}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-[#8B9AA3] text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                {t("hero.subtitle")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 text-sm"
                >
                  {t("hero.cta_primary")}
                  <IconBox name="arrow-right" size={16} />
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/15 text-white hover:bg-white/5 font-medium rounded-xl transition-all duration-200 text-sm"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-y border-white/8 bg-[#0D1B2E]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {(["experience", "parts", "tolerance", "delivery"] as const).map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.1} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">
                  {t(`stats.${key}_value` as Parameters<typeof t>[0])}
                </div>
                <div className="text-[#8B9AA3] text-sm">
                  {t(`stats.${key}_label` as Parameters<typeof t>[0])}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t("services_title")}</h2>
            <p className="text-[#8B9AA3] text-lg max-w-xl mx-auto">{t("services_subtitle")}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceSlugs.map((slug, i) => (
              <ServiceCard
                key={slug}
                iconKey={serviceIconKeys[i]}
                title={tServices(`list.${slug}.title` as Parameters<typeof tServices>[0])}
                description={tServices(`list.${slug}.short_desc` as Parameters<typeof tServices>[0])}
                slug={slug}
                features={(tServices.raw(`list.${slug}.features`) as string[]).slice(0, 3)}
                index={i}
              />
            ))}
          </div>

          <AnimatedSection delay={0.3} className="text-center mt-10">
            <Link href="/servicios" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              {t("view_all_services")}
              <IconBox name="arrow-right" size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-4 bg-[#0D1B2E]/40">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t("benefits_title")}</h2>
            <p className="text-[#8B9AA3] text-lg">{t("benefits_subtitle")}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitKeys.map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.1}>
                <div className="bg-[#0D1B2E] border border-white/8 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-colors">
                  <div className="w-12 h-12 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconBox name={benefitIconKeys[i]} size={22} className="text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {t(`benefits.${key}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-[#8B9AA3] text-sm leading-relaxed">
                    {t(`benefits.${key}.desc` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection variant="slide-left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80"
                  alt="CNC precision machining"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/40 to-transparent" />
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slide-right">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium">
                  Monterrey, NL · México
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Manufactura industrial con estándares de clase mundial
                </h2>
                <p className="text-[#8B9AA3] leading-relaxed">
                  Nuestros procesos de manufactura están alineados con los requisitos de las industrias más demandantes. Equipos de medición certificados, ingenieros capacitados y un compromiso total con la calidad hacen la diferencia.
                </p>
                <ul className="space-y-3">
                  {["Equipos de última generación", "Inspección dimensional CMM", "Tiempos de entrega garantizados", "Soporte técnico en todo el proceso"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#8B9AA3]">
                      <IconBox name="check-circle" size={16} className="text-blue-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/nosotros" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors mt-2">
                  Conoce nuestra historia
                  <IconBox name="arrow-right" size={16} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
