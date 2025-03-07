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
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    katex.render(content, buttonRef.current as HTMLButtonElement);
    
    const btn = buttonRef.current;
    if (btn) {
      btn.classList.remove(
        "border-[var(--feedback-correct)]", 
        "border-[var(--feedback-incorrect)]", 
        "ring-2", 
        "ring-[var(--feedback-correct)]", 
        "ring-[var(--feedback-incorrect)]",
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
      "
    />
  );
}
