import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveStaffComponent } from '../active-staff/active-staff.component';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { DeveloperComponent } from '../developer/developer.component';
import { HomeComponent } from '../home/home.component';
import { StaffDetailComponent } from '../staff-detail/staff-detail.component';
import { UserComponent } from '../user/user.component';
import { BkpTitleResolverService } from '../_services/_resolvers/bkp-title-resolver.service';
import { CsStatusResolverService } from '../_services/_resolvers/cs-status-resolver.service';
import { CurrentUserResolver } from '../_services/_resolvers/current-user-resolver.service';
import { LocationCodeResolverService } from '../_services/_resolvers/location-code-resolver.service';
import { RcDpCodeResolverService } from '../_services/_resolvers/rc-dp-code-resolver.service';
import { StaffDetailResolverService } from '../_services/_resolvers/staff-detail-resolver.service';
import { TitleCodeResolverService } from '../_services/_resolvers/title-code-resolver.service';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'user', component: UserComponent,
    resolve: { currentUser: CurrentUserResolver }
  },
  {
    path: 'developer', component: DeveloperComponent
  },
  {
    path: 'announcement', component: AnnouncementComponent,
    resolve: { currentUser: CurrentUserResolver }
  },
  {
    path: 'activeStaff', component: ActiveStaffComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
      , locations: LocationCodeResolverService
      , titles: TitleCodeResolverService
      , bkpTiltes: BkpTitleResolverService
      , csStatuses: CsStatusResolverService
    }
  },
  {
    path: 'staffDetail/:ein', component: StaffDetailComponent,
    resolve: { currentUser: CurrentUserResolver
      , staffDetail: StaffDetailResolverService }
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full',
    resolve: { currentUser: CurrentUserResolver }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
