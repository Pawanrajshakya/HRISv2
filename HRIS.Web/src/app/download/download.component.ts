import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileSaverService } from 'ngx-filesaver';
import { IReportParam } from '../_models/IReportParam';
import { ReportDownloadService } from '../_services/report-download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements AfterViewInit {

  title: string = "HRIS: Initiating file download...";
  closeBtnName?: string;
  message: string = "We are preparing your report, please wait...";
  reportParam?: IReportParam;

  constructor(
    public modalReportRef: BsModalRef,
    private reportDownloadService: ReportDownloadService,
    private modalService: BsModalService,
    private fileServer: FileSaverService) { }

  ngAfterViewInit(): void {
    this.reportDownloadService.get$(this.reportParam)
      .subscribe({
        next: (res) => {
          let response = res as HttpResponse<Blob>;
          this.fileServer.save(response.body, this.reportParam?.reportName);
        }, error: (error) => {
          console.error(error);
          this.title = "HRIS"
          this.message = "Unable to process your request. Please try later. "
        }
        , complete: () => {
          this.modalService.hide(this.modalReportRef?.id);
          console.log('complete');
        }
      });
  }
}