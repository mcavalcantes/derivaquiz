import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Answer({ expression }: { expression?: string }) {
  if (!expression) {
    throw new Error();
  }

  const answerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    katex.render(expression, answerRef.current as HTMLButtonElement);
  }, [expression]);

  return (
    <button ref={answerRef} className="
      select-none cursor-pointer bg-white h-20 flex items-center justify-center
      border rounded border-[var(--border)] outline-none hover:ring ring-[var(--border)] transition
    "/>
  );
}
