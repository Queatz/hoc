import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  quizzesObservable = new BehaviorSubject<Array<Quiz>>([])
  quizzes: Array<Quiz> = []
  activeQuiz?: Quiz
  activeOptions?: { exam: boolean }
  failedItems: Array<QuizItem> = []

  constructor() {
    this.load()
  }

  setQuiz(quiz: Quiz, options?: { exam: boolean }): void {
    this.activeQuiz = quiz
    this.activeOptions = options
    this.failedItems = []
  }


  markFailed(item: QuizItem): void {
    this.failedItems.push(item)
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
 
    this.quizzesObservable.next(this.quizzes)
  }

  sync() {
    this.quizzesObservable.next(this.quizzes)
    localStorage.setItem('db', JSON.stringify(this.quizzes))
  }
}

export class Quiz {
  name!: string
  items!: Array<QuizItem>
  active = false
}

export class QuizItem {
  question!: string
  answer!: string
}