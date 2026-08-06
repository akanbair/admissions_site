import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const mentorMeta = [
  { photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format", admitted: 340 },
  { photo: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?w=400&h=400&fit=crop&auto=format", admitted: 280 },
  { photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&auto=format", admitted: 220 },
  { photo: "https://images.unsplash.com/photo-1600878459138-e1123b37cb30?w=400&h=400&fit=crop&auto=format", admitted: 195 },
];

type MentorItem = {
  name: string;
  title: string;
  education: string;
  bio: string;
  specialties: string[];
};

function MentorCard({
  mentor,
  i,
  className = "",
  fixed = false,
}: {
  mentor: MentorItem;
  i: number;
  className?: string;
  fixed?: boolean;
}) {
  return (
    <div
      className={`border border-slate-100 bg-white overflow-hidden group flex flex-col h-full ${className}`}
      style={{ borderRadius: "12px", ...(fixed ? { height: "430px" } : {}) }}
    >
      <div className="h-52 overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={mentorMeta[i].photo}
          alt={mentor.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 min-h-0">
        <h3
          className="text-[#0A1628] line-clamp-1"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}
        >
          {mentor.name}
        </h3>
        <div className="text-[11px] text-[#1B4FD8] mb-1 line-clamp-1">{mentor.title}</div>
        <div className="text-[10px] text-slate-400 mb-3 line-clamp-1">{mentor.education}</div>

        <p className={`text-slate-500 text-xs leading-relaxed mb-4 ${fixed ? "line-clamp-3" : ""}`}>{mentor.bio}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {mentor.specialties.map((s) => (
            <span
              key={s}
              className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 border border-slate-100"
              style={{ borderRadius: "4px" }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMentorCarousel({ items }: { items: MentorItem[] }) {
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
            <MentorCard mentor={items[index]} i={index} fixed />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-end mt-5">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {items.map((mentor, i) => (
            <span
              key={mentor.name}
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
            aria-label="Previous mentor"
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
            aria-label="Next mentor"
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

export function Mentors() {
  const { t } = useLanguage();
  return (
    <section id="mentors" className="py-20 bg-white">
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
            {t.mentors.eyebrow}
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
            {t.mentors.title}
          </h2>
        </motion.div>

        {/* Mobile: one-at-a-time carousel */}
        <MobileMentorCarousel items={t.mentors.items} />

        {/* Desktop / tablet: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.mentors.items.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className="h-full"
            >
              <MentorCard mentor={mentor} i={i} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-sm text-slate-400"
        >
          {t.mentors.footerNote.before}
          <strong className="text-slate-500">{t.mentors.footerNote.strong}</strong>
          {t.mentors.footerNote.after}
        </motion.p>
      </div>
    </section>
  );
}
