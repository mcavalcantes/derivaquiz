"use server";

export async function getRandomQuestion() {
  const typeQuery = `types=LIMIT&types=DERIVATIVE&types=INTEGRAL`;
  const difficultyQuery = `difficulties=EASY&difficulties=MEDIUM&difficulties=HARD&difficulties=LEGENDARY`;
  const URL = `http://localhost:3000/api?${typeQuery}&${difficultyQuery}`;

  const response = await fetch(URL);
  const data = await response.json();

  return data;
}
