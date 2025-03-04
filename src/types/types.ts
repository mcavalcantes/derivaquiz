export type UserPreferences = {
  pageTheme: PageTheme;
  formData: FormData;
};

export type PageTheme = "light" | "dark";

export type FormData = {
  autoskip: boolean;
  autoskipDelay: number;
  queryParams: QueryParams;
};

export type QueryParams = {
  limit: boolean;
  derivative: boolean;
  integral: boolean;
  easy: boolean;
  medium: boolean;
  hard: boolean;
  legendary: boolean;
};

export type Response = {
  question: {
    id: number;
    content: string;
  };
  answers: Array<{
    id: number;
    content: string;
    correct: boolean;
  }>;
};

export type State = {
  userPreferences: UserPreferences;
  pageTheme: PageTheme;
  formData: FormData;
  queryString: string;
  response: Response | null;
  mobileFormVisible: boolean;
  dialogVisible: boolean;
};

export type Action =
  | { type: "LOAD_USER_PREFERENCES" }
  | { type: "UPDATE_PAGE_THEME"; payload: PageTheme }
  | { type: "UPDATE_FORM_DATA"; payload: FormData }
  | { type: "UPDATE_QUERY_STRING"; payload: string }
  | { type: "UPDATE_RESPONSE"; payload: Response | null }
  | { type: "TOGGLE_MOBILE_FORM" }
  | { type: "TOGGLE_DIALOG" };
