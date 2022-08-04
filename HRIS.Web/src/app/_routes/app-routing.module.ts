import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveStaffComponent } from '../staff/active-staff/active-staff.component';
import { AnnouncementComponent } from '../tools/announcement/announcement.component';
import { DeveloperComponent } from '../developer/developer.component';
import { HomeComponent } from '../home/home.component';
import { StaffDetailComponent } from '../reports/staff-detail/staff-detail.component';
import { UserComponent } from '../tools/user/user.component';
import { BkpTitleResolverService } from '../_services/_resolvers/bkp-title-resolver.service';
import { CsStatusResolverService } from '../_services/_resolvers/cs-status-resolver.service';
import { CurrentUserResolver } from '../_services/_resolvers/current-user-resolver.service';
import { LocationCodeResolverService } from '../_services/_resolvers/location-code-resolver.service';
import { RcDpCodeResolverService } from '../_services/_resolvers/rc-dp-code-resolver.service';
import { StaffDetailResolverService } from '../_services/_resolvers/staff-detail-resolver.service';
import { TitleCodeResolverService } from '../_services/_resolvers/title-code-resolver.service';
import { StaffLeaveComponent } from '../reports/staff-leave/staff-leave.component';
import { LeaveStatusResolverService } from '../_services/_resolvers/leave-status-resolver.service';
import { CeasedStaffComponent } from '../reports/ceased-staff/ceased-staff.component';
import { StaffEmergencyContactInfoComponent } from '../reports/staff-emergency-contact-info/staff-emergency-contact-info.component';
import { VacationRosterComponent } from '../reports/vacation-roster/vacation-roster.component';
import { SeparationComponent } from '../reports/separation/separation.component';
import { ParComponent } from '../reports/par/par.component';
import { OvertimeComponent } from '../reports/overtime/overtime.component';

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
    resolve: {
      currentUser: CurrentUserResolver
      , staffDetail: StaffDetailResolverService
    }
  },
  {
    path: 'leaveReport', component: StaffLeaveComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
      , titles: TitleCodeResolverService
      , lvStatus: LeaveStatusResolverService
    }
  },
  {
    path: 'ceasedReport', component: CeasedStaffComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
      , titles: TitleCodeResolverService
      , lvStatus: LeaveStatusResolverService
    }
  },
  {
    path: 'vacationRoasterReport', component: VacationRosterComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
      , location: LocationCodeResolverService
      , title: TitleCodeResolverService
    }
  },
  {
    path: 'emergencyContactInfoReport', component: StaffEmergencyContactInfoComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
      , location: LocationCodeResolverService
    }
  },
  {
    path: 'separationReport', component: SeparationComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
    }
  },
  {
    path: 'parReport', component: ParComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
      , titles: TitleCodeResolverService
      , locations: LocationCodeResolverService
    }
  },
  {
    path: 'overtimeReport', component: OvertimeComponent,
    resolve: {
      currentUser: CurrentUserResolver
      , rcdp: RcDpCodeResolverService
    }
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
