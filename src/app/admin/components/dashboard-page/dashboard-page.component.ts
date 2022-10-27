import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../shared/post.service";
import {Post} from "../../../shared/interfaces";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  posts: Post[] = []
  searchPost: string = ''
  constructor(private postService: PostService, private alert: AlertService) { }

  ngOnInit() {
    this.postService.getAll().subscribe((response: Post[]) => {
      this.posts = response
    })
  }

  removePost(id: string | undefined) {
    if(typeof id !== 'undefined') {
      this.postService.deletePost(id).subscribe((response) => {
        this.alert.danger('Пост был удален')
        this.posts = this.posts.filter((post) => post.id !== id)
      })
    }
  }
}
