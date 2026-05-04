import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import IconBox, { type IconKey } from "@/components/IconBox";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

const validSlugs = ["torneado-cnc", "fresado-cnc", "prototipos", "produccion", "ingenieria-inversa"];

const slugImages: Record<string, string> = {
  "torneado-cnc": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80",
  "fresado-cnc": "https://images.unsplash.com/photo-1565688527949-5a70e63d6609?w=1200&q=80",
  "prototipos": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  "produccion": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  "ingenieria-inversa": "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1200&q=80",
};

const slugIconKeys: Record<string, IconKey> = {
  "torneado-cnc": "cog",
  "fresado-cnc": "wrench",
  "prototipos": "flask",
  "produccion": "factory",
  "ingenieria-inversa": "scan",
};

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug)) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t(`list.${slug}.title` as Parameters<typeof t>[0]),
    description: t(`list.${slug}.short_desc` as Parameters<typeof t>[0]),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!validSlugs.includes(slug)) notFound();
  return <ServiceDetailContent slug={slug} />;
}

function ServiceDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("services");
  const iconKey = slugIconKeys[slug] ?? "cog";
  const image = slugImages[slug];
  const features = t.raw(`list.${slug}.features`) as string[];
  const otherServices = validSlugs.filter((s) => s !== slug);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(37,99,235,0.12)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto">
          <AnimatedSection>
            <Link href="/servicios" className="inline-flex items-center gap-1.5 text-[#8B9AA3] hover:text-blue-400 text-sm transition-colors mb-8">
              {t("back")}
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection variant="slide-left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <IconBox name={iconKey} size={22} className="text-blue-400" />
                </div>
                <div className="inline-flex items-center px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium">
                  CNC Monterrey
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                {t(`list.${slug}.title` as Parameters<typeof t>[0])}
              </h1>
              <p className="text-[#8B9AA3] text-xl leading-relaxed mb-8">
                {t(`list.${slug}.desc` as Parameters<typeof t>[0])}
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30 text-sm"
              >
                {t("request_quote")}
                <IconBox name="arrow-right" size={16} />
              </Link>
            </AnimatedSection>

            <AnimatedSection variant="slide-right">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src={image}
                  alt={t(`list.${slug}.title` as Parameters<typeof t>[0])}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/30 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-[#0D1B2E]/40">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t("features_title")}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <AnimatedSection key={feature} delay={i * 0.08}>
                <div className="flex items-start gap-3 bg-[#0D1B2E] border border-white/8 rounded-xl p-4">
                  <IconBox name="check-circle" size={18} className="text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-[#8B9AA3] text-sm">{feature}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl font-bold text-white">Otros servicios</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.slice(0, 4).map((s, i) => (
              <AnimatedSection key={s} delay={i * 0.08}>
                <Link
                  href={{ pathname: "/servicios/[slug]", params: { slug: s } }}
                  className="flex items-center gap-3 bg-[#0D1B2E] border border-white/8 rounded-xl p-4 hover:border-blue-500/30 hover:bg-[#112236] transition-all group"
                >
                  <IconBox name={slugIconKeys[s] ?? "cog"} size={18} className="text-blue-400 shrink-0" />
                  <span className="text-[#8B9AA3] group-hover:text-white text-sm transition-colors">
                    {t(`list.${s}.title` as Parameters<typeof t>[0])}
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
