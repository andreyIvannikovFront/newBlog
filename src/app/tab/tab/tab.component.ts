import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() label: string
  @Input() active: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
