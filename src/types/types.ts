export interface Answer {
  content: string;
  correct: boolean;
}

export interface Response {
  question: string;
  answers: Array<Answer>;
}
