import { BrowserRouter, Routes, Route } from "react-router";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { UniversityLogos } from "./components/UniversityLogos";
import { WhyUs } from "./components/WhyUs";
import { HowItWorks } from "./components/HowItWorks";
import { Mentors } from "./components/Mentors"; // hidden for now — see HomePage, kept for future re-enable
import { ProvenResults } from "./components/ProvenResults";
import { Pricing } from "./components/Pricing";
import { AdmissionsQuiz } from "./components/AdmissionsQuiz";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { MobileStickyCTA } from "./components/MobileStickyCTA";
import { LegalPage } from "./pages/LegalPage";

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-16 md:pb-0">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Navbar />
      <main>
        <Hero />
        <UniversityLogos />
        <WhyUs />
        <HowItWorks />
        {/* <Mentors /> hidden — replaced by ProvenResults below, keep this to re-enable later */}
        <ProvenResults />
        <Pricing />
        <AdmissionsQuiz />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
          <Route path="/cookie-policy" element={<LegalPage type="cookies" />} />
        </Routes>
        <ScrollToTopButton />
      </BrowserRouter>
    </LanguageProvider>
  );
}
