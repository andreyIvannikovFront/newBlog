import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../../shared/interfaces";
import {PostService} from "../../../shared/post.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public submitting: boolean = false
  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    author: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  constructor(private postService: PostService, private alert: AlertService) { }

  ngOnInit() {
  }
  submit() {
    this.submitting = true
    const data: Post = {
      date: new Date(),
      title: this.form.value.title,
      author: this.form.value.author,
      content: this.form.value.content,
    }
    this.postService.createPost(data)
      .subscribe((response) => {
        this.alert.success('Пост был создан')
        this.form.reset()
        this.submitting = false
    })
  }
}
