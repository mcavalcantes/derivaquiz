import {
  AppProvider,
  useApp,
} from "@/AppContext";

import { Display } from "@/components/Display";
import { Answer } from "@/components/Answer";
import { Form } from "@/components/Form";

import { Sun } from "@/icons/heroicons/Sun";
import { Moon } from "@/icons/heroicons/Moon";
import { Cog } from "@/icons/heroicons/Cog";
import { Github } from "@/icons/iconmonstr/Github";

import { Transition } from "@headlessui/react";

function AppContent() {
  const { state, dispatch } = useApp();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-8 md:px-40 xl:px-100 flex items-center gap-2">
        <button
          onClick={() => dispatch({ type: "TOGGLE_MOBILE_FORM" })}
          className="xl:hidden p-0.5 z-50 cursor-pointer border border-[var(--border)] rounded"
        >
          <Cog />
        </button>
        <button
          onClick={() => dispatch({
            type: "UPDATE_PAGE_THEME",
            payload: state.pageTheme === "dark" ? "light" : "dark"
          })}
          className="p-0.5 z-50 cursor-pointer border border-[var(--border)] rounded"
        >
          {state.pageTheme === "dark" ? <Sun /> : <Moon />}
        </button>
      </header>

      <Transition show={state.mobileFormVisible}>
        <div className="
          fixed inset-0 bg-stone-900/90 z-100 xl:hidden flex items-center justify-center p-4
          data-[enter]:opacity-0 data-[leave]:opacity-0 transition
        ">
          <div className="bg-[var(--foreground)] rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Menu</h2>
              <button 
                onClick={() => dispatch({ type: "TOGGLE_MOBILE_FORM" })}
                className="cursor-pointer size-8 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <Form />
            
            <div className="flex justify-end">
              <button
                onClick={() => dispatch({ type: "TOGGLE_MOBILE_FORM" })}
                className="
                  cursor-pointer px-4 py-2 font-semibold border border-gray-300 shadow shadow-gray-300 hover:bg-gray-100 transition
                  dark:border-stone-400 dark:shadow-stone-900 dark:hover:bg-stone-600
                  rounded-lg flex items-center justify-center
                "
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Transition>
      
      <div className="absolute left-0 top-0 bottom-0 hidden xl:flex flex-col items-center w-100">
        <Form />
      </div>
      
      <main className="flex flex-col gap-4 px-8 md:px-40 xl:px-100">
        <Display content={state.response?.question.content} />
        <ul className="grid gap-4">
          {state.response?.answers.map(item => (
            <li key={item.id}>
              <Answer
                content={item.content}
                correct={item.correct}
              />
            </li>
          ))}
        </ul>
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

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
