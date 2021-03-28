import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

}
