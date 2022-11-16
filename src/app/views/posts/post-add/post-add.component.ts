import { PostsService } from './../../../shared/services/posts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  addForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
  });
  submitted!: boolean;
  constructor(
    private postsService: PostsService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.postsService.add(this.addForm.value).subscribe(
      res => {
        this.router.navigate(['../admin/posts']);
      },
      err => {

      }
    )
  }

  get f() {return this.addForm.controls;}

}
