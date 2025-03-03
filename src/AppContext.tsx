import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback
} from 'react';

import { State, Action } from './types/types';
import { appReducer, initialState } from './hooks/appReducer';
import { applyThemeToDOM } from './lib/themeUtils';
import { getQuestion } from './lib/getQuestion';

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
    applyThemeToDOM(state.pageTheme);
  }, [state.pageTheme]);
  
  useEffect(() => {
    refreshQuestion();
  }, [state.queryString]);
  
  useEffect(() => {
    const handleManualSkip = () => {
      const timeoutRefs = document.querySelectorAll('[data-timeout-ref]');
      timeoutRefs.forEach((btn) => {
        const timeoutId = parseInt(btn.getAttribute('data-timeout-ref') || '0');
        if (timeoutId) clearTimeout(timeoutId);
        btn.setAttribute('data-timeout-ref', '0');
      });
      
      refreshQuestion();
    };
    
    const manualSkipListener = (action: Action) => {
      if (action.type === 'MANUAL_SKIP') {
        handleManualSkip();
      }
    };
  }, []);
  
  const refreshQuestion = useCallback(async () => {
    try {
      const json = await getQuestion(state.queryString);
      dispatch({ type: 'SET_RESPONSE', payload: json });
    } catch (error) {
      // TODO
      console.error("Error fetching question:", error);
    }
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
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
