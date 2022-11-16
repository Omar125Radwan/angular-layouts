import { PostsService } from './../../../shared/services/posts.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  items: any = [];
  constructor(private postsService: PostsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.postsService.getAll().subscribe((res: any) => {
      this.items = res;
    })
  }
  deleteItem(modal: any, id: number) {
    this.modalService.open(modal).result.then(result => {
      this.postsService.delete(id).subscribe(res => {
        this.getAll();
      },
        err => {
          this.getAll();
        }
      );
    },
      reason => {
        this.getAll();
      });
  }
}
