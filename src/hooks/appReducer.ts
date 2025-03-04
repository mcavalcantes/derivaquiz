import type {
  UserPreferences,
  PageTheme,
  FormData,
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

      return {
        ...state,
        userPreferences: defaultUserPreferences,
        pageTheme: defaultUserPreferences.pageTheme,
        formData: defaultUserPreferences.formData,
      };
    }

    case "UPDATE_PAGE_THEME": {
      const newPageTheme: PageTheme = action.payload;

      const stored = localStorage.getItem("userPreferences")!;
      const userPreferences: UserPreferences = JSON.parse(stored);

      const newUserPreferences: UserPreferences = {
        ...userPreferences,
        pageTheme: newPageTheme,
      };

      localStorage.setItem("userPreferences", JSON.stringify(newUserPreferences));
      if (newPageTheme === "dark")  {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return {
        ...state,
        userPreferences: newUserPreferences,
        pageTheme: newPageTheme,
      };
    }

    case "UPDATE_FORM_DATA": {
      const newFormData: FormData = action.payload;
      const newQueryString: string = createQueryString(newFormData.queryParams);

      const stored = localStorage.getItem("userPreferences")!;

      const userPreferences: UserPreferences = JSON.parse(stored);
      const newUserPreferences: UserPreferences = {
        ...userPreferences,
        formData: newFormData,
      };

      localStorage.setItem("userPreferences", JSON.stringify(newUserPreferences));

      return {
        ...state,
        userPreferences: newUserPreferences,
        formData: newFormData,
        queryString: newQueryString,
      };
    }

    case "UPDATE_QUERY_STRING": {
      return { ...state, queryString: action.payload }
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
