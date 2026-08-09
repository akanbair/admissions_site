import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { languageLabels, type Lang } from "../i18n/translations";

const languages: Lang[] = ["ru", "kk", "en"];

function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className="px-2 py-1 text-xs transition-colors duration-150"
          style={{
            borderRadius: "6px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            color: lang === l ? "#1B4FD8" : "#94A3B8",
            background: lang === l ? "#EEF2FF" : "transparent",
          }}
        >
          {languageLabels[l]}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Alumia" className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={`/${link.href}`}
              className="text-sm text-slate-500 hover:text-[#0A1628] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="/#quiz"
            className="text-sm text-white bg-[#1B4FD8] py-2.5 text-center hover:bg-[#1540B8] transition-colors duration-200"
            style={{ borderRadius: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, width: "150px" }}
          >
            {t.nav.cta}
          </a>
        </div>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              <LanguageSwitcher className="mb-1" />
              {t.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-slate-600 hover:text-[#1B4FD8] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#quiz"
                onClick={() => setMenuOpen(false)}
                className="bg-[#1B4FD8] text-white text-sm px-5 py-3 text-center hover:bg-[#1540B8] transition-colors"
                style={{ borderRadius: "8px" }}
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
