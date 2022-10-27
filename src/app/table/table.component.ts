import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() posts: Post[]
  @Input() searchPost: string
  @Output() onRemove:EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {}

  removePost(id: string | undefined) {
    if(typeof id === 'string') {
      this.onRemove.emit(id)
    }
  }
}
