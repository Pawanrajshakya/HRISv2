import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_shared/material.module';
import { PipeModule } from '../_shared/pipe.module';
import { CeasedStaffComponent } from './ceased-staff/ceased-staff.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CustomerServiceComplaintsComponent } from './customer-service-complaints/customer-service-complaints.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { EcardByExcellenceComponent } from './ecard/ecard-by-excellence/ecard-by-excellence.component';
import { EcardByRelationshipComponent } from './ecard/ecard-by-relationship/ecard-by-relationship.component';
import { EcardSendReceivedComponent } from './ecard/ecard-send-received/ecard-send-received.component';
import { EcardComponent } from './ecard/ecard.component';
import { ChartsModule } from './chart.module';
import { EeoComponent } from './eeo/eeo.component';
import { EeoReportSummaryComponent } from './eeo/eeo-report-summary/eeo-report-summary.component';
import { EeoReportConfirmedComponent } from './eeo/eeo-report-confirmed/eeo-report-confirmed.component';
import { EeoReportPendingComponent } from './eeo/eeo-report-pending/eeo-report-pending.component';
import { HeadcountComponent } from './headcount/headcount.component';
import { HeadcountReportDetailComponent } from './headcount/headcount-report-detail/headcount-report-detail.component';
import { HeadcountReportTitleSummaryComponent } from './headcount/headcount-report-title-summary/headcount-report-title-summary.component';
import { HeadcountReportReconciliationSummaryComponent } from './headcount/headcount-report-reconciliation-summary/headcount-report-reconciliation-summary.component';
import { HeadcountReportBudgetSummaryComponent } from './headcount/headcount-report-budget-summary/headcount-report-budget-summary.component';
import { HeadcountReportEmployeeDetailComponent } from './headcount/headcount-report-employee-detail/headcount-report-employee-detail.component';
import { AgencyOvertimeAnalysisComponent } from './overtime/agency-overtime-analysis/agency-overtime-analysis.component';
import { CitytimeOTReportComponent } from './overtime/citytime-ot-report/citytime-ot-report.component';
import { OvertimeReportComponent } from './overtime/overtime-report/overtime-report.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { ActiveStaffComponent } from '../staff/active-staff/active-staff.component';
import { DisciplinaryComponent } from './disciplinary/disciplinary.component';
import { ParComponent } from './par/par.component';
import { MyInfoComponent } from '../my-info/my-info.component';
import { SeparationComponent } from './separation/separation.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { StaffEmergencyContactInfoComponent } from './staff-emergency-contact-info/staff-emergency-contact-info.component';
import { StaffLeaveComponent } from './staff-leave/staff-leave.component';
import { VacationRosterComponent } from './vacation-roster/vacation-roster.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MyInfoModule } from '../my-info/my-info.module';
import { RouterModule } from '@angular/router';
import { CurrentUserResolver } from '../_services/_resolvers/current-user-resolver.service';
import { RcDpCodeResolverService } from '../_services/_resolvers/rc-dp-code-resolver.service';
import { TitleCodeResolverService } from '../_services/_resolvers/title-code-resolver.service';
import { LeaveStatusResolverService } from '../_services/_resolvers/leave-status-resolver.service';
import { StaffReportGuard } from '../_services/_guard/staff-report.guard';
import { LocationCodeResolverService } from '../_services/_resolvers/location-code-resolver.service';
import { VacationRosterReportGuard } from '../_services/_guard/vacation-roster-report.guard';
import { PARReportGuard } from '../_services/_guard/par-report.guard';
import { SeparationsReportGuard } from '../_services/_guard/separations-report.guard';
import { FisalYearResolverService } from '../_services/_resolvers/fisal-year-resolver.service';
import { OvertimeReportGuard } from '../_services/_guard/overtime-report.guard';
import { HeadcountReportGuard } from '../_services/_guard/headcount-report.guard';
import { EEOReportGuard } from '../_services/_guard/eeo-report.guard';
import { ECardsReportGuard } from '../_services/_guard/ecards-report.guard';
import { DisciplinaryReportGuard } from '../_services/_guard/disciplinary-report.guard';
import { EmployeeBehaviorCodeResolverService } from '../_services/_resolvers/employee-behavior-code-resolver.service';
import { CustomerServiceComplaintsReportGuard } from '../_services/_guard/customer-service-complaints-report.guard';
import { BkpTitleResolverService } from '../_services/_resolvers/bkp-title-resolver.service';
import { CsStatusResolverService } from '../_services/_resolvers/cs-status-resolver.service';
import { StaffDetailResolverService } from '../_services/_resolvers/staff-detail-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PipeModule,
    ChartsModule,
    MyInfoModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'leaveReport',
        component: StaffLeaveComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
          titles: TitleCodeResolverService,
          lvStatus: LeaveStatusResolverService,
        },
        canActivate: [StaffReportGuard],
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
        canActivate: [StaffReportGuard],
      },
      {
        path: 'vacationRosterReport',
        component: VacationRosterComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
          location: LocationCodeResolverService,
          title: TitleCodeResolverService,
        },
        canActivate: [VacationRosterReportGuard],
      },
      {
        path: 'emergencyContactInfoReport',
        component: StaffEmergencyContactInfoComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
          location: LocationCodeResolverService,
        },
        canActivate: [StaffReportGuard],
      },
      {
        path: 'separationReport',
        component: SeparationComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
        },
        canActivate: [SeparationsReportGuard],
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
        canActivate: [PARReportGuard],
      },
      {
        path: 'overtimeReport',
        component: OvertimeComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
          fiscalYear: FisalYearResolverService,
        },
        canActivate: [OvertimeReportGuard],
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
        canActivate: [HeadcountReportGuard],
      },
      {
        path: 'eeo',
        component: EeoComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
        },
        canActivate: [EEOReportGuard],
      },
      {
        path: 'ecard',
        component: EcardComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
        },
        canActivate: [ECardsReportGuard],
      },
      {
        path: 'disciplinary',
        component: DisciplinaryComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          rcdp: RcDpCodeResolverService,
        },
        canActivate: [DisciplinaryReportGuard],
      },
      {
        path: 'customerServiceComplaint',
        component: CustomerServiceComplaintsComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          employeeBehaviors: EmployeeBehaviorCodeResolverService,
        },
        canActivate: [CustomerServiceComplaintsReportGuard],
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
        canActivate: [StaffReportGuard],
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
    ]),
  ],
  declarations: [
    CeasedStaffComponent,
    CustomerServiceComplaintsComponent,
    EcardByExcellenceComponent,
    EcardByRelationshipComponent,
    EcardSendReceivedComponent,
    EcardComponent,
    EeoComponent,
    EeoReportSummaryComponent,
    EeoReportConfirmedComponent,
    EeoReportPendingComponent,
    HeadcountComponent,
    HeadcountReportDetailComponent,
    HeadcountReportTitleSummaryComponent,
    HeadcountReportReconciliationSummaryComponent,
    HeadcountReportBudgetSummaryComponent,
    HeadcountReportEmployeeDetailComponent,
    OvertimeComponent,
    OvertimeReportComponent,
    AgencyOvertimeAnalysisComponent,
    CitytimeOTReportComponent,
    MyInfoComponent,
    ActiveStaffComponent,
    StaffDetailComponent,
    StaffLeaveComponent,
    StaffEmergencyContactInfoComponent,
    DisciplinaryComponent,
    ParComponent,
    SeparationComponent,
    VacationRosterComponent,
  ],

  exports: [
    CeasedStaffComponent,
    CustomerServiceComplaintsComponent,
    EcardByExcellenceComponent,
    EcardByRelationshipComponent,
    EcardSendReceivedComponent,
    EcardComponent,
    EeoComponent,
    EeoReportSummaryComponent,
    EeoReportConfirmedComponent,
    EeoReportPendingComponent,
    HeadcountComponent,
    HeadcountReportDetailComponent,
    HeadcountReportTitleSummaryComponent,
    HeadcountReportReconciliationSummaryComponent,
    HeadcountReportBudgetSummaryComponent,
    HeadcountReportEmployeeDetailComponent,
    OvertimeComponent,
    OvertimeReportComponent,
    AgencyOvertimeAnalysisComponent,
    CitytimeOTReportComponent,
    MyInfoComponent,
    ActiveStaffComponent,
    StaffDetailComponent,
    StaffLeaveComponent,
    StaffEmergencyContactInfoComponent,
    DisciplinaryComponent,
    ParComponent,
    SeparationComponent,
    VacationRosterComponent,
  ],
})
export class ReportModule {}
