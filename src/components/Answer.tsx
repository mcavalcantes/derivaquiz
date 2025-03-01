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
      btn.classList.add("ring-2");
      btn.classList.add("ring-[var(--feedback-correct)]");
      setTimeout(() => {
        btn.classList.remove("ring-2");
        btn.classList.remove("ring-[var(--feedback-correct)]");
        btn.classList.add("hover:ring");
        refresh();
      }, delay * 1000);
    } else {
      btn.classList.add("ring-2");
      btn.classList.add("ring-[var(--feedback-incorrect)]");
      setTimeout(() => {
        btn.classList.remove("ring-2");
        btn.classList.remove("ring-[var(--feedback-incorrect)]");
        btn.classList.add("hover:ring");
        refresh();
      }, delay * 1000);
    }
  }

  return (
    <button ref={buttonRef} onClick={handleClick} className="
      select-none cursor-pointer h-20 flex items-center justify-center
      border rounded-md bg-[var(--foreground)] border-[var(--border)]
      xl:text-lg hover:ring transition
    "/>
  );
}
