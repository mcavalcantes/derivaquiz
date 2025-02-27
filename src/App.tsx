import { useEffect, useState } from "react";
import { Display } from "./components/Display";
import { Answer } from "./components/Answer";

import { Cog } from "./icons/heroicons/Cog";
import { Sun } from "./icons/heroicons/Sun";
import { Moon } from "./icons/heroicons/Moon";
import { Github } from "./icons/iconmonstr/Github";

import { getRandomQuestion } from "./lib/getRandomQuestion";
import { toggleTheme } from "./lib/toggleTheme";
import type { Response } from "./types/types";

export function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme")!);
  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    async function initialize() {
      const json = await getRandomQuestion();
      setResponse(json);
    }
    
    initialize();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-8 md:px-40 xl:px-100 flex items-center gap-2">
        <button
          onClick={() => toggleTheme(setTheme)}
          className="p-0.5 cursor-pointer border border-[var(--border)] rounded"
        >{theme === "dark" ? <Sun /> : <Moon />}</button>
      </header>
      <main className="flex flex-col gap-4 px-8 md:px-40 xl:px-100">
        <Display expression={response?.question} />
        <div className="grid gap-4">
          {response?.answers.map(item => <Answer expression={item.content} />)}
        </div>
      </main>
      <footer className="mt-auto h-16 select-none flex items-center justify-center gap-1 text-xs font-semibold">
        <a
          href="mailto:matheuscavalcantes.mc@gmail.com"
          className="underline underline-offset-2"
        >Contato</a>
        <p>{`|`}</p>
        <a
          href="https://github.com/mcavalcantes/derivaquiz"
          className="flex items-center gap-1 underline underline-offset-2"
        ><Github className="size-4" /><p>Repositório</p></a>
      </footer>
    </div>
  );
}
