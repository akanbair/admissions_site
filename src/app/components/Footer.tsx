import { Link } from "react-router";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.041 0C5.44 0 .116 5.32.116 11.918c0 2.1.55 4.152 1.594 5.958L0 24l6.27-1.643a11.877 11.877 0 0 0 5.77 1.47h.005c6.6 0 11.922-5.32 11.922-11.918A11.845 11.845 0 0 0 12.041 0Zm0 21.79h-.004a9.876 9.876 0 0 1-5.031-1.377l-.361-.214-3.72.975.994-3.626-.235-.372a9.85 9.85 0 0 1-1.512-5.258C1.172 6.44 6.03 1.582 12.045 1.582c2.633 0 5.108 1.026 6.968 2.888a9.797 9.797 0 0 1 2.883 6.965c0 6.016-4.86 10.355-9.855 10.355Z" />
    </svg>
  );
}

const sectionHrefs = [
  ["/#testimonials", "/#why-us", "/#proven-results"],
  ["/#faq", "/#quiz", "/privacy-policy", "/terms-of-service"],
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/6591234567" },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Brand column */}
          <div>
            <Link to="/" className="inline-flex items-center mb-5">
              <img src="/logo-mark.svg" alt="Alumia" className="h-9 w-9" />
              <span
                className="ml-2 text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.35rem", letterSpacing: "-0.02em" }}
              >
                Alumia
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {t.footer.sections.map((section, sectionIndex) => (
              <div key={section.title}>
                <div
                  className="text-white mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem" }}
                >
                  {section.title}
                </div>
                <div className="flex flex-col gap-2.5">
                  {section.items.map((label, i) => {
                    const href = sectionHrefs[sectionIndex][i];
                    const className = "text-sm text-slate-400 hover:text-white transition-colors duration-200";
                    return href.includes("#") ? (
                      <a key={label} href={href} className={className}>{label}</a>
                    ) : (
                      <Link key={label} to={href} className={className}>{label}</Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Contact + socials */}
            <div>
              <div className="flex flex-col gap-3 mb-4">
                <a href="mailto:hello@alumia.io" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-blue-400 transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  hello@alumia.io
                </a>
                <a href="tel:+6591234567" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-blue-400 transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +65 9123 4567
                </a>
              </div>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#1B4FD8] transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-4">{t.footer.officesLabel}</div>
          <div className="flex flex-col sm:flex-row gap-6">
            {t.footer.offices.map((office) => (
              <div key={office.city} className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div
                    className="text-white text-xs mb-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                  >
                    {office.city}
                  </div>
                  <div className="text-slate-500 text-xs">{office.address}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{t.footer.privacyPolicy}</Link>
            <Link to="/terms-of-service" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{t.footer.termsOfService}</Link>
            <Link to="/cookie-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{t.footer.cookiePolicy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
