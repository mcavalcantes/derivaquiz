import { Github } from "./icons/iconmonstr/Github";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header></header>
      <main className="debug px-8">
        {/* display */}
        {/* div c/ 3 answers */}
      </main>
      <footer className="h-12 mt-auto select-none flex items-center justify-center gap-2">
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
