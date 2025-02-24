import { Display } from "./components/Display";
import { Answer } from "./components/Answer";
import { Github } from "./icons/iconmonstr/Github";

export function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header></header>
      <main className="flex flex-col gap-4 px-8 md:px-40 xl:px-100">
        <Display expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
        <div className="grid gap-4">
          <Answer expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
          <Answer expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
          <Answer expression="\displaystyle{f(x) = x^2 + e^x - \sqrt{x}} + \frac{1}{\ln{x}}" />
        </div>
      </main>
      <footer className="h-16 select-none flex items-center justify-center gap-2">
        <a
          href="mailto:matheuscavalcantes.mc@gmail.com"
          className="font-semibold text-sm underline underline-offset-2"
        >
          Contato
        </a>
        <p>|</p>
        <a
          href="https://github.com/mcavalcantes/derivaquiz"
          className="flex items-center gap-2 font-semibold text-sm underline underline-offset-2"
        >
          <Github />
          <p>Repositório</p>
        </a>
      </footer>
    </div>
  );
}
