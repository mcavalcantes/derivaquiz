import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  appReducer,
  defaultInitialState,
} from "@/hooks/appReducer";

import { createQueryString } from "@/lib/createQueryString";
import { getQuestion } from "@/lib/getQuestion";

import type {
  PageTheme,
  FormData,
  State,
  Action,
} from "@/types/types";

type AppContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  refreshQuestion: () => Promise<void>;
  handleAnswerClick: (
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    timeoutRef: React.RefObject<number | null>,
    correct: boolean,
  ) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, defaultInitialState);

  useEffect(() => {
    const storedPageTheme = localStorage.getItem("pageTheme");
    const pageTheme: PageTheme = JSON.parse(storedPageTheme || JSON.stringify(state.pageTheme));

    if (pageTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("pageTheme", JSON.stringify(pageTheme));
    dispatch({ type: "UPDATE_PAGE_THEME", payload: pageTheme });

    const storedFormData = localStorage.getItem("formData");
    const formData: FormData = JSON.parse(storedFormData || JSON.stringify(state.formData));

    localStorage.setItem("formData", JSON.stringify(formData));
    dispatch({ type: "UPDATE_FORM_DATA", payload: formData });
  }, []);

  useEffect(() => {
    if (state.pageTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("pageTheme", JSON.stringify(state.pageTheme));
  }, [state.pageTheme]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(state.formData));
  }, [state.formData]);

  useEffect(() => {
    const initialize = async () => {
      const json = await getQuestion(state.queryString);
      dispatch({ type: "UPDATE_RESPONSE", payload: json });
    }

    initialize();
  }, []);
  
  const refreshQuestion = useCallback(async () => {
    const json = await getQuestion(state.queryString);
    dispatch({ type: "UPDATE_RESPONSE", payload: json });
  }, [state.queryString]);
  
  const handleAnswerClick = useCallback(async (
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    timeoutRef: React.RefObject<number | null>,
    correct: boolean,
  ) => {
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

    if (state.formData.autoskip) {
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
      }, state.formData.autoskipDelay);
      
      if (btn && timeoutRef.current) {
        btn.setAttribute('data-timeout-ref', timeoutRef.current.toString());
      }
    }
  }, [state.formData.autoskip, state.formData.autoskipDelay, refreshQuestion]);
  
  return (
    <AppContext.Provider value={{ state, dispatch, refreshQuestion, handleAnswerClick }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(`'useApp' deve ser usado somente dentro do 'AppProvider'`);
  }
  
  return context;
}
