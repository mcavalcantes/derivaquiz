import { useCallback, useEffect, useState } from "react";

import { Display } from "./components/Display";
import { Answer } from "./components/Answer";
import { Form } from "./components/Form";
import { DesktopForm } from "./components/DesktopForm";

import { Cog } from "./icons/heroicons/Cog";
import { Sun } from "./icons/heroicons/Sun";
import { Moon } from "./icons/heroicons/Moon";
import { Github } from "./icons/iconmonstr/Github";

import { getQuestion } from "./lib/getQuestion";
import { togglePageTheme } from "./lib/togglePageTheme";
import { createQueryString } from "./lib/createQueryString";
import type {
  Response,
  UserPreferences,
  FormData,
} from "./types/types";

export function App() {
  const userPreferences: UserPreferences = JSON.parse(localStorage.getItem("userPreferences")!);

  const [pageTheme, setPageTheme] = useState<string>(userPreferences.pageTheme);
  const [formData, setFormData] = useState<FormData>(userPreferences.formData);
  const [queryString, setQueryString] = useState<string>(createQueryString(userPreferences.formData.queryParams));
  const [response, setResponse] = useState<Response | null>(null);

  async function refreshQuestion() {
    const json = await getQuestion(queryString);
    setResponse(json);
  }

  useEffect(() => {
    refreshQuestion();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-8 md:px-40 xl:px-100 flex items-center gap-2">
        {/* <button
          onClick={() => setDropdown(!dropdown)}
          className="xl:hidden z-100 p-0.5 cursor-pointer border border-[var(--border)] rounded"
        ><Cog /></button> */}
        <button
          onClick={() => togglePageTheme(setPageTheme)}
          className="p-0.5 z-100 cursor-pointer border border-[var(--border)] rounded"
        >{pageTheme === "dark" ? <Sun /> : <Moon />}</button>
        {/* {dropdown &&
          <div className="xl:hidden z-50 absolute left-0 right-0 top-16 px-8 md:px-40 bg-[var(--foreground)] shadow">
            <Form
              formData={formData}
              setFormData={setFormData}
              setQueryString={setQueryString}
            />
          </div>
        } */}
      </header>
      <div className="absolute left-0 top-0 bottom-0 hidden xl:flex flex-col items-center w-100">
        <DesktopForm 
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
