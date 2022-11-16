import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(`${env.apiUrl}/posts`);
  }
  // Delete item
  delete(id: number) {
    return this.http.delete(`${env.apiUrl}/posts/${id}`)
  }
  add(data: any) {
    return this.http.post(`${env.apiUrl}/posts/`, data);
  }
  getItem(id: any) {
    return this.http.get<any>(`${env.apiUrl}/posts/${id}`);
  }
  update(data: any, id: number) {
    return this.http.put(`${env.apiUrl}/posts/${id}`, data);
  }
}
