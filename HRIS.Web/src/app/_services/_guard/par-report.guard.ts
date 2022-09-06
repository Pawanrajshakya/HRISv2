import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class PARReportGuard implements CanActivate {
  
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
    if (
      (this.loginService.currentUser.roleID === 1 ||
        this.loginService.currentUser.roleID === 2 ||
        this.loginService.currentUser.roleID === 3 ||
        this.loginService.currentUser.roleID === 4 ||
        this.loginService.currentUser.roleID === 5) &&
      this.loginService.currentUser.groups?.indexOf(4) !== -1
    ) {
      return true;
    }
    this.route.navigate(['/home']);
    return false;
  }
  
}
