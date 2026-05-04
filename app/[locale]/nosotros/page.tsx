import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import IconBox, { type IconKey } from "@/components/IconBox";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("mission") };
}

const valueIconKeys: Record<string, IconKey> = {
  precision: "crosshair",
  commitment: "target",
  quality: "shield",
  innovation: "lightbulb",
};

export default function AboutPage() {
  const t = useTranslations("about");
  const certifications = t.raw("certifications") as string[];

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.10)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{t("title")}</h1>
            <p className="text-blue-400 text-2xl sm:text-3xl font-bold mb-2">{t("title_highlight")}</p>
            <p className="text-[#8B9AA3] text-xl">{t("subtitle")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection variant="slide-left">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80"
                alt="CNC workshop Monterrey"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-[#060D1A]/90 backdrop-blur border border-white/15 rounded-xl px-4 py-3">
                <div className="text-blue-400 text-2xl font-bold">2003</div>
                <div className="text-[#8B9AA3] text-xs">Fundada en Monterrey</div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection variant="slide-right">
            <h2 className="text-3xl font-bold text-white mb-5">{t("story_title")}</h2>
            <p className="text-[#8B9AA3] leading-relaxed mb-4">{t("story_p1")}</p>
            <p className="text-[#8B9AA3] leading-relaxed">{t("story_p2")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-[#0D1B2E]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {(["mission", "vision"] as const).map((key, i) => (
            <AnimatedSection key={key} delay={i * 0.15}>
              <div className="bg-[#0D1B2E] border border-white/8 rounded-2xl p-8 h-full">
                <div className="w-11 h-11 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center mb-5">
                  <IconBox name={key === "mission" ? "target" : "eye"} size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  {t(`${key}_title` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-[#8B9AA3] leading-relaxed">
                  {t(key as Parameters<typeof t>[0])}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">{t("values_title")}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(["precision", "commitment", "quality", "innovation"] as const).map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.1}>
                <div className="bg-[#0D1B2E] border border-white/8 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-colors">
                  <div className="w-12 h-12 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconBox name={valueIconKeys[key]} size={22} className="text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {t(`values.${key}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-[#8B9AA3] text-sm leading-relaxed">
                    {t(`values.${key}.desc` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 bg-[#0D1B2E]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection variant="slide-left">
            <h2 className="text-3xl font-bold text-white mb-3">{t("certifications_title")}</h2>
            <p className="text-[#8B9AA3] mb-6 leading-relaxed">{t("team_subtitle")}</p>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-3 text-[#8B9AA3] text-sm">
                  <IconBox name="check-circle" size={16} className="text-blue-400 shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection variant="slide-right">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
                alt="CNC equipment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/30 to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        title={t("cta_title")}
        subtitle={t("cta_subtitle")}
        buttonText={t("cta_button")}
      />
    </>
  );
}
