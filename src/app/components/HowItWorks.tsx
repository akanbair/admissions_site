import { motion } from "motion/react";
import { Calendar, Target, FileEdit, Award } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const iconMeta = [
  { icon: Calendar, color: "#1B4FD8", bg: "#EEF2FF" },
  { icon: Target, color: "#7C3AED", bg: "#F5F3FF" },
  { icon: FileEdit, color: "#0EA5E9", bg: "#F0F9FF" },
  { icon: Award, color: "#059669", bg: "#ECFDF5" },
];

export function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section id="how-it-works" className="py-20" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p
            className="text-[#1B4FD8] mb-3 uppercase tracking-widest"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.12em" }}
          >
            {t.howItWorks.eyebrow}
          </p>
          <h2
            className="text-[#0A1628]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t.howItWorks.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100" style={{ borderRadius: "12px", overflow: "hidden" }}>
          {t.howItWorks.steps.map((step, i) => {
            const Icon = iconMeta[i].icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ background: iconMeta[i].bg, borderRadius: "8px" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: iconMeta[i].color }} />
                  </div>
                  <span
                    className="text-slate-300"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">{step.timeline}</div>
                <h3
                  className="text-[#0A1628] mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed" style={{ fontSize: "0.8rem" }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href="#quiz"
            className="w-full sm:w-auto flex sm:inline-flex items-center justify-center gap-2 bg-[#1B4FD8] text-white px-7 py-3.5 hover:bg-[#1540B8] transition-colors duration-200 text-sm"
            style={{
              borderRadius: "10px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            {t.howItWorks.ctaText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
