import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-slate-100 bg-white overflow-hidden transition-all duration-150"
      style={{ borderRadius: "10px" }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className="text-[#0A1628]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
        >
          {question}
        </span>
        <div
          className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-150"
          style={{
            borderRadius: "6px",
            background: open ? "#1B4FD8" : "#F1F5F9",
          }}
        >
          {open
            ? <Minus className="w-3 h-3 text-white" />
            : <Plus className="w-3 h-3 text-slate-500" />
          }
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-slate-50 mb-4" />
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const { t } = useLanguage();
  return (
    <section id="faq" className="py-20" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-24"
          >
            <p
              className="text-[#1B4FD8] mb-3 uppercase tracking-widest"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.12em" }}
            >
              {t.faq.eyebrow}
            </p>
            <h2
              className="text-[#0A1628] mb-5"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {t.faq.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-7">
              {t.faq.description}
            </p>
            <a
              href="#quiz"
              className="inline-flex items-center gap-2 bg-[#1B4FD8] text-white px-6 py-3 hover:bg-[#1540B8] transition-colors duration-150 text-sm"
              style={{ borderRadius: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
            >
              {t.faq.cta}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="flex flex-col gap-2"
          >
            {t.faq.items.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
