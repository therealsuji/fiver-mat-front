import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConstantsService } from './constants.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private constants: ConstantsService) {}
  tokenRefreshing = false;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('skip')) {
      const cloneReq = req.clone({
        headers: req.headers.delete('skip')
      });
      return next.handle(cloneReq);
    }

    const auth = btoa(`${this.constants.apiUserName}:${this.constants.apiPassword}`)
    const cloneReq = req.clone({
      headers: req.headers.append('Authorization',`Basic ${auth}`)
    });
    return next.handle(cloneReq);
  }

  
}
