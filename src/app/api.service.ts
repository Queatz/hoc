import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  quizzes: Array<Quiz> = []
  activeQuiz?: Quiz

  constructor() {
    this.load()
  }

  saveQuiz(quiz: Quiz) {
    this.quizzes.unshift(quiz)
    this.sync()
  }

  editQuiz(quiz: Quiz) {
    this.sync()
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1)
    this.sync()
  }

  load() {
    const db  = JSON.parse(localStorage.getItem('db') || 'null')

    if (db) {
      this.quizzes = db
    }
  }

  sync() {
    localStorage.setItem('db', JSON.stringify(this.quizzes))
  }
}

export class Quiz {
  name!: string
  items!: Array<QuizItem>
}

export class QuizItem {
  question!: string
  answer!: string
}