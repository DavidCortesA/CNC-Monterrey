"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");

  const [formState, setFormState] = useState({
    name: "", company: "", email: "", phone: "", service: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  }

  const infoItems = [
    { icon: MapPin, titleKey: "info.address_title" as const, valueKey: "info.address" as const },
    { icon: Phone, titleKey: "info.phone_title" as const, valueKey: "info.phone" as const },
    { icon: Mail, titleKey: "info.email_title" as const, valueKey: "info.email" as const },
    { icon: Clock, titleKey: "info.hours_title" as const, valueKey: "info.hours" as const },
  ];

  const serviceOptions = ["torneado", "fresado", "prototipos", "produccion", "ingenieria", "otro"] as const;

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.10)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t("title")}</h1>
            <p className="text-[#8B9AA3] text-xl max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <AnimatedSection variant="slide-left" className="lg:col-span-1">
            <div className="space-y-4">
              {infoItems.map(({ icon: Icon, titleKey, valueKey }) => (
                <div key={titleKey} className="bg-[#0D1B2E] border border-white/8 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-blue-600/15 border border-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[#8B9AA3] text-xs uppercase tracking-wider mb-1">{t(titleKey)}</p>
                      <p className="text-white text-sm leading-relaxed whitespace-pre-line">{t(valueKey)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-[#0D1B2E] border border-white/8 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-[#8B9AA3] p-4">
                  <MapPin size={28} className="text-blue-400 mx-auto mb-2" />
                  <p className="text-sm">Parque Industrial Monterrey</p>
                  <p className="text-xs text-[#8B9AA3]/70 mt-1">Monterrey, NL, México</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection variant="slide-right" className="lg:col-span-2">
            {status === "success" ? (
              <div className="bg-[#0D1B2E] border border-emerald-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">{t("success_title")}</h3>
                <p className="text-[#8B9AA3] leading-relaxed">{t("success_msg")}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0D1B2E] border border-white/8 rounded-2xl p-7 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8B9AA3] text-xs uppercase tracking-wider mb-1.5">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder={t("form.name_placeholder")}
                      required
                      className="w-full bg-[#112236] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#8B9AA3]/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8B9AA3] text-xs uppercase tracking-wider mb-1.5">
                      {t("form.company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder={t("form.company_placeholder")}
                      required
                      className="w-full bg-[#112236] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#8B9AA3]/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8B9AA3] text-xs uppercase tracking-wider mb-1.5">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder={t("form.email_placeholder")}
                      required
                      className="w-full bg-[#112236] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#8B9AA3]/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8B9AA3] text-xs uppercase tracking-wider mb-1.5">
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder={t("form.phone_placeholder")}
                      className="w-full bg-[#112236] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#8B9AA3]/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8B9AA3] text-xs uppercase tracking-wider mb-1.5">
                    {t("form.service")}
                  </label>
                  <select
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full bg-[#112236] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors appearance-none"
                  >
                    <option value="" className="text-[#8B9AA3]">{t("form.service_placeholder")}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0D1B2E]">
                        {t(`form.services_options.${opt}` as Parameters<typeof t>[0])}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#8B9AA3] text-xs uppercase tracking-wider mb-1.5">
                    {t("form.message")}
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t("form.message_placeholder")}
                    required
                    rows={5}
                    className="w-full bg-[#112236] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#8B9AA3]/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-[#8B9AA3] text-xs">{t("required")}</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 text-sm"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        {t("form.sending")}
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        {t("form.submit")}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
