import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.lanID.length > 0) {
      req = req.clone({
        setHeaders: { ["hris_developer_lanid"]: this.loginService.lanID }
      });
    } else {
      req = req.clone();
    }
    return next.handle(req);
  }
}
