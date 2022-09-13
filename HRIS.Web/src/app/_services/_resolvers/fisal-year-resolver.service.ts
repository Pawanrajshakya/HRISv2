import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IFiscalYear } from 'src/app/_models/IFiscalYear';
import { CodeService } from '../code.service';

@Injectable({
    providedIn: 'root'
  })
  export class FisalYearResolverService implements Resolve<IFiscalYear[]> {
    constructor(private codeService: CodeService) { }
      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IFiscalYear[]> {
        return this.codeService.resolveFiscalYear();
      }
  }
  