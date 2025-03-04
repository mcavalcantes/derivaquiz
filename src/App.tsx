import { AppProvider, useApp } from './AppContext';
import { Display } from './components/Display';
import { Answer } from './components/Answer';
import { Form } from './components/Form';
import { Sun } from './icons/heroicons/Sun';
import { Moon } from './icons/heroicons/Moon';
import { Cog } from './icons/heroicons/Cog';
import { Github } from './icons/iconmonstr/Github';
import {
  Description,
  Dialog,
  DialogPanel, 
  DialogTitle,
  Transition,
} from '@headlessui/react';


function AppContent() {
  const { state, dispatch, handleAnswerClick } = useApp();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-8 md:px-40 xl:px-100 flex items-center gap-2">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_MOBILE_FORM' })}
          className="xl:hidden p-0.5 z-50 cursor-pointer border border-[var(--border)] rounded"
          aria-label="Alternar visibilidade do menu"
        >
          <Cog />
        </button>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          className="p-0.5 z-50 cursor-pointer border border-[var(--border)] rounded"
          aria-label={state.pageTheme === "dark" ? "Trocar para o modo claro" : "Trocar para o modo escuro"}
        >
          {state.pageTheme === "dark" ? <Sun /> : <Moon />}
        </button>
        
        {/* TODO add manual skip button */}
        <button
          onClick={() => dispatch({ type: 'MANUAL_SKIP' })}
          className="p-2 z-50 cursor-pointer border border-[var(--border)] rounded ml-auto"
          aria-label="Skip to next question"
        >
          Skip
        </button>
      </header>

      <Dialog open={state.dialogVisibile} onClose={() => dispatch({ type: 'TOGGLE_DIALOG' })} className="relative z-100">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}>Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Transition show={state.mobileFormVisible}>
        <div className="
          fixed inset-0 bg-stone-900/90 z-100 xl:hidden flex items-center justify-center p-4
          data-[enter]:opacity-0 data-[leave]:opacity-0 transition
        ">
          <div className="bg-[var(--foreground)] rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_MOBILE_FORM' })}
                className="cursor-pointer size-8 flex items-center justify-center"
                aria-label="Fechar menu"
              >
                ✕
              </button>
            </div>
            
            <Form />
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_MOBILE_FORM' })}
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
                handleClick={handleAnswerClick}
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
