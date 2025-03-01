export interface Answer {
  id: number;
  content: string;
  correct: boolean;
}

export interface Response {
  question: string;
  answers: Array<Answer>;
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

export interface FormData {
  params: QueryParams;
  autoskip: boolean;
  autoskipDelay: number;
}
