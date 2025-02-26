import { useState } from "react";
import { Display } from "./components/Display";
import { Answer } from "./components/Answer";
import { Sun } from "./icons/heroicons/Sun";
import { Moon } from "./icons/heroicons/Moon";
import { Github } from "./icons/iconmonstr/Github";
import { toggleTheme } from "./lib/toggleTheme";

export function App() {
  let storedTheme = localStorage.getItem("theme");

  if (!storedTheme) {
    storedTheme = "light";
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else if (storedTheme === "dark") {
    storedTheme = "dark";
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    storedTheme = "light";
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  const [theme, setTheme] = useState<string>(storedTheme);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-8 md:px-40 xl:px-100 flex items-center">
        <button
          onClick={() => toggleTheme(setTheme)}
          className="p-0.5 cursor-pointer border border-[var(--border)] rounded"
        >
          { theme === "dark" ? <Sun /> : <Moon /> }
        </button>
      </header>
      <main className="flex flex-col gap-4 px-8 md:px-40 xl:px-100">
        <Display expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
        <div className="grid gap-4">
          <Answer expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
          <Answer expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
          <Answer expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
        </div>
      </main>
      <footer className="mt-auto h-16 select-none flex items-center justify-center gap-2">
        <a
          href="mailto:matheuscavalcantes.mc@gmail.com"
          className="font-semibold text-sm underline underline-offset-2"
        >Contato</a>
        <p>{`|`}</p>
        <a
          href="https://github.com/mcavalcantes/derivaquiz"
          className="flex items-center gap-2 font-semibold text-sm underline underline-offset-2"
        ><Github /><p>Repositório</p></a>
      </footer>
    </div>
  );
}
