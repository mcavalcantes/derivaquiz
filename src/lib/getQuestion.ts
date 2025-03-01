"use server";

export async function getQuestion(queryString: string) {
  const response = await fetch(`http://localhost:3000/api/get?${queryString}`);
  const json = await response.json();

  return json;
}
