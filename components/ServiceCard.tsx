"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Cog, Wrench, FlaskConical, Factory, ScanLine } from "lucide-react";

const iconMap = {
  cog: Cog,
  wrench: Wrench,
  flask: FlaskConical,
  factory: Factory,
  scan: ScanLine,
} as const;

export type ServiceIconKey = keyof typeof iconMap;

interface Props {
  iconKey: ServiceIconKey;
  title: string;
  description: string;
  slug: string;
  features?: string[];
  index?: number;
}

export default function ServiceCard({ iconKey, title, description, slug, features, index = 0 }: Props) {
  const Icon = iconMap[iconKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link
        href={{ pathname: "/servicios/[slug]", params: { slug } }}
        className="group block h-full bg-[#0D1B2E] border border-white/8 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-[#112236] transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20"
      >
        <div className="w-12 h-12 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600/25 transition-colors">
          <Icon size={22} className="text-blue-400" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-[#8B9AA3] text-sm leading-relaxed mb-4">{description}</p>

        {features && features.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[#8B9AA3]">
                <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:gap-2.5 transition-all">
          <span>Ver más</span>
          <ArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  );
}
