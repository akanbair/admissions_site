import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1758270704763-22072a90d3b6?w=720&h=560&fit=crop&auto=format";

export function Hero() {
  const { t, lang } = useLanguage();
  const titleSize = lang === "en" ? "clamp(2.6rem, 5.5vw, 4.2rem)" : "clamp(2.1rem, 4.4vw, 3.4rem)";
  return (
    <section
      id="home"
      className="pt-16 flex flex-col"
      style={{ background: "#F8FAFF" }}
    >
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 items-center py-16">
        {/* Left: text only */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className="text-[#1B4FD8] mb-6 tracking-widest uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em" }}
          >
            {t.hero.eyebrow}
          </p>

          <h1
            className="text-[#0A1628] mb-6 leading-[1.08]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: titleSize,
              letterSpacing: "-0.02em",
            }}
          >
            {t.hero.title}
          </h1>

          <p className="text-slate-500 mb-10 max-w-md" style={{ fontSize: "1.1rem", lineHeight: 1.65 }}>
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#quiz"
              className="inline-flex items-center justify-center gap-2 bg-[#1B4FD8] text-white px-7 py-3.5 group transition-all duration-200"
              style={{
                borderRadius: "10px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1540B8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1B4FD8"; }}
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#testimonials"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 text-[#0A1628] px-7 py-3.5 hover:border-slate-400 transition-all duration-200"
              style={{
                borderRadius: "10px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                background: "white",
              }}
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </motion.div>

        {/* Right: photo collage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden lg:grid grid-cols-2 gap-4"
          style={{ height: "520px" }}
        >
          <div
            className="row-span-2 overflow-hidden bg-slate-100 relative"
            style={{ borderRadius: "16px" }}
          >
            <img
              src={PLACEHOLDER_IMG}
              alt="Student celebrating admission"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur px-4 py-3"
              style={{ borderRadius: "12px" }}
            >
              <div
                className="text-[#0A1628]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}
              >
                {t.hero.badgeName}
              </div>
              <div className="text-[#1B4FD8]" style={{ fontSize: "0.8rem" }}>
                {t.hero.badgeUniversity}
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-slate-100" style={{ borderRadius: "16px" }}>
            <img
              src={PLACEHOLDER_IMG}
              alt="Students on campus"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="overflow-hidden bg-slate-100 relative" style={{ borderRadius: "16px" }}>
            <img
              src={PLACEHOLDER_IMG}
              alt="Student celebrating offer"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
              style={{ background: "linear-gradient(180deg, rgba(27,79,216,0.15) 0%, rgba(10,22,40,0.85) 100%)" }}
            >
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2.2rem" }}>
                {t.hero.statOfferNumber}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem" }}>
                {t.hero.statOfferLabel}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
