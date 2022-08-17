import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './_routes/app-routing.module';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { NgChartsModule } from 'ng2-charts';

import { FileSaverModule } from 'ngx-filesaver';
import { NgxScrollTopModule } from 'ngx-scrolltop';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { HeaderInterceptorService } from './_services/_interceptors/header-interceptor.service';

import { MaterialModule } from './_shared/material/material.module';

import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { DeveloperComponent } from './developer/developer.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './tools/user/user.component';

import { AnnouncementComponent } from './tools/announcement/announcement.component';
import { EcardChartComponent } from './charts/ecard-chart/ecard-chart.component';
import { BaseComponent } from './base/base.component';
import { CarouselComponent } from './tools/announcement/carousel/carousel.component';
import { HeadcountChartComponent } from './charts/headcount/headcount-chart.component';
import { PendingCasesComponent } from './charts/team-pending-cases/team-pending-cases.component';
import { TeamCasesCountByYearComponent } from './charts/team-cases-count-by-year/team-cases-count-by-year.component';
import { TeamTopInfractionComponent } from './charts/team-top-infraction/team-top-infraction.component';
import { ActiveStaffComponent } from './staff/active-staff/active-staff.component';
import { StaffDetailComponent } from './reports/staff-detail/staff-detail.component';
import { HrisEmptyValuePipe } from './_pipes/hris-empty-value.pipe';
import { HrisPhonePipe } from './_pipes/hris-phone.pipe';
import { HrisPercentPipe } from './_pipes/hris-percent.pipe';
import { AuthInterceptorService } from './_services/_interceptors/auth-interceptor.service';
import { StaffLeaveComponent } from './reports/staff-leave/staff-leave.component';
import { DownloadComponent } from './download/download.component';
import { CeasedStaffComponent } from './reports/ceased-staff/ceased-staff.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { StaffEmergencyContactInfoComponent } from './reports/staff-emergency-contact-info/staff-emergency-contact-info.component';
import { CustomerServiceComplaintsComponent } from './reports/customer-service-complaints/customer-service-complaints.component';
import { DisciplinaryComponent } from './reports/disciplinary/disciplinary.component';
import { ECardComponent } from './reports/e-card/e-card.component';
import { EeoComponent } from './reports/eeo/eeo.component';
import { OvertimeComponent } from './reports/overtime/overtime.component';
import { ParComponent } from './reports/par/par.component';
import { SeparationComponent } from './reports/separation/separation.component';
import { VacationRosterComponent } from './reports/vacation-roster/vacation-roster.component';
import { OvertimeChartComponent } from './reports/overtime/overtime-chart/overtime-chart.component';
import { OvertimeReportComponent } from './reports/overtime/overtime-report/overtime-report.component';
import { AgencyOvertimeAnalysisComponent } from './reports/overtime/agency-overtime-analysis/agency-overtime-analysis.component';
import { CitytimeOTReportComponent } from './reports/overtime/citytime-ot-report/citytime-ot-report.component';
import { HrisParenthesesPipe } from './_pipes/hris-parentheses.pipe';
import { HrisNumberToTimePipe } from './_pipes/hrisNumberToTime.pipe';
import { HeadcountReportChartComponent } from './reports/headcount/headcount-report-chart/headcount-report-chart.component';
import { HeadcountReportDetailComponent } from './reports/headcount/headcount-report-detail/headcount-report-detail.component';
import { HeadcountReportTitleSummaryComponent } from './reports/headcount/headcount-report-title-summary/headcount-report-title-summary.component';
import { HeadcountReportReconciliationSummaryComponent } from './reports/headcount/headcount-report-reconciliation-summary/headcount-report-reconciliation-summary.component';
import { HeadcountReportBudgetSummaryComponent } from './reports/headcount/headcount-report-budget-summary/headcount-report-budget-summary.component';
import { HeadcountReportEmployeeDetailComponent } from './reports/headcount/headcount-report-employee-detail/headcount-report-employee-detail.component';
import { HeadcountComponent } from './reports/headcount/headcount.component';
import { EeoReportChartComponent } from './reports/eeo/eeo-report-chart/eeo-report-chart.component';
import { EeoReportSummaryComponent } from './reports/eeo/eeo-report-summary/eeo-report-summary.component';
import { EeoReportConfirmedComponent } from './reports/eeo/eeo-report-confirmed/eeo-report-confirmed.component';
import { EeoReportPendingComponent } from './reports/eeo/eeo-report-pending/eeo-report-pending.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DeveloperComponent,
    HomeComponent,
    ErrorComponent,
    UserComponent,
    AnnouncementComponent,
    EcardChartComponent,
    BaseComponent,
    CarouselComponent,
    HeadcountChartComponent,
    PendingCasesComponent,
    TeamCasesCountByYearComponent,
    TeamTopInfractionComponent,
    ActiveStaffComponent,
    StaffDetailComponent,
    ErrorComponent,
    HrisEmptyValuePipe,
    HrisPhonePipe,
    HrisPercentPipe,
    HrisParenthesesPipe,
    HrisNumberToTimePipe,
    StaffLeaveComponent,
    DownloadComponent,
    CeasedStaffComponent,
    MyInfoComponent,
    StaffEmergencyContactInfoComponent,
    CustomerServiceComplaintsComponent,
    DisciplinaryComponent,
    ECardComponent,
    EeoComponent,
    OvertimeComponent,
    ParComponent,
    SeparationComponent,
    VacationRosterComponent,
    OvertimeChartComponent,
    OvertimeReportComponent,
    AgencyOvertimeAnalysisComponent,
    CitytimeOTReportComponent,
    HeadcountReportChartComponent,
    HeadcountReportDetailComponent,
    HeadcountReportTitleSummaryComponent,
    HeadcountReportReconciliationSummaryComponent,
    HeadcountReportBudgetSummaryComponent,
    HeadcountReportEmployeeDetailComponent,
    HeadcountComponent,
    EeoReportChartComponent,
    EeoReportSummaryComponent,
    EeoReportConfirmedComponent,
    EeoReportPendingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    MaterialModule,
    LoadingBarHttpClientModule,
    NgSelectModule,
    NgxScrollTopModule,
    FileSaverModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
