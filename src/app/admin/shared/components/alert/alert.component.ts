import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../../services/alert.service";
import { Subscription} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('box',[
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate(100)
      ]),
      transition('* => void', [
        style({
          opacity: 1,
          transform: 'translateX(100%)'
        }),
        animate(100)
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000
  private aSub: Subscription
  public text: string = ''
  public type: string = 'success'

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
   this.aSub = this.alertService.alert$.subscribe((alert) => {
      this.text = alert.text
      this.type = alert.type
       const timeout = setTimeout(() => {
         clearTimeout(timeout)
         this.text = ''
       }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
