"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === "es" ? "en" : "es";
  const label = locale === "es" ? "EN" : "ES";

  function handleSwitch() {
    startTransition(() => {
      // @ts-expect-error – params type varies by route; next-intl handles it at runtime
      router.replace({ pathname, params }, { locale: otherLocale });
    });
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className="flex items-center gap-1.5 text-sm font-medium text-[#8B9AA3] hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/25 hover:bg-white/5 disabled:opacity-50"
      aria-label={`Switch to ${label}`}
    >
      <Globe size={14} />
      <span>{label}</span>
    </button>
  );
}
