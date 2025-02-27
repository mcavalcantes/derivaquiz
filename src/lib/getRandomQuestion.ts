"use server";

export async function getRandomQuestion() {
  const response = await fetch("http://localhost:3000/api/random");
  const json = await response.json();

  return json;
}
