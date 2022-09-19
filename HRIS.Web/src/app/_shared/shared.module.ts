import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgChartsModule } from 'ng2-charts';
import { FileSaverModule } from 'ngx-filesaver';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { DownloadComponent } from '../download/download.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  declarations: [ErrorComponent, DownloadComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    LoadingBarHttpClientModule,
    NgSelectModule,
    NgxScrollTopModule,
    FileSaverModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    LoadingBarHttpClientModule,
    NgSelectModule,
    NgxScrollTopModule,
    FileSaverModule,
    ErrorComponent,
    DownloadComponent,
  ],
})
export class SharedModule {}
