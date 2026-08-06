import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export function MobileStickyCTA() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 transition-[opacity,transform] duration-200 ease-out"
      style={{
        boxShadow: "0 -8px 24px rgba(10,22,40,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <p
          className="flex-1 text-[#0A1628] text-xs leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
        >
          {t.mobileBar.text}
        </p>
        <a
          href="/#quiz"
          tabIndex={visible ? 0 : -1}
          className="shrink-0 text-sm text-white bg-[#1B4FD8] hover:bg-[#1540B8] px-4 py-2.5 text-center transition-colors duration-200"
          style={{ borderRadius: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
        >
          {t.mobileBar.cta}
        </a>
      </div>
    </div>
  );
}
