import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService, QuizItem } from '../api.service'

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit, AfterViewInit {

  item!: QuizItem
  index = 0
  total = 0
  answer = ''
  hide = false
  reveal = false

  @ViewChild('answerInput', { static: true, read: ViewContainerRef })
  answerInput!: ViewContainerRef

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit(): void {
    if (!this.api.activeQuiz) {
      this.router.navigate([ '/' ])
      return
    }

    this.item = this.api.activeQuiz!.items[0]
  }

  ngAfterViewInit(): void {
    this.answerInput.element.nativeElement.focus()
  }

  nextQuestionPlz(event?: KeyboardEvent): void {
    if (event && event.key !== 'Enter') {
      return
    }

    if (this.item.answer !== this.answer) {
      if (this.api.activeOptions?.endless) {
        this.reveal = true
        this.reinsertCurrent()
      } else {
        alert('Not quite right...')
      }
      return
    }

    this.advance()
  }

  reinsertCurrent(): void {
    let i = (this.index + Math.floor(2 + Math.random() * 2)) % this.api.activeQuiz!.items.length

    this.api.activeQuiz!.items.splice(i, 0, this.api.activeQuiz!.items[this.index])

    if (this.index > i) {
      this.index++
    }
  }

  hideAnswer(): void {
    this.hide = true
  }

  advance(): void {
    if (this.api.activeOptions?.endless && this.index >= this.api.activeQuiz!.items.length - 1) {
      this.index = -1
    }

    if (this.index < this.api.activeQuiz!.items.length - 1) {
      this.item = this.api.activeQuiz!.items[++this.index]
      this.answer = ''
      this.answerInput.element.nativeElement.focus()
      this.hide = false
      this.reveal = false
      this.total++
    } else {
      alert('You are done!')
      this.router.navigate([ '/' ])
    }
  }

  leave(): void {
    this.router.navigate([ '/' ])
  }
}
