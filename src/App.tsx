import { useEffect, useState } from "react";

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

export function App() {
  function getUserPreferences(): UserPreferences {
    const stored = localStorage.getItem("userPreferences");

    if (stored) {
      return JSON.parse(stored);
    }

    return defaultUserPreferences;
  }

  const [userPreferences, setUserPreferences] = useState<UserPreferences>(getUserPreferences());
  const [pageTheme, setPageTheme] = useState<string>(userPreferences.pageTheme);
  const [formData, setFormData] = useState<FormData>(userPreferences.formData);
  const [queryString, setQueryString] = useState<string>(createQueryString(userPreferences.formData.queryParams));
  const [response, setResponse] = useState<Response | null>(null);
  const [mobileFormVisible, setMobileFormVisible] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify({
      pageTheme,
      formData,
    }));
  }, [pageTheme, formData]);

  useEffect(() => {
    if (userPreferences.pageTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    setQueryString(createQueryString(formData.queryParams));
  }, [formData]);

  useEffect(() => {
    refreshQuestion();
  }, []);

  async function refreshQuestion() {
    const json = await getQuestion(queryString);
    setResponse(json);
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
        <div className="fixed inset-0 bg-stone-900/80 z-100 xl:hidden flex items-center justify-center p-4">
          <div className="bg-[var(--foreground)] rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button 
                onClick={() => setMobileFormVisible(false)}
                className="px-2 py-1"
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
                className="px-4 py-2 border border-[var(--border)] rounded font-semibold"
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
                autoskipDelay={formData.autoskipDelay}
                refreshQuestion={refreshQuestion}
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
