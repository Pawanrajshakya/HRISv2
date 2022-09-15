import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderInterceptorService } from './_services/_interceptors/header-interceptor.service';
import { MaterialModule } from './_shared/material.module';
import { AppComponent } from './app.component';
import { DeveloperComponent } from './developer/developer.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptorService } from './_services/_interceptors/auth-interceptor.service';
import { DownloadComponent } from './download/download.component';
import { SharedModule } from './_shared/shared.module';
import { MyInfoModule } from './my-info/my-info.module';
import { PipeModule } from './_shared/pipe.module';
import { ToolModule } from './tools/tool.module';
import { ReportModule } from './reports/report.module';
import { ChartsModule } from './reports/chart.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DeveloperComponent,
    HomeComponent,
    ErrorComponent,
    DownloadComponent,
  ],
  imports: [
    SharedModule,
    MaterialModule,
    MyInfoModule,
    PipeModule,
    ToolModule,
    ReportModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
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
