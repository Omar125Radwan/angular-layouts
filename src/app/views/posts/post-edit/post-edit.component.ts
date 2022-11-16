import { PostsService } from './../../../shared/services/posts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  itemId: any;
  itemDetails: any = {};
  editForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
  });
  submitted!: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params.id;
      this.postsService.getItem(params.id).subscribe(res => {
        this.itemDetails = res;
        this.editForm.patchValue({
          title: res.title,
          description: res.description
        })
      })
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.postsService.update(this.editForm.value, this.itemId).subscribe(
      res => {
        this.router.navigate(['../admin/posts']);
      },
      err => {

      }
    )
  }

  get f() {return this.editForm.controls;}

}
