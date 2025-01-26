import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('Token')!=undefined){

    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('Token')}`);
    const modifiedReq = req.clone({ headers });
    console.log(localStorage.getItem('Token'))

    return next.handle(modifiedReq);

  }
  return next.handle(req);
}
}
