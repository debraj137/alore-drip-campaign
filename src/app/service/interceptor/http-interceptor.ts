import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LayoutService } from '../core/layout.service';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  timeoutLoading: number[] = []

  constructor(
    private layout: LayoutService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // in case need to attach token on every request
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + (this.layout.usrCompObj?.token || '')
        // 'Content-Type': 'application/json'
      ),
    });

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error.status === 403 && error.error.error === 'Forbidden') {
          localStorage.clear();
          this.router.navigateByUrl('login');
        } else {
          this.router.navigateByUrl('500');
        }
        return throwError(error);
      })
    );
  }
}
