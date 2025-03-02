import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function Display({ content = "" }: { content?: string }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    katex.render(content, divRef.current as HTMLDivElement);
  }, [content]);

  return (
    <div ref={divRef} className="
      select-none h-56 grid place-items-center
      text-xl xl:text-2xl border rounded-md bg-[var(--foreground)] border-[var(--border)]
    "/>
  );
}
