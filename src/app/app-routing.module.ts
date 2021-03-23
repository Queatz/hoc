import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component'
import { PracticeComponent } from './practice/practice.component'
import { QuizComponent } from './quiz/quiz.component'
import { ResultComponent } from './result/result.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'practice', component: PracticeComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
