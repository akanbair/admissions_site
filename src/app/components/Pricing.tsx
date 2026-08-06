import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const planMeta = [
  { price: "$2,500", highlight: false },
  { price: "$5,500", highlight: true },
  { price: "$9,999", highlight: false },
];

export function Pricing() {
  const { t } = useLanguage();
  return (
    <section id="pricing" className="hidden py-20" style={{ background: "#F8FAFF" }}>
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
            {t.pricing.eyebrow}
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
            {t.pricing.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.pricing.plans.map((plan, i) => {
            const meta = planMeta[i];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="flex flex-col"
                style={{
                  background: meta.highlight ? "#0A1628" : "white",
                  boxShadow: meta.highlight ? "inset 0 0 0 1.5px #1B4FD8" : "inset 0 0 0 1.5px #E2E8F0",
                  borderRadius: "12px",
                  padding: "28px",
                }}
              >
                <div className="mb-6">
                  <div
                    className="mb-4"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: meta.highlight ? "#60A5FA" : "#1B4FD8",
                    }}
                  >
                    {plan.name}
                  </div>
                  <div className="flex items-end gap-1.5 mb-3">
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: "2rem",
                        lineHeight: 1,
                        color: meta.highlight ? "white" : "#0A1628",
                      }}
                    >
                      {meta.price}
                    </span>
                    <span
                      className="mb-0.5"
                      style={{ fontSize: "0.75rem", color: meta.highlight ? "#94A3B8" : "#94A3B8" }}
                    >
                      /{plan.period}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: meta.highlight ? "#94A3B8" : "#64748B" }}
                  >
                    {plan.description}
                  </p>
                </div>

                <div
                  className="mb-6 h-px"
                  style={{ background: meta.highlight ? "rgba(255,255,255,0.08)" : "#F1F5F9" }}
                />

                <div className="flex flex-col gap-3 flex-1 mb-7">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check
                        className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                        style={{ color: meta.highlight ? "#60A5FA" : "#1B4FD8" }}
                      />
                      <span
                        className="text-xs leading-relaxed"
                        style={{ color: meta.highlight ? "#CBD5E1" : "#374151" }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#quiz"
                  className="flex items-center justify-center gap-2 w-full py-3.5 transition-all duration-200 group text-sm"
                  style={{
                    background: meta.highlight ? "#1B4FD8" : "transparent",
                    border: meta.highlight ? "none" : "1.5px solid #E2E8F0",
                    borderRadius: "8px",
                    color: meta.highlight ? "white" : "#0A1628",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (meta.highlight) el.style.background = "#1540B8";
                    else el.style.borderColor = "#94A3B8";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (meta.highlight) el.style.background = "#1B4FD8";
                    else el.style.borderColor = "#E2E8F0";
                  }}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-slate-400 mt-8"
        >
          {t.pricing.footerNote}
        </motion.p>
      </div>
    </section>
  );
}
