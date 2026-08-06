import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { mentorMeta } from "./Mentors";

export function ProvenResults() {
  const { t } = useLanguage();
  const photo = mentorMeta[0].photo;

  return (
    <section id="proven-results" className="py-20 bg-white">
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
            {t.provenResults.eyebrow}
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
            {t.provenResults.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden min-h-[440px]"
            style={{ borderRadius: "20px" }}
          >
            <img src={photo} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(10,22,40,0) 45%, rgba(10,22,40,0.82) 100%)" }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div
                className="text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 4.5vw, 3.2rem)", lineHeight: 1 }}
              >
                {t.provenResults.mentorStat.value}
              </div>
              <p className="text-white/85 text-sm leading-relaxed mt-3">{t.provenResults.mentorStat.caption}</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {[t.provenResults.stat1, t.provenResults.stat2].map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex-1 p-8 border border-slate-100 flex flex-col justify-center"
                style={{ background: "#F8FAFF", borderRadius: "20px" }}
              >
                <div
                  className="text-[#1B4FD8]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 4.5vw, 3.2rem)", lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mt-3">{stat.caption}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 border border-slate-100"
            style={{ background: "#F8FAFF", borderRadius: "20px" }}
          >
            <h3
              className="text-[#0A1628] mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}
            >
              {t.provenResults.listTitle}
            </h3>
            <div>
              {t.provenResults.universities.map((uni, i) => (
                <div
                  key={uni.name}
                  className={`flex items-center justify-between py-3 ${
                    i !== t.provenResults.universities.length - 1 ? "border-b border-slate-200/70" : ""
                  }`}
                >
                  <span
                    className="text-slate-600 text-sm"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                  >
                    {uni.name}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1"
                    style={{
                      borderRadius: "999px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                    }}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{uni.percent}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
