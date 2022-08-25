import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ITitle } from 'src/app/_models/ITitle';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})

export class TitleCodeResolverService implements Resolve<ITitle[]> {
  constructor(private codeService: CodeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ITitle[]> {
      return this.codeService.resolveTitle();
    }

}


