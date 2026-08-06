import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

const images = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&auto=format",
];

export function WhyUs() {
  const { t } = useLanguage();
  return (
    <section id="why-us" className="py-20 bg-white">
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
            {t.whyUs.eyebrow}
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
            {t.whyUs.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.whyUs.items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 border border-slate-100 bg-white"
              style={{ borderRadius: "16px" }}
            >
              <div className="overflow-hidden mb-4 bg-slate-100" style={{ borderRadius: "10px", height: "160px" }}>
                <img src={images[i]} alt={f.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <h3
                className="text-[#0A1628] mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}
              >
                {f.title}
              </h3>
              <p className="text-slate-500 leading-relaxed" style={{ fontSize: "0.8rem" }}>
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
