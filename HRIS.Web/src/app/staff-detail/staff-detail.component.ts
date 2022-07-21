import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { IActiveStaff } from '../_models/IActiveStaff';
import { LoginService } from '../_services/login.service';
import { StaffService } from '../_services/staff.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent extends BaseComponent<IActiveStaff> implements OnInit {

  ein: string = "";
  detail: any = [];
  emergencyContactInfo: any = [];
  staffEDUDetail: any = [];
  staffOTSummaryCalender: any = [];
  staffOTSummaryFiscal: any = [];


  constructor(private route: ActivatedRoute
    , private staffService: StaffService
    , public loginService: LoginService) {
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

        this.staffService.staffOTSummary$(this.ein).subscribe(staffOTSummaryCalender => {
          this.staffOTSummaryCalender = staffOTSummaryCalender;
        });

        this.staffService.staffOTSummary$(this.ein, "Fiscal").subscribe(staffOTSummaryFiscal => {
          this.staffOTSummaryFiscal = staffOTSummaryFiscal;
        });

      }
    });
  }


  onExport() {

  }
}
