import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRC_DP } from 'src/app/_models/IRC_DP';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})
export class RcDpCodeResolverService implements Resolve<IRC_DP> {

constructor(private codeService: CodeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IRC_DP> {
    return this.codeService.resolveRCDP();
  }
}
