import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_shared/material.module';
import { PipeModule } from '../_shared/pipe.module';
import { CaseCountByYearChartComponent } from './disciplinary/case-count-by-year-chart/case-count-by-year-chart.component';
import { PendingCasesChartComponent } from './disciplinary/pending-cases-chart/pending-cases-chart.component';
import { TopInfractionChartComponent } from './disciplinary/top-infraction-chart/top-infraction-chart.component';
import { EcardChartByRcComponent } from './ecard/ecard-chart/ecard-chart-by-rc.component';
import { EeoReportChartComponent } from './eeo/eeo-report-chart/eeo-report-chart.component';
import { HeadcountReportChartComponent } from './headcount/headcount-report-chart/headcount-report-chart.component';
import { OvertimeChartComponent } from './overtime/overtime-chart/overtime-chart.component';
import { BaseComponent } from '../base/base.component';

@NgModule({
  imports: [SharedModule, PipeModule, MaterialModule],
  declarations: [
    BaseComponent,
    CaseCountByYearChartComponent,
    PendingCasesChartComponent,
    TopInfractionChartComponent,
    EcardChartByRcComponent,
    EeoReportChartComponent,
    HeadcountReportChartComponent,
    OvertimeChartComponent,
  ],
  exports: [
    BaseComponent,
    CaseCountByYearChartComponent,
    PendingCasesChartComponent,
    TopInfractionChartComponent,
    EcardChartByRcComponent,
    EeoReportChartComponent,
    HeadcountReportChartComponent,
    OvertimeChartComponent,
  ],
})
export class ChartsModule {}
