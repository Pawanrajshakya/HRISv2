import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeveloperComponent } from './developer/developer.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptorService } from './_services/auth-interceptor.service';
import { HeaderInterceptorService } from './_services/header-interceptor.service';
import { MaterialModule } from './_shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserComponent } from './user/user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FileSaverModule } from 'ngx-filesaver';
import { ReportComponent } from './report/report.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EcardChartComponent } from './charts/ecard-chart/ecard-chart.component';
import { BaseComponent } from './base/base.component';
import { ToolBaseComponent } from './base/tool-base.component';

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
    ToolBaseComponent,
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
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxScrollTopModule,
    FileSaverModule 
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
