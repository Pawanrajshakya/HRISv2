import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';
import { MyInfoService } from '../my-info.service';

@Injectable({
  providedIn: 'root',
})
export class MyInfoTreeResolverService implements Resolve<IMyInfoTree[]> {
  constructor(private myInfoService: MyInfoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<IMyInfoTree[]> {
    return this.myInfoService.resolveTreeRoot();
  }
}


