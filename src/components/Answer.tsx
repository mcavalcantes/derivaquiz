import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Answer({ expression = "", correct = false }: { expression?: string, correct?: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    katex.render(expression, buttonRef.current as HTMLButtonElement);
  }, [expression]);

  return (
    <button ref={buttonRef} className="
      select-none cursor-pointer h-20 flex items-center justify-center
      border rounded-md bg-[var(--foreground)] border-[var(--border)]
      hover:ring ring-[var(--ring)] transition
    "/>
  );
}
