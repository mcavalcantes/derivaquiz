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

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { QuestionMark } from "@/icons/heroicons/QuestionMark";

function AppContent() {
  const { state, dispatch, manualSkip } = useApp();
  
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
        <button
          onClick={() => dispatch({ type: "TOGGLE_TUTORIAL" })}
          className="flex items-center z-50 cursor-pointer border border-[var(--border)] rounded py-0.5 px-1 gap-1"
        >
          <QuestionMark />
          <p>Como jogar</p>
        </button>
      </header>

      <Dialog
        open={state.dialogVisible}
        onClose={() => dispatch({ type: "TOGGLE_DIALOG" })}
        className="relative z-100 outline-none"
      >
        <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
          <DialogBackdrop
            transition
            className="z-50 fixed inset-0 transition data-[closed]:opacity-0 bg-gray-800/80 dark:bg-stone-900/90"
          />
          <div className="transition flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="
                z-100 w-full max-w-md rounded-xl bg-gray-100 dark:bg-stone-700 p-8
                transition duration-200 data-[closed]:transform-[scale(90%)] data-[closed]:opacity-0
              "
            >
              <DialogTitle className="mb-2 font-semibold text-xl text-[var(--text)]">
                Aviso
              </DialogTitle>
              <p className="mb-8 text-sm text-[var(--text)]">
                Selecione pelo menos uma opção.
              </p>
              <div className="flex items-center">
                <button
                  onClick={() => dispatch({ type: "TOGGLE_DIALOG" })}
                  className="
                    cursor-pointer bg-gray-700 hover:bg-gray-600 dark:bg-stone-300 dark:hover:bg-stone-200
                    transition rounded shadow px-3 py-1.5 font-semibold text-sm text-[var(--background)]
                    focus:outline-none
                  "
                >
                  Entendi
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Transition show={state.tutorialVisible}>
        <div className="
          fixed inset-0 bg-gray-800/80 dark:bg-stone-900/90 p-8 z-100
          flex items-center justify-center data-[enter]:opacity-0 data-[leave]:opacity-0 transition
        ">
          <div className="bg-[var(--foreground)] flex flex-col gap-4 rounded-lg p-4 w-full max-w-md xl:max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Como jogar</h2>
              <button 
                onClick={() => dispatch({ type: "TOGGLE_TUTORIAL" })}
                className="cursor-pointer size-8 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-4 select-none">
              <h3 className="font-semibold">Bem-vindo(a) ao DerivaQuiz, sua ferramenta de estudos para cálculo!</h3>
              <p>
                O jogo é simples: responda à questão exibida na tela principal clicando em uma das três respostas
                que aparecem logo abaixo. Cada questão pode ser um limite, uma derivada, ou integral (você que escolhe!)
              </p>

              <p>
                Dessa forma, você consegue aprender como resolvê-los de forma rápida e eficiente, algo que te ajuda
                na hora de fazer provas ou outros problemas que exigem o cálculo de limites, derivadas, e integrais.
              </p>

              <p>
                Personalize seu estudo através do menu ao lado da página (ou clicando em <Cog className="size-6 inline" /> caso esteja no celular)
              </p>

              <p>
                Após responder a questão, um feedback visual surgirá para averiguar sua
                resposta: verde para correta, vermelho para incorreta. Desative a funcionalidade
                "avançar automaticamente" caso queira avanço manual após responder.
              </p>

              <h3 className="font-semibold">Dificuldades</h3>
              <ul className="flex flex-col gap-1 list-disc list-inside pl-2">
                <li>Fáceis: problemas simples que testam as bases do seu entendimento sobre o assunto</li>
                <li>Médias: questões que misturam conceitos e envolvem regras diferentes para serem resolvidas</li>
                <li>Difíceis: costumam levar mais de uma tentativa para acertá-las, resolver a maioria dessas vai te deixar preparado pra qualquer prova</li>
                <li>Lendárias: questões bem difíceis ou trabalhosas, que geralmente demoram pra sair ou dependem de uma sacada especial</li>
              </ul>

              <h3 className="font-semibold">Sobre</h3>
              <p>
                Atualmente, o banco de dados tem uma quantidade de questões e funcionalidades limitadas,
                porque <span className="line-through">sou preguiçoso msm</span> ando meio sem tempo ultimamente.
                Fiz esse aplicativo nessas últimas férias pra passar tempo. 
              </p>
              <p>
                Sinta-se livre para <a
                  href="mailto:matheuscavalcante@alunos.utfpr.edu.br" className="underline underline-offset-2 text-blue-600 dark:text-blue-400"
                >
                  sugerir ideias
                </a>
                , novas questões, ou mesmo contribuir diretamente, há um link do repositório ali no rodapé da página.
              </p>
            </div>

            
            <div className="flex justify-end">
              <button
                onClick={() => dispatch({ type: "TOGGLE_TUTORIAL" })}
                className="
                  cursor-pointer px-4 py-2 font-semibold border border-gray-300 shadow shadow-gray-300 hover:bg-gray-100 transition
                  dark:border-stone-400 dark:shadow-stone-900 dark:hover:bg-stone-600
                  rounded-lg flex items-center justify-center
                "
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition show={state.mobileFormVisible}>
        <div className="
          fixed inset-0 bg-gray-800/80 dark:bg-stone-900/90 p-8 z-100 xl:hidden
          flex items-center justify-center data-[enter]:opacity-0 data-[leave]:opacity-0 transition
        ">
          <div className="bg-[var(--foreground)] flex flex-col gap-4 rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
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
      
      <main className="flex flex-col gap-2 px-8 md:px-40 xl:px-100">
        <Display content={state.response?.question.content} />
        <div className="flex items-center justify-end h-8">
          <Transition show={state.skipButtonVisible}>
            <button
              onClick={manualSkip}
              className="
                transition ease-out duration-50 data-[enter]:opacity-0 data-[leave]:opacity-0
                select-none cursor-pointer text-sm font-semibold rounded-md
                bg-[var(--foreground)] border border-[var(--border)]
                flex items-center justify-center gap-0.5 h-8 w-24
            ">
              <p>Próxima</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </Transition>
        </div>
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
      
      <footer className="mt-auto h-12 select-none flex items-center justify-center gap-1 text-xs font-semibold">
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
