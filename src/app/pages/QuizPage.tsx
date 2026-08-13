import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check, ShieldCheck } from "lucide-react";

const LEADS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyq3aF3qZaf6EEx1xji-MmZganWfXb1HFyauwWyEXyfG0qGVDGU3LDBsFR7mYKEGKNI6g/exec";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;

/**
 * UTM-метки приходят в URL при клике по рекламе и могут потеряться при
 * перезагрузке страницы, поэтому сохраняем их в sessionStorage при первом заходе.
 */
function captureAttribution(): Record<string, string> {
  const stored: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const fromUrl = params.get(key);
      if (fromUrl) sessionStorage.setItem(key, fromUrl);
      const value = fromUrl || sessionStorage.getItem(key) || "";
      if (value) stored[key] = value;
    }
  } catch {
    /* приватный режим браузера — просто работаем без сохранения */
  }
  return stored;
}

type QuizData = {
  grade: string;
  country: string;
  major: string;
  stage: string;
  name: string;
  phone: string;
};

const initial: QuizData = { grade: "", country: "", major: "", stage: "", name: "", phone: "" };

const steps = [
  {
    key: "grade" as const,
    title: "В каком классе ваш ребёнок?",
    hint: "От этого зависит, сколько времени есть на подготовку",
    options: ["8 класс или младше", "9 класс", "10 класс", "11 класс", "Уже выпустился"],
  },
  {
    key: "country" as const,
    title: "Куда планируете поступать?",
    hint: "Можно выбрать основное направление — детали обсудим на консультации",
    options: ["США", "Великобритания", "Канада", "Европа", "Ещё не решили"],
  },
  {
    key: "major" as const,
    title: "Какое направление интересует?",
    hint: "Если ребёнок ещё не определился — это нормально, так у большинства",
    options: ["Бизнес и экономика", "Инженерия и IT", "Медицина", "Гуманитарные науки", "Пока не определились"],
  },
  {
    key: "stage" as const,
    title: "На каком вы этапе?",
    hint: "Честный ответ поможет нам подготовиться к разговору",
    options: [
      "Только начали думать об этом",
      "Готовимся к экзаменам (SAT/IELTS)",
      "Собираем документы и эссе",
      "Уже подаём заявки",
    ],
  },
];

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[#5A6A8A]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.78rem" }}
        >
          Шаг {current + 1} из {total}
        </span>
        <span
          className="text-[#1B4FD8]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem" }}
        >
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#DBEAFE]" style={{ borderRadius: "999px" }}>
        <motion.div
          className="h-full bg-[#1B4FD8]"
          style={{ borderRadius: "999px" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.12 }}
      type="button"
      onClick={onClick}
      className="w-full text-left px-5 py-4 border transition-all duration-150"
      style={{
        borderRadius: "12px",
        borderColor: selected ? "#1B4FD8" : "#E2E8F0",
        background: selected ? "#EEF2FF" : "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: "0.95rem",
        color: "#0A1628",
        boxShadow: selected ? "0 0 0 1px #1B4FD8" : "none",
      }}
    >
      <span className="flex items-center justify-between gap-3">
        {label}
        {selected && (
          <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
            <Check className="w-4 h-4 text-[#1B4FD8] flex-shrink-0" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}

export function QuizPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  useEffect(() => {
    setAttribution(captureAttribution());
    document.title = "Бесплатная диагностика профиля — Alumia";
  }, []);

  const total = steps.length + 1; // 4 вопроса + контакты
  const isContactStep = step === steps.length;
  const canProceed = isContactStep
    ? data.name.trim().length > 1 && data.phone.replace(/\D/g, "").length >= 10
    : !!data[steps[step].key];

  function submit() {
    setSending(true);
    const payload = {
      name: data.name,
      phone: data.phone,
      grade: data.grade,
      major: data.major,
      stage: `${data.stage} · ${data.country}`,
      lang: "ru",
      utm_source: attribution.utm_source || (attribution.fbclid ? "meta" : "direct"),
      utm_campaign: attribution.utm_campaign || "",
      utm_content: attribution.utm_content || attribution.utm_term || "",
      page: "/quiz",
    };
    try {
      fetch(LEADS_ENDPOINT, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
    } catch {
      /* заявку показываем принятой в любом случае — не теряем человека из-за сети */
    }
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 450);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg bg-white border border-slate-100 text-center px-7 py-12"
          style={{ borderRadius: "20px" }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#1B4FD8]"
            style={{ borderRadius: "16px" }}
            initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}
          >
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </motion.div>
          <h1
            className="text-[#0A1628] mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem" }}
          >
            Заявка принята, {data.name.split(" ")[0]}
          </h1>
          <p className="text-[#5A6A8A] mb-7" style={{ fontSize: "0.98rem", lineHeight: 1.6 }}>
            Мы свяжемся с вами по номеру <b className="text-[#0A1628]">{data.phone}</b> в течение 24 часов
            и назначим бесплатную диагностику профиля.
          </p>
          <div className="text-left bg-[#F8FAFF] px-5 py-5 mb-7" style={{ borderRadius: "14px" }}>
            <div
              className="text-[#0A1628] mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}
            >
              Что будет на диагностике
            </div>
            {[
              "Честная оценка профиля вашего ребёнка",
              "Реалистичный список университетов",
              "3 конкретных шага на ближайшие месяцы",
              "Ответы про сроки, экзамены и финансовую помощь",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5 mb-2.5 last:mb-0">
                <Check className="w-4 h-4 text-[#1B4FD8] mt-0.5 flex-shrink-0" />
                <span className="text-[#5A6A8A]" style={{ fontSize: "0.9rem" }}>
                  {t}
                </span>
              </div>
            ))}
          </div>
          <a
            href="https://www.instagram.com/alumia.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1B4FD8]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.92rem" }}
          >
            Пока подпишитесь на наш Instagram
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col">
      {/* Шапка: только лого, без навигации — чтобы не уводить с шага */}
      <header className="px-5 py-5 flex justify-center border-b border-slate-100 bg-white">
        <img src="/logo.svg" alt="Alumia" className="h-7 w-auto" />
      </header>

      <main className="flex-1 flex items-start justify-center px-5 py-8 md:py-12">
        <div className="w-full max-w-lg">
          <motion.div
            className="text-center mb-7"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-[#0A1628] mb-2"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Узнайте реальные шансы вашего ребёнка
            </h1>
            <p className="text-[#5A6A8A]" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
              4 коротких вопроса — и мы подготовимся к разговору о поступлении в топ-университеты
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-slate-100 px-6 py-7 md:px-8"
            style={{ borderRadius: "20px" }}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProgressBar current={step} total={total} />

            <div className="mt-7 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {!isContactStep ? (
                    <>
                      <h2
                        className="text-[#0A1628] mb-1.5"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "1.15rem",
                        }}
                      >
                        {steps[step].title}
                      </h2>
                      <p className="text-[#5A6A8A] mb-5" style={{ fontSize: "0.88rem" }}>
                        {steps[step].hint}
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {steps[step].options.map((option, i) => (
                          <motion.div
                            key={option}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <OptionButton
                              label={option}
                              selected={data[steps[step].key] === option}
                              onClick={() => {
                                setData({ ...data, [steps[step].key]: option });
                                // авто-переход: меньше кликов — выше конверсия
                                setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 220);
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2
                        className="text-[#0A1628] mb-1.5"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "1.15rem",
                        }}
                      >
                        Куда отправить результат?
                      </h2>
                      <p className="text-[#5A6A8A] mb-5" style={{ fontSize: "0.88rem" }}>
                        Старший советник свяжется с вами в течение 24 часов
                      </p>
                      <div className="flex flex-col gap-4">
                        <div>
                          <label
                            className="block text-[#0A1628] mb-1.5"
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            Ваше имя
                          </label>
                          <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder="Например, Айгуль"
                            className="w-full px-4 py-3.5 border border-slate-200 outline-none focus:border-[#1B4FD8] transition-colors"
                            style={{ borderRadius: "12px", fontSize: "1rem", background: "#F8FAFF" }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-[#0A1628] mb-1.5"
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            Телефон или WhatsApp
                          </label>
                          <input
                            type="tel"
                            inputMode="tel"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                            placeholder="+7 (___) ___ __ __"
                            className="w-full px-4 py-3.5 border border-slate-200 outline-none focus:border-[#1B4FD8] transition-colors"
                            style={{ borderRadius: "12px", fontSize: "1rem", background: "#F8FAFF" }}
                          />
                        </div>
                        <div className="flex items-start gap-2.5 text-[#5A6A8A]" style={{ fontSize: "0.8rem" }}>
                          <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1B4FD8]" />
                          <span>
                            Никакого спама и передачи данных третьим лицам — только звонок по вашей заявке
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 mt-7">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(s - 1, 0))}
                  className="inline-flex items-center gap-2 px-5 py-3.5 border border-slate-200 text-[#0A1628] hover:border-slate-400 transition-colors"
                  style={{
                    borderRadius: "12px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Назад
                </button>
              )}
              {isContactStep && (
                <button
                  type="button"
                  disabled={!canProceed || sending}
                  onClick={submit}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white transition-all"
                  style={{
                    borderRadius: "12px",
                    background: canProceed ? "#1B4FD8" : "#BFD0F5",
                    cursor: canProceed && !sending ? "pointer" : "not-allowed",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {sending ? "Отправляем…" : "Записаться на диагностику"}
                  {!sending && <ArrowRight className="w-4 h-4" />}
                </button>
              )}
            </div>
          </motion.div>

          <p className="text-center text-[#5A6A8A] mt-6" style={{ fontSize: "0.82rem" }}>
            Менторы Alumia — выпускники и студенты топ-университетов США
          </p>
        </div>
      </main>
    </div>
  );
}
