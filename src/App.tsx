import { useEffect, useReducer } from "react";

import { Display } from "./components/Display";
import { Answer } from "./components/Answer";
import { Form } from "./components/Form";

import { Sun } from "./icons/heroicons/Sun";
import { Moon } from "./icons/heroicons/Moon";
import { Cog } from "./icons/heroicons/Cog";
import { Github } from "./icons/iconmonstr/Github";

import { getQuestion } from "./lib/getQuestion";
import { togglePageTheme } from "./lib/togglePageTheme";
import { createQueryString } from "./lib/createQueryString";

import type {
  Response,
  UserPreferences,
  FormData,
} from "./types/types";

type Action = 
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_FORM_DATA', payload: FormData }
  | { type: 'SET_RESPONSE', payload: Response | null }
  | { type: 'TOGGLE_MOBILE_FORM' }
  | { type: 'LOAD_PREFERENCES' };

type State = {
  pageTheme: string;
  formData: FormData;
  queryString: string;
  response: Response | null;
  mobileFormVisible: boolean;
};

const defaultUserPreferences: UserPreferences = {
  pageTheme: "light",
  formData: {
    autoskip: true,
    autoskipDelay: 2000,
    queryParams: {
      limit: true,
      derivative: true, 
      integral: true,
      easy: true,
      medium: true,
      hard: false,
      legendary: false,
    },
  },
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      const newTheme = state.pageTheme === 'light' ? 'dark' : 'light';
      return { ...state, pageTheme: newTheme };
    }
      
    case 'UPDATE_FORM_DATA': {
      const newFormData = action.payload;
      const newQueryString = createQueryString(newFormData.queryParams);
      return { ...state, formData: newFormData, queryString: newQueryString };
    }
      
    case 'SET_RESPONSE': {
      return { ...state, response: action.payload };
    }
      
    case 'TOGGLE_MOBILE_FORM': {
      return { ...state, mobileFormVisible: !state.mobileFormVisible };
    }
      
    case 'LOAD_PREFERENCES': {
      const stored = localStorage.getItem("userPreferences");
      if (stored) {
        const prefs = JSON.parse(stored);
        return {
          ...state,
          pageTheme: prefs.pageTheme,
          formData: prefs.formData,
          queryString: createQueryString(prefs.formData.queryParams)
        };
      }
      return state;
    }
      
    default:
      return state;
  }
}

export function App() {
  const initialState: State = {
    pageTheme: 'light',
    formData: defaultUserPreferences.formData,
    queryString: createQueryString(defaultUserPreferences.formData.queryParams),
    response: null,
    mobileFormVisible: false
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_PREFERENCES' });
  }, []);

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify({
      pageTheme: state.pageTheme,
      formData: state.formData,
    }));
  }, [state.pageTheme, state.formData]);

  useEffect(() => {
    if (state.pageTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.pageTheme]);

  useEffect(() => {
    refreshQuestion();
  }, [state.queryString]);

  function getUserPreferences(): UserPreferences {
    const stored = localStorage.getItem("userPreferences");

    if (stored) {
      return JSON.parse(stored);
    }

    return defaultUserPreferences;
  }

  async function refreshQuestion() {
    try {
      const json = await getQuestion(state.queryString);
      dispatch({ type: 'SET_RESPONSE', payload: json });
    } catch (error) {
      // TODO implement
      console.log(error);
    }
  }

  async function handleClick(
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    timeoutRef: React.RefObject<number | null>,
    correct: boolean,
  ) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    const btn = buttonRef.current as HTMLButtonElement;
    if (!btn) return;

    btn.classList.remove("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
  
    if (correct) {
      btn.classList.add("border-[var(--feedback-correct)]", "ring-2", "ring-[var(--feedback-correct)]");
    } else {
      btn.classList.add("border-[var(--feedback-incorrect)]", "ring-2", "ring-[var(--feedback-incorrect)]");
    }

    timeoutRef.current = window.setTimeout(async () => {
      if (buttonRef.current) {
        if (correct) {
          buttonRef.current.classList.remove("border-[var(--feedback-correct)]", "ring-2", "ring-[var(--feedback-correct)]");
        } else {
          buttonRef.current.classList.remove("border-[var(--feedback-incorrect)]", "ring-2", "ring-[var(--feedback-incorrect)]");
        }

        buttonRef.current.classList.add("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
      }
      await refreshQuestion();
      timeoutRef.current = null;
    }, formData.autoskipDelay);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-8 md:px-40 xl:px-100 flex items-center gap-2">
        <button
            onClick={() => setMobileFormVisible(prev => !prev)}
            className="xl:hidden p-0.5 z-50 cursor-pointer border border-[var(--border)] rounded"
            aria-label="Alternar visibilidade do menu"
          >
          <Cog />
        </button>
        <button
          onClick={() => togglePageTheme(setPageTheme)}
          className="p-0.5 z-50 cursor-pointer border border-[var(--border)] rounded"
          aria-label={pageTheme === "dark" ? "Trocar para o modo claro" : "Trocar para o modo escuro"}
        >
          {pageTheme === "dark" ? <Sun /> : <Moon />}
        </button>
      </header>
      {mobileFormVisible && (
        <div className="fixed inset-0 bg-stone-900/90 z-100 xl:hidden flex items-center justify-center p-4">
          <div className="bg-[var(--foreground)] rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button 
                onClick={() => setMobileFormVisible(false)}
                className="cursor-pointer size-8 flex items-center justify-center"
                aria-label="Fechar menu"
              >
                ✕
              </button>
            </div>
            
            <Form
              formData={formData}
              setFormData={setFormData}
              setQueryString={setQueryString}
            />
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setMobileFormVisible(false)}
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
      )}
      <div className="absolute left-0 top-0 bottom-0 hidden xl:flex flex-col items-center w-100">
        <Form
          formData={formData}
          setFormData={setFormData}
          setQueryString={setQueryString}
        />
      </div>
      <main className="flex flex-col gap-4 px-8 md:px-40 xl:px-100">
        <Display content={response?.question.content} />
        <ul className="grid gap-4">
          {response?.answers.map(item => (
            <li key={item.id}>
              <Answer
                content={item.content}
                correct={item.correct}
                handleClick={handleClick}
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
