export type PageTheme =
  | "light"
  | "dark";

export type FormData = {
  autoskip: boolean;
  autoskipDelay: number;
  queryParams: QueryParams;
};

export type QueryParams = {
  type: {
    limit: boolean;
    derivative: boolean;
    integral: boolean;
  };
  difficulty: {
    easy: boolean;
    medium: boolean;
    hard: boolean;
    legendary: boolean;
  };
};

export type Response = {
  question: Question;
  answers: Array<Answer>;
};

export type Question = {
  id: number;
  content: string;
};

export type Answer = {
  id: number;
  content: string;
  correct: boolean;
};

export type State = {
  pageTheme: PageTheme; /* stored in localStorage */
  formData: FormData; /* stored in localStorage */
  queryString: string;
  response: Response | null;
  mobileFormVisible: boolean;
  dialogVisible: boolean;
  skipButtonVisible: boolean;
  answerClicksBlocked: boolean;
  tutorialVisible: boolean;
};

export type Action =
  | { type: "UPDATE_PAGE_THEME"; payload: PageTheme }
  | { type: "UPDATE_FORM_DATA"; payload: FormData }
  | { type: "UPDATE_QUERY_STRING"; payload: string }
  | { type: "UPDATE_RESPONSE"; payload: Response }
  | { type: "TOGGLE_MOBILE_FORM" }
  | { type: "TOGGLE_DIALOG" }
  | { type: "TOGGLE_SKIP_BUTTON" }
  | { type: "TOGGLE_ANSWER_CLICKS" }
  | { type: "TOGGLE_TUTORIAL" };
