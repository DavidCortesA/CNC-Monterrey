"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

const navLinks = [
  { href: "/" as const, key: "home" },
  { href: "/servicios" as const, key: "services" },
  { href: "/nosotros" as const, key: "about" },
  { href: "/proyectos" as const, key: "projects" },
  { href: "/contacto" as const, key: "contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060D1A]/95 backdrop-blur-md border-b border-white/8 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/cncmty-logo.png"
              alt="CNC Logo"
              width={150}
              height={100}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, key }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={key}
                  href={href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/8 border border-white/10"
                      : "text-[#8B9AA3] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contacto"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25"
            >
              {t("quote")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#8B9AA3] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0D1B2E]/98 backdrop-blur-md border-t border-white/8">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, key }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={key}
                  href={href}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white bg-blue-600/20 border border-blue-500/30"
                      : "text-[#8B9AA3] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
              <LanguageSwitcher />
              <Link
                href="/contacto"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {t("quote")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
