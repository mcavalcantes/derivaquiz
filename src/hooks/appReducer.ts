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

export const defaultInitialState: State = {
  userPreferences: defaultUserPreferences,
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
          userPreferences: userPreferences,
          pageTheme: userPreferences.pageTheme,
          formData: userPreferences.formData,
        };
      }

      return state;
    }

    case "UPDATE_USER_PREFERENCES": {
      const newUserPreferences = action.payload;
      return {
        ...state,
        userPreferences: newUserPreferences,
        pageTheme: newUserPreferences.pageTheme,
        formData: newUserPreferences.formData,
      };
    }

    case "TOGGLE_PAGE_THEME": {
      const newPageTheme = (state.pageTheme === "dark") ? "light" : "dark";
      return {
        ...state,
        pageTheme: newPageTheme,
      };
    }

    case "UPDATE_FORM_DATA": {
      const newFormData = action.payload;
      return {
        ...state,
        formData: newFormData,
      };
    }

    case "UPDATE_QUERY_STRING": {
      const newQueryString = action.payload;
      return {
        ...state,
        queryString: newQueryString,
      }
    }

    case "UPDATE_RESPONSE": {
      const newResponse = action.payload;
      return {
        ...state,
        response: newResponse,
      };
    }

    case "TOGGLE_MOBILE_FORM": {
      return {
        ...state,
        mobileFormVisible: !state.mobileFormVisible,
      };
    }

    case "TOGGLE_DIALOG": {
      return {
        ...state,
        dialogVisible: !state.dialogVisible,
      };
    }

    default: {
      return state;
    }
  }
}
