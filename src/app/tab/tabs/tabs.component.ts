import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import {TabComponent} from "../tab/tab.component";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  constructor(private host: ViewContainerRef ) { }

  ngOnInit(): void {
  }
  ngAfterContentInit() {
    console.log(this.host)
    const filterActive = this.tabs.filter((item) => item.active)

    if(!filterActive.length) {
      this.tabs.first.active = true
    }
  }

  handleActiveTab(tab: TabComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false
    })
    tab.active = true
  }
}
