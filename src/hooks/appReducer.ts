import type {
  PageTheme,
  FormData,
  State,
  Action,
} from "@/types/types";
import { createQueryString } from "@/lib/createQueryString";

export const defaultSettings: {
  pageTheme: PageTheme,
  formData: FormData,
} = {
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
  pageTheme: defaultSettings.pageTheme,
  formData: defaultSettings.formData,
  queryString: createQueryString(defaultSettings.formData.queryParams),
  response: null,
  mobileFormVisible: false,
  dialogVisible: false,
  skipButtonVisible: false,
};

export function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_PAGE_THEME": {
      return { ...state, pageTheme: action.payload };
    }

    case "UPDATE_FORM_DATA": {
      return { ...state, formData: action.payload };
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

    case "TOGGLE_SKIP_BUTTON": {
      return { ...state, skipButtonVisible: !state.skipButtonVisible };
    }

    default: {
      return state;
    }
  }
}
