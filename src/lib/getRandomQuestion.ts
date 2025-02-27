"use server";

export async function getRandomQuestion() {
  const typeQuery = `type=LIMIT&type=DERIVATIVE&type=INTEGRAL`;
  const difficultyQuery = `difficulty=EASY&difficulty=MEDIUM&difficulty=HARD&difficulty=LEGENDARY`;
  const URL = `http://localhost:3000/api/get?${typeQuery}&${difficultyQuery}`;

  const response = await fetch(URL);
  const data = await response.json();

  return data;
}
