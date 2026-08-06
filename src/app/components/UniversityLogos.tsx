import { useLanguage } from "../i18n/LanguageContext";

const logos = [
  { name: "Brown", file: "brown.png" },
  { name: "Carnegie Mellon", file: "carnegie.png" },
  { name: "Chicago", file: "chicago.png" },
  { name: "Columbia", file: "columbia.png" },
  { name: "Cornell", file: "cornell.png" },
  { name: "Dartmouth", file: "dartmouth.png", small: true },
  { name: "Harvard", file: "harvard.png" },
  { name: "Northwestern", file: "northwestern.png" },
  { name: "Princeton", file: "princeton.png" },
  { name: "Stanford", file: "stanford.png" },
  { name: "UPenn", file: "upenn.png" },
  { name: "Yale", file: "yale.png" },
];

export function UniversityLogos() {
  const { t } = useLanguage();
  return (
    <section id="universities" className="py-10 bg-white border-b border-slate-100">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0 px-10"
              style={{ minWidth: "160px" }}
            >
              <img
                src={`/logos/${logo.file}`}
                alt={logo.name}
                loading={i < logos.length ? "eager" : "lazy"}
                decoding="async"
                className={`${logo.small ? "h-7" : "h-10"} w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden max-w-7xl mx-auto px-6 mt-10 grid-cols-2 sm:grid-cols-4 gap-6">
        {t.logos.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span
              className="text-[#0A1628]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.7rem" }}
            >
              {stat.value}
            </span>
            <span className="text-slate-400 mt-0.5" style={{ fontSize: "0.78rem" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
