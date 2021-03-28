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
  answer = ''

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
      alert('Not quite right...')
      return
    }

    this.advance()
  }

  advance(): void {
    if (this.index < this.api.activeQuiz!.items.length - 1) {
      this.item = this.api.activeQuiz!.items[++this.index]
      this.answer = ''
      this.answerInput.element.nativeElement.focus()
    } else {
      alert('You are done!')
      this.router.navigate([ '/' ])
    }
  }

  leave(): void {
    this.router.navigate([ '/' ])
  }
}
