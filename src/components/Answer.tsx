import { useCallback, useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Answer({
  content = "",
  correct = false,
  autoskipDelay,
  refreshQuestion,
}: {
  content?: string,
  correct?: boolean
  autoskipDelay: number,
  refreshQuestion(): Promise<void>,
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    katex.render(content, buttonRef.current as HTMLButtonElement);
    
    const btn = buttonRef.current;
    if (btn) {
      btn.classList.remove(
        "border-[var(--feedback-correct)]", 
        "border-[var(--feedback-incorrect)]", 
        "ring-2", 
        "ring-[var(--feedback-correct)]", 
        "ring-[var(--feedback-incorrect)]"
      );
      btn.classList.add("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
    }
  }, [content]);

  const handleClick = useCallback(async () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    const btn = buttonRef.current as HTMLButtonElement;
    if (!btn) return;

    btn.classList.remove("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");

    if (correct) {
      btn.classList.add("border-[var(--feedback-correct)]", "ring-2", "ring-[var(--feedback-correct)]");
    } else {
      btn.classList.add("border-[var(--feedback-incorrect)]", "ring-2", "ring-[var(--feedback-incorrect)]");
    }

    timeoutRef.current = window.setTimeout(async () => {
      if (buttonRef.current) {
        if (correct) {
          buttonRef.current.classList.remove("border-[var(--feedback-correct)]", "ring-2", "ring-[var(--feedback-correct)]");
        } else {
          buttonRef.current.classList.remove("border-[var(--feedback-incorrect)]", "ring-2", "ring-[var(--feedback-incorrect)]");
        }

        buttonRef.current.classList.add("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
      }
      await refreshQuestion();
      timeoutRef.current = null;
    }, autoskipDelay);
  }, [correct, autoskipDelay, refreshQuestion]);

  return (
    <button ref={buttonRef} onClick={handleClick} className="
      select-none cursor-pointer h-20 w-full grid place-items-center
      border rounded-md bg-[var(--foreground)] xl:text-lg transition
      border-[var(--border)] hover:ring ring-[var(--ring)]
    "/>
  );
}
