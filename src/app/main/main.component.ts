import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService, Quiz, QuizItem } from '../api.service'
import { shuffle } from '../utils'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  newQuiz = ''
  editing?: Quiz
  sections: Array<{ name: string, quizzes: Array<Quiz> }> = []

  constructor(
    public api: ApiService,
    private router: Router,
    private cr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.api.quizzesObservable.subscribe((quizzes: Array<Quiz>) => {
      this.sections = [
        {
          name: 'Learning',
          quizzes: quizzes.filter(x => x.active)
        }, {
          name: 'Learned',
          quizzes: quizzes.filter(x => !x.active)
        }
      ].filter(x => x.quizzes.length)
      this.cr.detectChanges()
    })
  }

  startExam(section: { name: string, quizzes: Array<Quiz> }, numberOfItems = 0): void {
    const quiz = new Quiz()
    quiz.items = shuffle(section.quizzes.map(x => x.items).flat())
    
    if (numberOfItems) {
      quiz.items = quiz.items.slice(0, numberOfItems)
    }
    
    this.api.setQuiz(quiz, { exam: true })
    this.router.navigate([ '/quiz' ])
  }

  startQuiz(quiz: Quiz): void {
    // const randomQuiz = new Quiz()
    // randomQuiz.items = this.shuffle([ ...quiz.items ])
    this.api.setQuiz(quiz)
    this.router.navigate([ '/quiz' ])
  }

  editQuiz(quiz: Quiz): void {
    this.editing = quiz
    this.newQuiz = quiz.items.map(item => `${item.answer}\t${item.question}`).join('\n')
  }

  moveQuiz(quiz: Quiz): void {
    quiz.active = !quiz.active
    this.api.editQuiz(quiz)
  }

  cancelEditQuiz() {
    this.editing = undefined
    this.newQuiz = ''
  }

  endlessQuiz(quiz: Quiz): void {
    const randomQuiz = new Quiz()
    randomQuiz.items = shuffle([ ...quiz.items ])
    this.api.setQuiz(randomQuiz, { endless: true })
    this.router.navigate([ '/practice' ])
  }

  practiceQuiz(quiz: Quiz): void {
    // const randomQuiz = new Quiz()
    // randomQuiz.items = shuffle([ ...quiz.items ])
    this.api.setQuiz(quiz)
    this.router.navigate([ '/practice' ])
  }

  examineQuiz(quiz: Quiz): void {
    this.api.setQuiz(quiz)
    this.router.navigate([ '/examine' ])
  }

  deleteQuiz(quiz: Quiz): void {
    if (prompt('Delete this quiz?')) {
      this.api.deleteQuiz(quiz)
    }
  }

  createQuiz(tsv: string): void {
    const items = tsv.split('\n').filter(x => !!x).map(line => {
      const [ answer, question ] = line.split('\t').map(x => x.trim().replace(/\s+/g, ' '))
      
      if (!answer || !question) {
        return
      }

      return {
        question,
        answer
      } as QuizItem
    }).filter(x => !!x) as Array<QuizItem>
      
    if (!items.length) {
      alert('Could not create quiz.')
      return
    }

    this.newQuiz = ''

    const show = 5
    const name = items.map(x => x!.question).slice(0, show).map(x => x.length > 20 ? `${x.slice(0, 20)}…` : x).join(', ') + (items.length > show ? `, … (${items.length - show} more)` : '')

    if (this.editing) {
      this.editing!.name = name
      this.editing!.items = items
      this.api.editQuiz(this.editing!)
    } else {
      this.api.saveQuiz({
        items,
        name,
        active: true
      } as Quiz)
    }
  }

  onTab(textarea: HTMLTextAreaElement, e: KeyboardEvent): void {
    if (e.key === 'Tab') {
      e.preventDefault()
      textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd)
      textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1
    }
  }
}
