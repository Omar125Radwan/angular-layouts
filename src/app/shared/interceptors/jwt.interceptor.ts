import { environment as env} from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.startsWith(env.apiUrl)) {
      // Send Headers
      request = request.clone({
        setHeaders : {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFiaGFyd29ya3MuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NjEwOTIyNTgsImV4cCI6MTY2MTA5NTg1OH0.84CP8ZZbDL9JYle8S2W7myCJXQKeyDRR1nrw_cd5w5Q'
        }}
      );
    }
    return next.handle(request);
  }
}
