import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const photos = [
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1615109398623-88346a601842?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&auto=format&q=70",
];

type TestimonialItem = {
  name: string;
  university: string;
  program: string;
  quote: string;
  outcome: string;
};

function TestimonialCard({ item, i, fixed = false }: { item: TestimonialItem; i: number; fixed?: boolean }) {
  return (
    <div
      className="bg-white p-6 border border-slate-100 flex flex-col h-full"
      style={{ borderRadius: "12px", ...(fixed ? { height: "300px" } : {}) }}
    >
      <Quote className="w-5 h-5 text-slate-200 mb-4 flex-shrink-0" />

      <p className={`text-slate-600 text-sm leading-relaxed flex-1 mb-5 ${fixed ? "line-clamp-4" : ""}`}>
        "{item.quote}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
        <div className="w-10 h-10 overflow-hidden bg-slate-100 flex-shrink-0" style={{ borderRadius: "8px" }}>
          <img src={photos[i]} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
        <div>
          <div
            className="text-[#0A1628]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem" }}
          >
            {item.name}
          </div>
          <div className="text-[11px] text-slate-400">{item.university} · {item.program}</div>
        </div>
      </div>
    </div>
  );
}

function MobileTestimonialCarousel({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  const go = (dir: 1 | -1) => {
    const next = index + dir;
    if (next < 0 || next >= items.length) return;
    setDirection(dir);
    setIndex(next);
  };

  return (
    <div className="sm:hidden">
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <TestimonialCard item={items[index]} i={index} fixed />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-end mt-5">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {items.map((item, i) => (
            <span
              key={item.name}
              className="h-1.5 transition-all duration-300"
              style={{
                width: i === index ? "18px" : "6px",
                borderRadius: "999px",
                background: i === index ? "#1B4FD8" : "#E2E8F0",
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!canPrev}
            aria-label="Previous story"
            className="w-9 h-9 flex items-center justify-center transition-colors duration-200 disabled:cursor-not-allowed"
            style={{
              borderRadius: "8px",
              background: canPrev ? "#EEF2FF" : "#F1F5F9",
              color: canPrev ? "#1B4FD8" : "#CBD5E1",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!canNext}
            aria-label="Next story"
            className="w-9 h-9 flex items-center justify-center transition-colors duration-200 disabled:cursor-not-allowed"
            style={{
              borderRadius: "8px",
              background: canNext ? "#1B4FD8" : "#F1F5F9",
              color: canNext ? "#ffffff" : "#CBD5E1",
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="py-20" style={{ background: "#F8FAFF" }}>
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
            {t.testimonials.eyebrow}
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
            {t.testimonials.title}
          </h2>
        </motion.div>

        {/* Mobile: one-at-a-time carousel */}
        <MobileTestimonialCarousel items={t.testimonials.items} />

        {/* Desktop / tablet: grid */}
        <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="h-full"
            >
              <TestimonialCard item={item} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
