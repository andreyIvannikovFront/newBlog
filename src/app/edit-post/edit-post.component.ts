import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../shared/post.service";
import {Post} from "../shared/interfaces";
import {mergeMap, switchMap, tap} from "rxjs";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  form: any
  post: any

  constructor(private router: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.router.params.pipe(
      switchMap((params) => {
        return  this.postService.getPostById(params?.['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup<any>({
        title: new FormControl(post.title, [Validators.required]),
        text: new FormControl(post.content, [Validators.required]),
        author: new FormControl(post.author, [Validators.required]),
      })
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }
    this.postService.update({
      ...this.post,
      title: this.form.value.title,
      content: this.form.value.text,
      author: this.form.value.author,
    }).subscribe((response) => {
      console.log(response)
    })
    console.log('submit')
  }
}
