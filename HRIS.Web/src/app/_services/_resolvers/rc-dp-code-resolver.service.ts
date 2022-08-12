import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRcDp } from 'src/app/_models/IRcDp';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})
export class RcDpCodeResolverService implements Resolve<IRcDp> {

constructor(private codeService: CodeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IRcDp> {
    return this.codeService.resolveRCDP();
  }
}
