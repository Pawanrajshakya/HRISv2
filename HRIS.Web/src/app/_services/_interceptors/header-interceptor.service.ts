import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService, public platform: Platform) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let _platform = '';

    // if (this.platform.ANDROID) _platform = 'ANDROID ';
    // if (this.platform.IOS) _platform = _platform + 'IOS ';
    // if (this.platform.FIREFOX) _platform = _platform + 'FIREFOX ';
    // if (this.platform.BLINK) _platform = _platform + 'BLINK ';
    // if (this.platform.WEBKIT) _platform = _platform + 'WEBKIT ';
    // if (this.platform.TRIDENT) _platform = _platform + 'TRIDENT ';
    // if (this.platform.EDGE) _platform = _platform + 'EDGE ';
    // if (this.platform.SAFARI) _platform = _platform + 'SAFARI ';

    req = req.clone({
      setHeaders: {
        ['hris_developer_lanid']:
          this.loginService.lanID.length > 0 ? this.loginService.lanID : '',
        // ['platform']: _platform,
      },
    });
    return next.handle(req);
  }
}
