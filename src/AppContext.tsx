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
  manualSkip: () => Promise<void>;
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
    const initializeFromLocalStorage = () => {
      const storedPageTheme = localStorage.getItem("pageTheme");
      const storedFormData = localStorage.getItem("formData");
      
      const newState = { ...state };
      
      if (storedPageTheme) {
        const pageTheme: PageTheme = JSON.parse(storedPageTheme);
        newState.pageTheme = pageTheme;
        dispatch({ type: "UPDATE_PAGE_THEME", payload: pageTheme });
      } else {
        localStorage.setItem("pageTheme", JSON.stringify(state.pageTheme));
      }
  
      if (storedFormData) {
        const formData: FormData = JSON.parse(storedFormData);
        newState.formData = formData;
        
        const queryString = createQueryString(formData.queryParams);
        newState.queryString = queryString;
        
        dispatch({ type: "UPDATE_FORM_DATA", payload: formData });
        dispatch({ type: "UPDATE_QUERY_STRING", payload: queryString });
      } else {
        localStorage.setItem("formData", JSON.stringify(state.formData));
      }

      if (!storedPageTheme || !storedFormData) {
        dispatch({ type: "TOGGLE_TUTORIAL" });
      }
      
      return newState.queryString;
    };
  
    const queryString = initializeFromLocalStorage();
    
    const initialize = async () => {
      const json = await getQuestion(queryString);
      dispatch({ type: "UPDATE_RESPONSE", payload: json });
    };
    
    initialize();
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

    const queryString: string = createQueryString(state.formData.queryParams);
    dispatch({ type: "UPDATE_QUERY_STRING", payload: queryString });
  }, [state.formData]);

  function updateButtonStyles(button: HTMLButtonElement, correct: boolean) {
    button.classList.remove("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
  
    if (correct) {
      button.classList.add(
        "border-[var(--feedback-correct)]",
        "ring-2",
        "ring-[var(--feedback-correct)]",
        "shadow-[inset_0_0_0_1px_rgba(48,240,48,0.8)]",
      );
    } else {
      button.classList.add(
        "border-[var(--feedback-incorrect)]",
        "ring-2",
        "ring-[var(--feedback-incorrect)]",
        "shadow-[inset_0_0_0_1px_rgba(240,68,68,0.8)]",
      );
    }
  }
  
  function resetButtonStyles(button: HTMLButtonElement) {
    button.classList.remove(
      "border-[var(--feedback-correct)]",
      "border-[var(--feedback-incorrect)]",
      "ring-2",
      "ring-[var(--feedback-correct)]",
      "ring-[var(--feedback-incorrect)]",
      "shadow-[inset_0_0_0_1px_rgba(48,240,48,0.8)]",
      "shadow-[inset_0_0_0_1px_rgba(240,68,68,0.8)]",
    );
    button.classList.add("border-[var(--border)]", "hover:ring", "ring-[var(--ring)]");
  }

  const refreshQuestion = useCallback(async () => {
    const json = await getQuestion(state.queryString);
    dispatch({ type: "UPDATE_RESPONSE", payload: json });
  }, [state.queryString]);

  const manualSkip = useCallback(async () => {
    document.querySelectorAll(".answer-button").forEach(btn => {
      resetButtonStyles(btn as HTMLButtonElement);
    });

    await refreshQuestion();
    dispatch({ type: "TOGGLE_SKIP_BUTTON" });
  }, [refreshQuestion]);
  
  const handleAnswerClick = useCallback(async (
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    timeoutRef: React.RefObject<number | null>,
    correct: boolean,
  ) => {
    const btn = buttonRef.current as HTMLButtonElement;
    if (!btn) return;

    // dispatch({ type: "TOGGLE_ANSWER_CLICKS" });

    updateButtonStyles(btn, correct);

    if (state.formData.autoskip) {
      dispatch({ type: "TOGGLE_ANSWER_CLICKS" });

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(async () => {
        if (buttonRef.current) {
          resetButtonStyles(buttonRef.current);
        }
        
        await refreshQuestion();
        dispatch({ type: "TOGGLE_ANSWER_CLICKS" });
        timeoutRef.current = null;
      }, state.formData.autoskipDelay);
    } else {
      if (!state.skipButtonVisible) {
        dispatch({ type: "TOGGLE_SKIP_BUTTON" });
      }
    }
  }, [state.formData.autoskip, state.formData.autoskipDelay, state.skipButtonVisible, refreshQuestion]);
  
  return (
    <AppContext.Provider value={{ state, dispatch, refreshQuestion, manualSkip, handleAnswerClick }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`'useApp' deve ser usado somente dentro do 'AppProvider'`);
  }
  
  return context;
}
