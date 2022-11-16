import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  items: any = [{ tilte: "archie", description: "any" }];
  itemId: any;
  term: any;
  constructor(private notesService: NotesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.notesService.getAll().subscribe((res: any) => {
      this.items = res;
    })
  }
  deleteItem(modal: any, id: number) {
    this.modalService.open(modal).result.then(result => {
      this.notesService.delete(id).subscribe(res => {
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
  // Add or Edit model
  open(content: any, id: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    this.itemId = id;
  }

  qetUpdateItems(updateItems: any) {
    this.items = updateItems;
    this.modalService.dismissAll();
  }

}
