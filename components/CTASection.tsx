import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function CTASection({ title, subtitle, buttonText }: Props) {
  const t = useTranslations("cta");

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060D1A] via-[#0A1628] to-[#060D1A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.12)_0%,_transparent_70%)]" />
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-6">
          <Phone size={12} />
          <span>Respuesta en menos de 24h</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          {title ?? t("title")}
        </h2>
        <p className="text-[#8B9AA3] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          {subtitle ?? t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30 text-sm"
          >
            {buttonText ?? t("button")}
            <ArrowRight size={16} />
          </Link>
          <a
            href="tel:+528112345678"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white hover:bg-white/5 font-medium rounded-xl transition-all duration-200 text-sm"
          >
            <Phone size={16} />
            +52 81 1234-5678
          </a>
        </div>
      </div>
    </section>
  );
}
