import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-examine',
  templateUrl: './examine.component.html',
  styleUrls: ['./examine.component.scss']
})
export class ExamineComponent implements OnInit {
  
  showAnswer = false

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  leave(): void {
    this.router.navigate([ '/' ])
  }
}
