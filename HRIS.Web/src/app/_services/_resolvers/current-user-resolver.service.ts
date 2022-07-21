import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ICurrentUser } from '../../_models/ICurrentUser';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<ICurrentUser> {

  constructor(private loginService: LoginService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ICurrentUser> {
    return this.loginService.checkAuthentication();
  }

}
