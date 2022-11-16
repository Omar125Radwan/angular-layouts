import { Injectable } from '@angular/core';
import { environment as env} from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(`${env.apiUrl}/notes`);
  }
  // Delete item
  delete(id: number) {
    return this.http.delete(`${env.apiUrl}/notes/${id}`)
  }
  add(data: any) {
    return this.http.post(`${env.apiUrl}/notes/`, data);
  }
  getItem(id: any) {
    return this.http.get<any>(`${env.apiUrl}/notes/${id}`);
  }
  update(data: any, id: number) {
    return this.http.put(`${env.apiUrl}/notes/${id}`, data);
  }
}
