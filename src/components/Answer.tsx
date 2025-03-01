import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Answer({
  expression = "",
  correct,
  refresh,
  delay,
}: {
  expression?: string,
  correct: boolean
  refresh: () => Promise<void>,
  delay: number,
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    katex.render(expression, buttonRef.current as HTMLButtonElement);
  }, [expression]);

  function handleClick() {
    const btn = buttonRef.current as HTMLButtonElement;
    btn.classList.remove("hover:ring");

    if (correct) {
      btn.classList.add("border-[var(--feedback-correct)", "ring-2", "ring-[var(--feedback-correct)]");
      setTimeout(() => {
        btn.classList.remove("border-[var(--feedback-correct)", "ring-2", "ring-[var(--feedback-correct)]");
        btn.classList.add("hover:ring");
        refresh();
      }, delay * 1000);
    } else {
      btn.classList.add("border-[var(--feedback-incorrect)", "ring-2", "ring-[var(--feedback-incorrect)]");
      setTimeout(() => {
        btn.classList.remove("border-[var(--feedback-incorrect)", "ring-2", "ring-[var(--feedback-incorrect)]");
        btn.classList.add("hover:ring");
        refresh();
      }, delay * 1000);
    }
  }

  return (
    <button ref={buttonRef} onClick={handleClick} className="
      select-none cursor-pointer h-20 w-full flex items-center justify-center
      border rounded-md bg-[var(--foreground)] border-[var(--border)]
      xl:text-lg hover:ring transition
    "/>
  );
}
