import {AfterContentInit, Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('btn', {static: false}) button: ElementRef

  par: ElementRef
  constructor() { }

  ngOnInit(): void {
    console.log(this.par)
  }

  ngAfterViewInit(): void {
    console.log(this.button.nativeElement)
  }

}
