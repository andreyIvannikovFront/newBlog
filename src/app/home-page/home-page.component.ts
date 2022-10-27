import { Component, OnInit } from '@angular/core';
import {buffer, interval, map, Observable, reduce, scan, Subject, throttle} from "rxjs";
import {Post} from "../shared/interfaces";
import {PostService} from "../shared/post.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private postService: PostService) { }

  public posts$: Observable<Post[]> = new Observable<Post[]>()

  testStream: Subject<any> = new Subject()

  ngOnInit() {
    this.posts$ = this.postService.getAll()
    this.testStream
      .pipe(
        scan((acc, val) => acc + val, 0),
        map((sum) => sum / 2)
      )
      .subscribe((r) => {
         console.log(r)
      })
  }

  stream() {
    this.testStream.next(21)
  }



}
