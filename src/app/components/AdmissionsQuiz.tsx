import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

type QuizData = {
  grade: string;
  major: string;
  stage: string;
  parentName: string;
  phone: string;
};

const initialData: QuizData = { grade: "", major: "", stage: "", parentName: "", phone: "" };

function OptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-4 py-3 border transition-all duration-150 flex items-center justify-between"
      style={{
        borderRadius: "8px",
        background: selected ? "#1B4FD8" : "white",
        borderColor: selected ? "#1B4FD8" : "#E2E8F0",
        color: selected ? "white" : "#374151",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 500,
        fontSize: "0.875rem",
      }}
    >
      {label}
      {selected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
    </button>
  );
}

const LEADS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyq3aF3qZaf6EEx1xji-MmZganWfXb1HFyauwWyEXyfG0qGVDGU3LDBsFR7mYKEGKNI6g/exec";

function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* старый браузер */
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function sendLead(data: QuizData, lang: string) {
  try {
    const params = new URLSearchParams(window.location.search);
    const eventId = newEventId();
    try {
      window.fbq?.("track", "Lead", { content_name: "home_quiz" }, { eventID: eventId });
    } catch {
      /* пиксель заблокирован */
    }
    const payload = {
      event_id: eventId,
      name: data.parentName,
      phone: data.phone,
      grade: data.grade,
      major: data.major,
      stage: data.stage,
      lang,
      utm_source: params.get("utm_source") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      page: window.location.pathname,
    };
    fetch(LEADS_ENDPOINT, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
  } catch {
    /* never block the UI on lead delivery */
  }
}

export function AdmissionsQuiz() {
  const { t, lang } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const steps = t.quiz.steps;
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  function goNext() {
    if (currentStep < steps.length - 1) { setDirection("forward"); setCurrentStep((s) => s + 1); }
    else { sendLead(data, lang); setSubmitted(true); }
  }
  function goBack() {
    if (currentStep > 0) { setDirection("back"); setCurrentStep((s) => s - 1); }
  }
  function canProceed() {
    switch (currentStep) {
      case 0: return !!data.grade;
      case 1: return !!data.major;
      case 2: return !!data.stage;
      case 3: return !!(data.parentName && data.phone);
      default: return false;
    }
  }

  const variants = {
    enter: (dir: "forward" | "back") => ({ x: dir === "forward" ? 32 : -32, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "forward" | "back") => ({ x: dir === "forward" ? -32 : 32, opacity: 0 }),
  };

  return (
    <section id="quiz" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p
              className="text-[#1B4FD8] mb-3 uppercase tracking-widest"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.12em" }}
            >
              {t.quiz.eyebrow}
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
              {t.quiz.title}
            </h2>
            {t.quiz.description && (
              <p className="text-slate-500 leading-relaxed mb-10 max-w-sm" style={{ fontSize: "0.95rem" }}>
                {t.quiz.description}
              </p>
            )}

            {t.quiz.processSteps.map((text, i) => (
              <div key={text} className="flex items-start gap-4 mb-5">
                <span
                  className="text-slate-200 flex-shrink-0 leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.1rem", marginTop: "2px" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-slate-600">{text}</span>
              </div>
            ))}

            <div className="mt-10 overflow-hidden bg-slate-50" style={{ borderRadius: "10px", height: "140px" }}>
              <img
                src="/quiz-banner.jpg"
                alt="Students collaborating"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div
              className="bg-white border border-slate-100"
              style={{ borderRadius: "12px", boxShadow: "0 8px 32px rgba(10,22,40,0.07)" }}
            >
              {!submitted ? (
                <>
                  {/* Progress */}
                  <div className="px-7 pt-6 pb-5 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] text-slate-400">{currentStep + 1} / {steps.length}</span>
                      <span className="text-[11px] text-[#1B4FD8]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                        {step.label}
                      </span>
                    </div>
                    <div className="h-1 bg-slate-100" style={{ borderRadius: "2px" }}>
                      <motion.div
                        className="h-full bg-[#1B4FD8]"
                        style={{ borderRadius: "2px" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="px-7 py-6">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                      >
                        <h3
                          className="text-[#0A1628] mb-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem" }}
                        >
                          {step.question}
                        </h3>
                        <p className="text-slate-400 text-xs mb-5">{step.subtitle}</p>

                        {currentStep === 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {t.quiz.grades.map((g) => <OptionButton key={g} label={g} selected={data.grade === g} onClick={() => setData({ ...data, grade: g })} />)}
                          </div>
                        )}
                        {currentStep === 1 && (
                          <div className="flex flex-col gap-2">
                            {t.quiz.majors.map((m) => <OptionButton key={m} label={m} selected={data.major === m} onClick={() => setData({ ...data, major: m })} />)}
                          </div>
                        )}
                        {currentStep === 2 && (
                          <div className="flex flex-col gap-2">
                            {t.quiz.stages.map((s) => <OptionButton key={s} label={s} selected={data.stage === s} onClick={() => setData({ ...data, stage: s })} />)}
                          </div>
                        )}
                        {currentStep === 3 && (
                          <div className="flex flex-col gap-3">
                            {[
                              { label: t.quiz.fields.parentName, key: "parentName" as keyof QuizData, type: "text", placeholder: t.quiz.fields.parentNamePlaceholder },
                              { label: t.quiz.fields.phone, key: "phone" as keyof QuizData, type: "tel", placeholder: t.quiz.fields.phonePlaceholder },
                            ].map((field) => (
                              <div key={field.key}>
                                <label className="block text-[11px] text-slate-500 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                                  {field.label}
                                </label>
                                <input
                                  type={field.type}
                                  placeholder={field.placeholder}
                                  value={data[field.key]}
                                  onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                                  className="w-full px-4 py-3 border text-sm text-slate-700 outline-none transition-colors duration-150"
                                  style={{
                                    borderRadius: "8px",
                                    borderColor: data[field.key] ? "#1B4FD8" : "#E2E8F0",
                                    background: "white",
                                  }}
                                  onFocus={(e) => (e.currentTarget.style.borderColor = "#1B4FD8")}
                                  onBlur={(e) => (e.currentTarget.style.borderColor = data[field.key] ? "#1B4FD8" : "#E2E8F0")}
                                />
                              </div>
                            ))}
                            <p className="text-[10px] text-slate-400">{t.quiz.privacyNote}</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Nav buttons */}
                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-50">
                      <button
                        type="button"
                        onClick={goBack}
                        disabled={currentStep === 0}
                        className="flex items-center gap-1.5 text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ color: currentStep === 0 ? "#94A3B8" : "#1B4FD8" }}
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        {t.quiz.back}
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-2.5 text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                        style={{
                          borderRadius: "8px",
                          background: canProceed() ? "#1B4FD8" : "#94A3B8",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {currentStep === steps.length - 1 ? t.quiz.submit : t.quiz.continueLabel}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <div
                    className="w-12 h-12 bg-[#1B4FD8] flex items-center justify-center mx-auto mb-5"
                    style={{ borderRadius: "10px" }}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className="text-[#0A1628] mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.15rem" }}
                  >
                    {t.quiz.successTitle}, {data.parentName.split(" ")[0] || t.quiz.successFallbackName}!
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {t.quiz.successBody.before}
                    <strong className="text-[#1B4FD8]">{data.phone}</strong>
                    {t.quiz.successBody.after}
                  </p>
                  <div className="bg-slate-50 p-4 text-left" style={{ borderRadius: "8px" }}>
                    {t.quiz.successList.map((item) => (
                      <div key={item} className="flex items-start gap-2 mb-2">
                        <Check className="w-3.5 h-3.5 text-[#1B4FD8] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
