import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ICSStatus } from 'src/app/_models/ICSStatus';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})
export class CsStatusResolverService implements Resolve<ICSStatus[]> {
  constructor(private codeService: CodeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ICSStatus[]> {
      return this.codeService.resolveCSStatus();
    }

}
