import { NotesService } from './../../../shared/services/notes.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
EventEmitter
@Component({
  selector: 'app-note-show',
  templateUrl: './note-show.component.html',
  styleUrls: ['./note-show.component.scss']
})
export class NoteShowComponent implements OnInit {
  @Input() itemId: any;
  @Output() items  = new EventEmitter<any>();
  itemDetails: any = {};
  addForm!: FormGroup;
  submitted!: boolean;
  constructor(
    private notesService: NotesService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buildAddForm();
    this.getItemDetails(this.itemId);
  }

  buildAddForm() {
    this.addForm = this.fb.group({
      id: '',
      title: [null, Validators.required],
      description: [null, Validators.required],
    })
  }
  
  getItemDetails(id: number) {
    this.notesService.getItem(id).subscribe(res => {
      this.itemDetails = res;
      this.addForm.patchValue({
        title: res.title,
        description: res.description,
      });
    })
  }

  onSubmit(id: any) {
    if(id === '') {
      this.addItem(this.addForm.value);
    } else {
      this.updateItem(this.addForm.value, id);
    }
  }

  addItem(data: any) {
    this.notesService.add(data).subscribe(
      res => {
        this.getItems();
      },
      err => {

      }
    );
  }

  updateItem(data: any, id: any) {
    this.notesService.update(data, id).subscribe(
      res => {
        this.getItems();
      },
      err => {

      }
    );
  }

  getItems() {
    this.notesService.getAll().subscribe(res => {
      this.items.emit(res);
    })
  }

  get f() {return this.addForm.controls;}

}
