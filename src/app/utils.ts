import { QuizItem } from "./api.service"

export function shuffle(array: Array<QuizItem>): Array<QuizItem> {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}