import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService, QuizItem } from '../api.service'

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  item!: QuizItem
  index = 0

  answer = ''

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit(): void {
    this.item = this.api.activeQuiz!.items[0]
  }

  nextQuestionPlz(): void {
    if (this.item.answer !== this.answer) {

      console.log(this.item.answer.length, this.answer.length)

      for(let i = 0; i < this.item.answer.length; i++) {
        console.log(this.item.answer.charAt(i), this.answer.charAt(i), this.item.answer.charAt(i) === this.answer.charAt(i))
      }

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
