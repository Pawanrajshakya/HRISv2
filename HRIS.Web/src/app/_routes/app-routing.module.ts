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
import { VacationRoasterComponent } from '../reports/vacation-roaster/vacation-roaster.component';
import { SeparationComponent } from '../reports/separation/separation.component';
import { ParComponent } from '../reports/par/par.component';
import { OvertimeComponent } from '../reports/overtime/overtime.component';
import { HeadcountComponent } from '../reports/headcount/headcount.component';
import { EeoComponent } from '../reports/eeo/eeo.component';
import { EcardComponent } from '../reports/ecard/ecard.component';
import { DisciplinaryComponent } from '../reports/disciplinary/disciplinary.component';
import { CustomerServiceComplaintsComponent } from '../reports/customer-service-complaints/customer-service-complaints.component';
import { EmployeeBehaviorCodeResolverService } from '../_services/_resolvers/employee-behavior-code-resolver.service';
import { MyInfoComponent } from '../my-info/my-info.component';
import { MyInfoTreeResolverService } from '../_services/_resolvers/my-info-tree-resolver.service';
import { StaffReportGuard } from '../_services/_guard/staff-report.guard';
import { AdminToolGuard } from '../_services/_guard/admin-tool.guard';
import { VacationRoasterReportGuard } from '../_services/_guard/vacation-roaster-report.guard';
import { SeparationsReportGuard } from '../_services/_guard/separations-report.guard';
import { PARReportGuard } from '../_services/_guard/par-report.guard';
import { OvertimeReportGuard } from '../_services/_guard/overtime-report.guard';
import { HeadcountReportGuard } from '../_services/_guard/headcount-report.guard';
import { EEOReportGuard } from '../_services/_guard/eeo-report.guard';
import { ECardsReportGuard } from '../_services/_guard/ecards-report.guard';
import { DisciplinaryReportGuard } from '../_services/_guard/disciplinary-report.guard';
import { CustomerServiceComplaintsReportGuard } from '../_services/_guard/customer-service-complaints-report.guard';
import { DeveloperGuard } from '../_services/_guard/developer.guard';
import { FisalYearResolverService } from '../_services/_resolvers/fisal-year-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { currentUser: CurrentUserResolver }
  },
  {
    path: 'user',
    component: UserComponent,
    resolve: { currentUser: CurrentUserResolver },
    canActivate: [AdminToolGuard]

  },
  {
    path: 'developer',
    component: DeveloperComponent,
    canActivate: [DeveloperGuard]
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
    resolve: { currentUser: CurrentUserResolver },
    canActivate: [AdminToolGuard]
  },
  {
    path: 'activeStaff',
    component: ActiveStaffComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      locations: LocationCodeResolverService,
      titles: TitleCodeResolverService,
      bkpTiltes: BkpTitleResolverService,
      csStatuses: CsStatusResolverService,
    },
    canActivate: [StaffReportGuard]
  },
  {
    path: 'staffDetail/:ein',
    component: StaffDetailComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      staffDetail: StaffDetailResolverService,
    },
    canActivate: [StaffReportGuard]
  },
  {
    path: 'leaveReport',
    component: StaffLeaveComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      titles: TitleCodeResolverService,
      lvStatus: LeaveStatusResolverService,
    },
    canActivate: [StaffReportGuard]
  },
  {
    path: 'ceasedReport',
    component: CeasedStaffComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      titles: TitleCodeResolverService,
      lvStatus: LeaveStatusResolverService,
    },
    canActivate: [StaffReportGuard]
  },
  {
    path: 'vacationRoasterReport',
    component: VacationRoasterComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      location: LocationCodeResolverService,
      title: TitleCodeResolverService,
    },
    canActivate: [VacationRoasterReportGuard]
  },
  {
    path: 'emergencyContactInfoReport',
    component: StaffEmergencyContactInfoComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      location: LocationCodeResolverService,
    },
    canActivate: [StaffReportGuard]
  },
  {
    path: 'separationReport',
    component: SeparationComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
    },
    canActivate: [SeparationsReportGuard]
  },
  {
    path: 'parReport',
    component: ParComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      titles: TitleCodeResolverService,
      locations: LocationCodeResolverService,
    },
    canActivate: [PARReportGuard]
  },
  {
    path: 'overtimeReport',
    component: OvertimeComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      fiscalYear: FisalYearResolverService
    },
    canActivate: [OvertimeReportGuard]
  },
  {
    path: 'headcount',
    component: HeadcountComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
      titles: TitleCodeResolverService,
      lvStatus: LeaveStatusResolverService,
    },
    canActivate: [HeadcountReportGuard]
  },
  {
    path: 'eeo',
    component: EeoComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
    },
    canActivate: [EEOReportGuard]
  },
  {
    path: 'ecard',
    component: EcardComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
    },
    canActivate: [ECardsReportGuard]
  },
  {
    path: 'disciplinary',
    component: DisciplinaryComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      rcdp: RcDpCodeResolverService,
    },
    canActivate: [DisciplinaryReportGuard]
  },
  {
    path: 'customerServiceComplaint',
    component: CustomerServiceComplaintsComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      employeeBehaviors: EmployeeBehaviorCodeResolverService,
    },
    canActivate: [CustomerServiceComplaintsReportGuard]
  },
  {
    path: 'myinfo',
    component: MyInfoComponent,
    resolve: {
      currentUser: CurrentUserResolver,
      tree: MyInfoTreeResolverService
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    resolve: { currentUser: CurrentUserResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
