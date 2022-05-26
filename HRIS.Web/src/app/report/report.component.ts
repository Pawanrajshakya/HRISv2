import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileSaverService } from 'ngx-filesaver';
import { IReportParam } from '../_models/report-param';
import { ReportService } from '../_services/report.service';

@Component({
  selector: 'app-report-popup',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements AfterViewInit {

  title: string = "HRIS: Initiating file download...";
  closeBtnName?: string;
  message: string = "We are preparing your report, please wait...";
  reportParam?: IReportParam;
  reportName: string = "";

  constructor(
    public modalReportRef: BsModalRef,
    private reportService: ReportService,
    private modalService: BsModalService,
    private fileServer: FileSaverService) { }

  ngAfterViewInit(): void {
    this.reportService.get$(this.reportParam)
      .subscribe({
        next: (res) => {
          let response = res as HttpResponse<Blob>;



          // if (this.reportParam?.detail.format === 'excel')
          //   this.reportName = this.reportParam?.detail.reportName + '.xls';
          // else
          //   this.reportName = this.reportParam?.detail.reportName + '.pdf';

          this.fileServer.save(response.body, this.reportName);
        }, error: (error) => { }
        , complete: () => {
          this.modalService.hide(this.modalReportRef?.id);
          console.log('complete');
        }
      });
  }
}
