import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HttpInterceptor >> ', this.userService.lanID);
    if (this.userService.lanID.length > 0) {
      req = req.clone({
        setHeaders: { ["hris_developer_lanid"]: this.userService.lanID }
      });
    } else {
      req = req.clone();
    }
    return next.handle(req);
  }
}
