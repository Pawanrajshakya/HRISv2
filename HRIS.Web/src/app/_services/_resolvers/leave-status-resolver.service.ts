import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ILeaveStatus } from 'src/app/_models/ILeaveStatus';
import { ITitle } from 'src/app/_models/ITitle';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveStatusResolverService implements Resolve<ILeaveStatus[]> {

  constructor(private codeService: CodeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ILeaveStatus[]> {
      return this.codeService.resolveLvStatus();
    }
  }
