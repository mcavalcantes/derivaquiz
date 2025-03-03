import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Answer({
  content = "",
  correct = false,
  handleClick,
}: {
  content?: string,
  correct?: boolean
  handleClick(
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    timeoutRef: React.RefObject<number | null>,
    correct: boolean,
  ): Promise<void>,
}) {
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
        "ring-[var(--feedback-incorrect)]"
      );
      btn.classList.add("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
    }
  }, [content]);

  return (
    <button ref={buttonRef} onClick={() => handleClick(buttonRef, timeoutRef, correct)} className="
      select-none cursor-pointer h-20 w-full grid place-items-center
      border rounded-md bg-[var(--foreground)] xl:text-lg transition
      border-[var(--border)] hover:ring ring-[var(--ring)]
    "/>
  );
}
