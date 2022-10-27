import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

type alert = 'warning' | 'success' | 'danger'

export interface Alert {
  type: alert,
  text: string
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>()

  success(text: string) {
    this.alert$.next({type: 'success', text: text})
  }
  danger(text: string) {
    this.alert$.next({type: 'danger', text: text})
  }
  warning(text: string) {
    this.alert$.next({type: 'warning', text: text})
  }
}
