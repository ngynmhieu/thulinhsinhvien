import { readData } from "./firebase";

export async function getQuestionBank() {
  try {
    return await readData("questionBank");
  } catch (error) {
    console.error("Error fetching question bank: ", error);
    return [];
  }
}

export async function getQuestionByIndex(index) {
  return getQuestionBank().then((questionBank) => questionBank[index]);
}
