export type UserPreferences = {
  pageTheme: string;
  formData: FormData;
};

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
  pageTheme: string;
  formData: FormData;
  queryString: string;
  response: Response | null;
  mobileFormVisible: boolean;
};

export type Action =
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_FORM_DATA'; payload: FormData }
  | { type: 'SET_RESPONSE'; payload: Response | null }
  | { type: 'TOGGLE_MOBILE_FORM' }
  | { type: 'LOAD_PREFERENCES' }
  | { type: 'MANUAL_SKIP' };
