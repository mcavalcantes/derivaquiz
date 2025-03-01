import { useEffect, useState } from "react";
import { Display } from "./components/Display";
import { Answer } from "./components/Answer";
import { MobileForm } from "./components/MobileForm";
import { DesktopForm } from "./components/DesktopForm";

import { Cog } from "./icons/heroicons/Cog";
import { Sun } from "./icons/heroicons/Sun";
import { Moon } from "./icons/heroicons/Moon";
import { Github } from "./icons/iconmonstr/Github";

import { getRandomQuestion } from "./lib/getRandomQuestion";
import { toggleTheme } from "./lib/toggleTheme";
import type { Response } from "./types/types";
import type { FormData } from "./types/types";

export function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme")!);
  const [response, setResponse] = useState<Response | null>(null);

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    params: {
      limit: true,
      derivative: true,
      integral: true,
      easy: true,
      medium: true,
      hard: true,
      legendary: false,
    },
    autoskip: true,
    autoskipDelay: 1.0,
  });

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
          onClick={() => setDropdown(!dropdown)}
          className="xl:hidden p-0.5 cursor-pointer border border-[var(--border)] rounded"
        ><Cog /></button>
        <button
          onClick={() => toggleTheme(setTheme)}
          className="p-0.5 cursor-pointer border border-[var(--border)] rounded"
        >{theme === "dark" ? <Sun /> : <Moon />}</button>
        {dropdown &&
          <div className="xl:hidden z-50 absolute left-0 right-0 top-16 px-8 md:px-40 bg-[var(--foreground)] shadow">
            <MobileForm
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        }
      </header>
      <div className="
        hidden xl:flex flex-col absolute left-0 top-0 bottom-0 w-72 items-center
      ">
        <DesktopForm 
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <main className="flex flex-col gap-4 px-8 md:px-40 xl:px-100">
        <Display expression={response?.question} />
        <div className="grid gap-4">
          {response?.answers.map(item => <Answer expression={item.content} correct={item.correct} />)}
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
