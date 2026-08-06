import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";

export function LegalPage({ type }: { type: "privacy" | "terms" | "cookies" }) {
  const { t } = useLanguage();
  const page = t.legal[type];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Link
            to="/"
            className="inline-block mb-8 text-sm text-[#1B4FD8] hover:text-[#1540B8] transition-colors"
          >
            {t.legal.backHome}
          </Link>

          <h1
            className="text-[#0A1628] mb-3"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {page.title}
          </h1>
          <p className="text-slate-400 text-sm mb-12">{page.updated}</p>

          <div className="flex flex-col gap-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2
                  className="text-[#0A1628] mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.05rem" }}
                >
                  {section.heading}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
