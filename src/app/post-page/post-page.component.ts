import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public post$: Observable<Post> = new Observable<Post>()
  constructor(
    private router: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.post$ = this.postService.getPostById(params['id'])
    })
  }

}
