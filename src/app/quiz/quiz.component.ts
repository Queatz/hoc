import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService, QuizItem } from '../api.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  item!: QuizItem
  index = 0

  answer = ''

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit(): void {
    this.item = this.api.activeQuiz!.items[0]
  }

  nextQuestionPlz(): void {
    if (this.item.answer !== this.answer) {
      alert('not right yet')
      return
    }

    if (this.index < this.api.activeQuiz!.items.length - 1) {
      this.item = this.api.activeQuiz!.items[++this.index]
      this.answer = ''
    } else {
      alert('ur done')
      this.router.navigate([ '/' ])
    }
  }

  leave(): void {
    this.router.navigate([ '/' ])
  }
}
