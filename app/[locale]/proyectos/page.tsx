"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { Layers, Gauge, Package } from "lucide-react";

const projectImages = [
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=75",
  "https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=75",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=75",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=75",
  "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=75",
];

const categoryColors: Record<string, string> = {
  automotive: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  aerospace: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  industrial: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  medical: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const items = t.raw("items") as Array<{
    id: string; title: string; category: string;
    material: string; tolerance: string; quantity: string; desc: string;
  }>;

  const categories = ["all", "automotive", "aerospace", "industrial", "medical"] as const;
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? items
    : items.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.10)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t("title")}</h1>
            <p className="text-[#8B9AA3] text-xl max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "border-white/12 text-[#8B9AA3] hover:text-white hover:border-white/25 hover:bg-white/5"
              }`}
            >
              {t(`categories.${cat}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => {
                const colorClass = categoryColors[project.category] ?? "bg-blue-500/15 text-blue-400 border-blue-500/25";
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-[#0D1B2E] border border-white/8 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={projectImages[i % projectImages.length]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-[#0D1B2E]/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
                          {t(`categories.${project.category}` as Parameters<typeof t>[0])}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-white font-semibold mb-2 leading-snug">{project.title}</h3>
                      <p className="text-[#8B9AA3] text-sm leading-relaxed mb-4">{project.desc}</p>
                      <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/8">
                        <div>
                          <div className="flex justify-center mb-1">
                            <Layers size={13} className="text-blue-400" />
                          </div>
                          <p className="text-[10px] text-[#8B9AA3] uppercase tracking-wide mb-0.5">{t("material")}</p>
                          <p className="text-white text-xs font-medium">{project.material}</p>
                        </div>
                        <div>
                          <div className="flex justify-center mb-1">
                            <Gauge size={13} className="text-blue-400" />
                          </div>
                          <p className="text-[10px] text-[#8B9AA3] uppercase tracking-wide mb-0.5">{t("tolerance")}</p>
                          <p className="text-white text-xs font-medium">{project.tolerance}</p>
                        </div>
                        <div>
                          <div className="flex justify-center mb-1">
                            <Package size={13} className="text-blue-400" />
                          </div>
                          <p className="text-[10px] text-[#8B9AA3] uppercase tracking-wide mb-0.5">{t("quantity")}</p>
                          <p className="text-white text-xs font-medium">{project.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
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
