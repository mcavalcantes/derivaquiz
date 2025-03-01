export interface UserPreferences {
  pageTheme: string;
  formData: FormData;
}

export interface FormData {
  autoskip: boolean;
  autoskipDelay: number;
  queryParams: QueryParams;
}

export interface QueryParams {
  limit: boolean;
  derivative: boolean;
  integral: boolean;
  easy: boolean;
  medium: boolean;
  hard: boolean;
  legendary: boolean;
}

export interface Response {
  question: Question;
  answers: Array<Answer>;
}

export interface Question {
  id: number;
  content: string;
}

export interface Answer {
  id: number;
  content: string;
  correct: boolean;
}
