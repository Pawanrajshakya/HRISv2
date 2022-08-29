import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class MyInfoTreeResolverService implements Resolve<IMyInfoTree[]> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<IMyInfoTree[]> {
    return this.dataService.resolveTreeRoot();
  }
}
