import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-4 uppercase tracking-widest"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                color: "#60A5FA",
              }}
            >
              {t.finalCTA.eyebrow}
            </p>
            <h2
              className="text-white mb-5 leading-tight"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {t.finalCTA.title}
            </h2>
            <p className="leading-relaxed mb-8 max-w-md" style={{ color: "#94A3B8", fontSize: "1rem" }}>
              {t.finalCTA.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#quiz"
                className="inline-flex items-center justify-center gap-2 bg-[#1B4FD8] text-white px-7 py-3.5 hover:bg-[#1540B8] transition-colors duration-200 group text-sm"
                style={{ borderRadius: "10px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
              >
                {t.finalCTA.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://wa.me/6591234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white px-7 py-3.5 hover:border-white/30 transition-colors duration-200 text-sm"
                style={{ borderRadius: "10px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.041 0C5.44 0 .116 5.32.116 11.918c0 2.1.55 4.152 1.594 5.958L0 24l6.27-1.643a11.877 11.877 0 0 0 5.77 1.47h.005c6.6 0 11.922-5.32 11.922-11.918A11.845 11.845 0 0 0 12.041 0Zm0 21.79h-.004a9.876 9.876 0 0 1-5.031-1.377l-.361-.214-3.72.975.994-3.626-.235-.372a9.85 9.85 0 0 1-1.512-5.258C1.172 6.44 6.03 1.582 12.045 1.582c2.633 0 5.108 1.026 6.968 2.888a9.797 9.797 0 0 1 2.883 6.965c0 6.016-4.86 10.355-9.855 10.355Z" />
                </svg>
                {t.finalCTA.ctaSecondary}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {t.finalCTA.stats.map((item) => (
              <div
                key={item.label}
                className="p-5"
                style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="text-white mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem" }}
                >
                  {item.value}
                </div>
                <div style={{ color: "#64748B", fontSize: "0.8rem" }}>{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
