import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService, Quiz, QuizItem } from '../api.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  newQuiz = ''

  constructor(
    public api: ApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  startQuiz(quiz: Quiz): void {
    this.api.activeQuiz = quiz
    this.router.navigate([ '/quiz' ])
  }

  practiceQuiz(quiz: Quiz): void {
    this.api.activeQuiz = quiz
    this.router.navigate([ '/practice' ])
  }

  deleteQuiz(quiz: Quiz): void {
    if (prompt('Delete this quiz?')) {
      this.api.deleteQuiz(quiz)
    }
  }

  createQuiz(csv: string): void {
    const items = csv.split('\n').filter(x => !!x).map(line => {
      const [ answer, question ] = line.split('\t').map(x => x.trim().replace(/\s+/g, ' '))
      
      if (!answer || !question) {
        return
      }

      return {
        question,
        answer
      } as QuizItem
    }).filter(x => !!x)
      
    if (!items.length) {
      alert('Could not create quiz.')
      return
    }

    this.newQuiz = ''

    const show = 5
    const name = items.map(x => x!.question).slice(0, show).map(x => x.length > 20 ? `${x.slice(0, 20)}…` : x).join(', ') + (items.length > show ? `, … (${items.length - show} more)` : '')

    this.api.saveQuiz({
      items,
      name
    } as Quiz)
  }

  onTab(textarea: HTMLTextAreaElement, e: KeyboardEvent): void {
    if (e.key == 'Tab') {
      e.preventDefault()
      textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd)
      textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1
    }
  }
}
