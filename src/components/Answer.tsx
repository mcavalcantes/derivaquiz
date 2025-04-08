import { useEffect, useRef } from "react";
import { useApp } from "@/AppContext";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Answer({
  content = "",
  correct = false,
}: {
  content?: string,
  correct?: boolean,
}) {
  const { state, handleAnswerClick } = useApp();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      katex.render(content, contentRef.current);
    }

    const btn = buttonRef.current;
    if (btn) {
      btn.classList.remove(
        "border-[var(--feedback-correct)]",
        "border-[var(--feedback-incorrect)]",
        "ring-2",
        "ring-[var(--feedback-correct)]",
        "ring-[var(--feedback-incorrect)]",
        "shadow-[inset_0_0_0_1px_rgba(48,240,48,0.8)]",
        "shadow-[inset_0_0_0_1px_rgba(240,68,68,0.8)]",
      );
      
      btn.classList.add("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
    }
  }, [content]);

  return (
    <button 
      ref={buttonRef} 
      onClick={() => handleAnswerClick(buttonRef, timeoutRef, correct)} 
      disabled={state.answerClicksBlocked}
      className="
        answer-button select-none cursor-pointer h-20 w-full grid place-items-center
        border rounded-md bg-[var(--foreground)] xl:text-lg transition
        border-[var(--border)] hover:ring ring-[var(--ring)]
        overflow-hidden relative
      "
    >
      <div
        ref={contentRef}
        className="
          text-sm md:text-base xl:text-lg
          absolute inset-0
          flex items-center justify-center
          overflow-x-auto overflow-y-hidden
          text-center
          max-w-full
          break-words
        "
      />
    </button>
  );
}
