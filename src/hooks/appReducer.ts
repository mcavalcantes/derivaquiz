import type {
  UserPreferences,
  State,
  Action,
} from "@/types/types";
import { createQueryString } from "@/lib/createQueryString";

export const defaultUserPreferences: UserPreferences = {
  pageTheme: "light",
  formData: {
    autoskip: true,
    autoskipDelay: 2000,
    queryParams: {
      type: {
        limit: true,
        derivative: true,
        integral: true,
      },
      difficulty: {
        easy: true,
        medium: true,
        hard: false,
        legendary: false,
      },
    },
  },
};

export const defaultInitialState: State = {
  pageTheme: defaultUserPreferences.pageTheme,
  formData: defaultUserPreferences.formData,
  queryString: createQueryString(defaultUserPreferences.formData.queryParams),
  response: null,
  mobileFormVisible: false,
  dialogVisible: false,
};

export function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_USER_PREFERENCES": {
      const stored = localStorage.getItem("userPreferences");

      if (stored) {
        const userPreferences: UserPreferences = JSON.parse(stored);
        return {
          ...state,
          pageTheme: userPreferences.pageTheme,
          formData: userPreferences.formData,
        };
      }

      return {
        ...state,
        pageTheme: defaultUserPreferences.pageTheme,
        formData: defaultUserPreferences.formData,
      };
    }

    case "UPDATE_PAGE_THEME": {
      return {
        ...state,
        pageTheme: action.payload,
      };
    }

    case "UPDATE_FORM_DATA": {
      return {
        ...state,
        formData: action.payload,
      };
    }

    case "UPDATE_QUERY_STRING": {
      return { ...state, queryString: action.payload };
    }

    case "UPDATE_RESPONSE": {
      return { ...state, response: action.payload };
    }

    case "TOGGLE_MOBILE_FORM": {
      return { ...state, mobileFormVisible: !state.mobileFormVisible };
    }

    case "TOGGLE_DIALOG": {
      return { ...state, dialogVisible: !state.dialogVisible };
    }

    default: {
      return state;
    }
  }
}
