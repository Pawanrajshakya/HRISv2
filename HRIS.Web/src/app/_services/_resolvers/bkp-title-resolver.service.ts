import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IBackupTitle } from 'src/app/_models/IBackupTitle';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})
export class BkpTitleResolverService implements Resolve<IBackupTitle[]> {
  constructor(private codeService: CodeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IBackupTitle[]> {
      return this.codeService.resolveBkpTitle();
    }
}
