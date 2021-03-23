import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  quizzes: Array<Quiz> = []
  activeQuiz?: Quiz

  constructor() { }
}

export class Quiz {
  name!: string
  items!: Array<QuizItem>
}

export class QuizItem {
  question!: string
  answer!: string
}