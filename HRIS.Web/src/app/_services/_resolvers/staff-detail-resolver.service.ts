import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IHRISError } from 'src/app/_models/IHRISError';
import { IStaffDetail } from 'src/app/_models/IStaffDetail';
import { StaffService } from '../staff.service';

@Injectable({
  providedIn: 'root'
})
export class StaffDetailResolverService implements Resolve<IStaffDetail | null> {

  constructor(private staffService: StaffService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStaffDetail | null> {
    const ein = route.paramMap.get('ein');
    return this.staffService.detail$(ein ?? "");
  }

}
