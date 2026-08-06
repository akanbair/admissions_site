import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-11 h-11 flex items-center justify-center bg-[#1B4FD8] hover:bg-[#1540B8] text-white transition-[opacity,transform,background-color] duration-200 ease-out"
      style={{
        borderRadius: "10px",
        boxShadow: "0 8px 20px rgba(27,79,216,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
