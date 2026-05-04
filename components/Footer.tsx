import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");

  const navLinks = [
    { href: "/" as const, key: "home" },
    { href: "/servicios" as const, key: "services" },
    { href: "/nosotros" as const, key: "about" },
    { href: "/proyectos" as const, key: "projects" },
    { href: "/contacto" as const, key: "contact" },
  ];

  const services = [
    { slug: "torneado-cnc", label: "Torneado CNC" },
    { slug: "fresado-cnc", label: "Fresado CNC" },
    { slug: "prototipos", label: "Prototipos" },
    { slug: "produccion", label: "Producción en Serie" },
    { slug: "ingenieria-inversa", label: "Ing. Inversa" },
  ];

  return (
    <footer className="bg-[#050C18] border-t border-white/8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/cncmty-logo.png"
                alt="CNC Logo"
                width={150}
                height={100}
              />
            </Link>
            <p className="text-[#8B9AA3] text-sm leading-relaxed mb-4">
              {t("description")}
            </p>
            <p className="text-blue-400 text-xs font-medium tracking-wide uppercase">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t("nav_title")}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-[#8B9AA3] hover:text-white text-sm transition-colors"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t("services_title")}
            </h3>
            <ul className="space-y-2.5">
              {services.map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    href={{ pathname: "/servicios/[slug]", params: { slug } }}
                    className="text-[#8B9AA3] hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t("contact_title")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-[#8B9AA3]">
                <MapPin size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#8B9AA3]">
                <Phone size={14} className="text-blue-400 shrink-0" />
                <a
                  href="tel:+528112345678"
                  className="hover:text-white transition-colors"
                >
                  {contact("info.phone")}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#8B9AA3]">
                <Mail size={14} className="text-blue-400 shrink-0" />
                <a
                  href="mailto:ventas@cncmonterrey.mx"
                  className="hover:text-white transition-colors"
                >
                  {contact("info.email")}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#8B9AA3]">
                <Clock size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span>Lun–Vie: 8:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8B9AA3] text-xs">
            © {new Date().getFullYear()} CNC Monterrey. {t("rights")}
          </p>
          <p className="text-[#8B9AA3] text-xs">
            Monterrey, Nuevo León, México
          </p>
        </div>
      </div>
    </footer>
  );
}
