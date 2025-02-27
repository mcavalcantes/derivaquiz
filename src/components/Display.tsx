import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Display({ expression = "" }: { expression?: string }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    katex.render(expression, divRef.current as HTMLDivElement);
  }, [expression]);

  return (
    <div ref={divRef} className="
      select-none h-56 flex items-center justify-center
      text-2xl border rounded-md bg-[var(--foreground)] border-[var(--border)]
    "/>
  );
}
