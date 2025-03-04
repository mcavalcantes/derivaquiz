import { State, Action } from '../types/types';
import { getToggledTheme } from '../lib/themeUtils';
import { createQueryString } from '../lib/createQueryString';

const defaultUserPreferences = {
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

export const initialState: State = {
  pageTheme: defaultUserPreferences.pageTheme,
  formData: defaultUserPreferences.formData,
  queryString: createQueryString(defaultUserPreferences.formData.queryParams),
  response: null,
  mobileFormVisible: false,
  dialogVisibile: false,
};

export function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      const newTheme = getToggledTheme(state.pageTheme);
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

    case 'TOGGLE_DIALOG': {
      return { ...state, dialogVisibile: !state.dialogVisibile };
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
      
    case 'MANUAL_SKIP': {
      // TODO this will be handled by an effect to clear timeouts and fetch a new question
      return state;
    }
      
    default: {
      return state;
    }
  }
}
