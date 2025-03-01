export interface Answer {
  content: string;
  correct: boolean;
}

export interface Response {
  question: string;
  answers: Array<Answer>;
}

export interface FormData {
  params: {
    limit: boolean,
    derivative: boolean,
    integral: boolean,
    easy: boolean,
    medium: boolean,
    hard: boolean,
    legendary: boolean,
  };
  autoskip: boolean;
  autoskipDelay: number;
}
