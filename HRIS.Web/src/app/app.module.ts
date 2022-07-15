import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

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

import { AuthInterceptorService } from './_services/auth-interceptor.service';
import { HeaderInterceptorService } from './_services/header-interceptor.service';

import { MaterialModule } from './_shared/material/material.module';

import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { DeveloperComponent } from './developer/developer.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';
import { ReportComponent } from './report/report.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EcardChartComponent } from './charts/ecard-chart/ecard-chart.component';
import { BaseComponent } from './base/base.component';
import { ModalBaseComponent } from './base/tool-base.component';
import { CarouselComponent } from './announcement/carousel/carousel.component';
import { HeadcountComponent } from './charts/headcount/headcount.component';
import { PendingCasesComponent } from './charts/team-pending-cases/team-pending-cases.component';
import { ChartBaseComponent } from './base/chart-base.component';
import { TeamCasesCountByYearComponent } from './charts/team-cases-count-by-year/team-cases-count-by-year.component';
import { TeamTopInfractionComponent } from './charts/team-top-infraction/team-top-infraction.component';
import { ActiveStaffComponent } from './active-staff/active-staff.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DeveloperComponent,
    HomeComponent,
    ErrorComponent,
    UserComponent,
    ReportComponent,
    AnnouncementComponent,
    EcardChartComponent,
    BaseComponent,
    ModalBaseComponent,
    CarouselComponent,
    HeadcountComponent,
    PendingCasesComponent,
    ChartBaseComponent,
    TeamCasesCountByYearComponent,
    TeamTopInfractionComponent,
    ActiveStaffComponent,
    StaffDetailComponent
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
    TabsModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
