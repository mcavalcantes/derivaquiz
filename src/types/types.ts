export interface Object {
  question: string;
  answers: Array<{
    content: string;
    correct: boolean;
  }>;
}
