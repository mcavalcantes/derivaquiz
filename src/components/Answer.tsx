import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Answer({
  content = "",
  correct,
  autoskipDelay,
  refreshQuestion,
}: {
  content?: string,
  correct: boolean
  autoskipDelay: number,
  refreshQuestion(): Promise<void>,
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    katex.render(content, buttonRef.current as HTMLButtonElement);
  }, [content]);

  async function handleClick() {
    const btn = buttonRef.current as HTMLButtonElement;
    btn.classList.remove("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");

    if (correct) {
      btn.classList.add("border-[var(--feedback-correct)]", "ring-2", "ring-[var(--feedback-correct)]");
    } else {
      btn.classList.add("border-[var(--feedback-incorrect)]", "ring-2", "ring-[var(--feedback-incorrect)]");
    }

    setTimeout(() => {
      if (correct) {
        btn.classList.remove("border-[var(--feedback-correct)", "ring-2", "ring-[var(--feedback-correct)]");
      } else {
        btn.classList.remove("border-[var(--feedback-incorrect)]", "ring-2", "ring-[var(--feedback-incorrect)]");
      }

      btn.classList.add("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
      refreshQuestion();
    }, autoskipDelay);
  }

  return (
    <button ref={buttonRef} onClick={handleClick} className="
      select-none cursor-pointer h-20 w-full grid place-items-center
      border rounded-md bg-[var(--foreground)] xl:text-lg transition
      border-[var(--border)] hover:ring ring-[var(--ring)]
    "/>
  );
}
