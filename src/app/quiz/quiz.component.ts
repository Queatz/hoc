import { PercentPipe } from '@angular/common'
import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService, Quiz, QuizItem } from '../api.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewInit {

  item!: QuizItem
  index = 0
  answer = ''
  tries = 0

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
      if (this.tries > 1) {
        if (this.api.activeOptions?.exam) {
          this.api.markFailed(this.item)
          alert('You have failed! Let\'s continue!')
          this.nextItem()
        } else {
          alert('You have failed! Try again!')
          this.leave()
        }
      } else {
        this.tries++
        alert(this.tries === 2 ? 'No!' : 'Not quite!')
      }

      return
    }

    this.nextItem()
  }

  nextItem(): void {
    if (this.index < this.api.activeQuiz!.items.length - 1) {
      this.item = this.api.activeQuiz!.items[++this.index]
      this.answer = ''
      this.tries = 0
    } else {
      if (this.api.activeOptions?.exam) {
        if (this.api.failedItems.length > 0) {
          const total = this.api.activeQuiz!.items.length
          const correct = total - this.api.failedItems.length
          alert(`You scored ${correct} out of ${total}${total > 10 ? ` (${new PercentPipe('en-US').transform(correct / total, '1.0')})` : ''}!`)
          const quiz = new Quiz()
          quiz.items = this.api.failedItems
          this.api.setQuiz(quiz)
          this.router.navigate([ '/examine' ])
        } else {
          alert('You win!')
          this.router.navigate([ '/' ])
        }
      } else {
        alert('You are done!')
        this.router.navigate([ '/' ])
      }
    }
  }

  leave(): void {
    this.router.navigate([ '/' ])
  }
}
