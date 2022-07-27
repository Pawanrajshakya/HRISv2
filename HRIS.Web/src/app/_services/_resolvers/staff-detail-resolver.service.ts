import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
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

// export class SeparationDataResolverService implements Resolve<ISeparationTable | null> {

//   constructor(private staffService: StaffService, private httpClient: HttpClient) { }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ISeparationTable | null> {

//     return new Promise((resolve, reject) => {
//       this.httpClient.get<IRC[]>(this.url + 'code/rc').subscribe({
//         next: data => {
//           this.rc_dp.RC = data;
//         }, error: (error) => { }, complete: () => {
//           this.httpClient.get<IDP[]>(this.url + 'code/dp').subscribe({
//             next: data => {
//               this.rc_dp.DP = data;
//             }, error: (error) => { }, complete: () => {
//               resolve(this.rc_dp);
//             }
//           });
//         }
//       });
//     });
//   }
// }