import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IStaffDetail } from 'src/app/_models/IStaffDetail';
import { BaseComponent } from '../../base/base.component';
import { DownloadComponent } from '../../download/download.component';
import { Reports } from '../../_models/Reports.enum';
import { LoginService } from '../../_services/login.service';
import { StaffService } from '../../_services/staff.service';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent extends BaseComponent<IStaffDetail> implements OnInit {

  ein: string = "";
  detail: any = [];
  emergencyContactInfo: any = [];
  staffEDUDetail: any = [];
  staffOTSummaryCalendar: any = [];
  staffOTSummaryFiscal: any = [];


  constructor(private route: ActivatedRoute
    , private staffService: StaffService
    , public loginService: LoginService
    , public modalService: BsModalService) {
    super();
    this.route.data.subscribe({
      next: (detail) => {
        this.detail = detail['staffDetail'];
      }
    })

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {

      this.ein = param.get('ein') ?? "";

      if (this.ein) {

        this.staffService.emergencyContactInfo$(this.ein).subscribe(emergencyContactInfo => {
          this.emergencyContactInfo = emergencyContactInfo;
        });

        this.staffService.staffEDUDetail$(this.ein).subscribe(staffEDUDetail => {
          this.staffEDUDetail = staffEDUDetail;
        });

        this.staffService.staffOTSummary$(this.ein).subscribe(staffOTSummaryCalendar => {

          console.log('staffOTSummaryCalendar', staffOTSummaryCalendar);
          if (staffOTSummaryCalendar && staffOTSummaryCalendar != null)
            this.staffOTSummaryCalendar = staffOTSummaryCalendar;
          else
            this.staffOTSummaryCalendar = {};
        });

        this.staffService.staffOTSummary$(this.ein, "Fiscal").subscribe(staffOTSummaryFiscal => {
          console.log('staffOTSummaryFiscal', staffOTSummaryFiscal, '>>');

          if (staffOTSummaryFiscal && staffOTSummaryFiscal != null){
            console.log('staffOTSummaryFiscal', staffOTSummaryFiscal, '<<');
            this.staffOTSummaryFiscal = staffOTSummaryFiscal;}
          else
            this.staffOTSummaryFiscal = {};
        });

      }
    });
  }


  onExport() {
    this.reportParam.file.format = "PDF";
    this.reportParam.ein = this.ein;
    this.download(this.modalService, Reports[2]);
  }
}
