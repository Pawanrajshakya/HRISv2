import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminToolGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check();
  }

  check(): boolean {
    if (this.loginService.currentUser.groups?.indexOf(1) !== -1) {
      return true;
    }
    this.route.navigate(['/home']);
    return false;
  }
  
}
