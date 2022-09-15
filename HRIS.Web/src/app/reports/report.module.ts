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
