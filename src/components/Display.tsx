import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Display({ expression }: { expression?: string }) {
  if (!expression) {
    throw new Error();
  }

  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    katex.render(expression, displayRef.current as HTMLDivElement);
  }, [expression]);

  return (
    <div ref={displayRef} className="
      select-none bg-white h-56 flex items-center justify-center border rounded border-[var(--border)]
    "/>
  );
}
