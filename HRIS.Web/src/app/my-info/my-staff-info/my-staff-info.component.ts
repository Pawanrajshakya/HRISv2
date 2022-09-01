import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BaseComponent } from 'src/app/base/base.component';
import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';
import { Reports } from 'src/app/_models/Reports.enum';
import { LoginService } from 'src/app/_services/login.service';
import { MyInfoService } from 'src/app/_services/my-info.service';

@Component({
  selector: 'app-my-staff-info',
  templateUrl: './my-staff-info.component.html',
  styleUrls: ['./my-staff-info.component.scss'],
})
export class MyStaffInfoComponent
  extends BaseComponent<IMyInfoTree>
  implements OnInit
{
  constructor(
    public myInfoService: MyInfoService,
    private loginService: LoginService,
    private modalService: BsModalService
  ) {
    super();
    // console.log('constructor', myInfoService);
  }

  ngOnInit(): void {
    this.myInfoService.myInfoTreeStaffSelectedEvent.subscribe({
      next: (data: IMyInfoTree) => {
        this.myInfoService.selectedTree = data;
        this.myInfoService.GetInfo(data.ein ?? '').then((data) => {
          this.myInfoService.selectedTreeInfo = data._info ?? {};
          this.myInfoService.selectedTree_Emergency_Info =
            data._emergency ?? {};
          this.myInfoService.selectedTree_Overtime_Info = data._overtime ?? {};
        });
      },
    });
  }

  onExport() {
    this.reportParam.file.format = "PDF";
    this.reportParam.ein = this.myInfoService.selectedTreeInfo.ein;
    this.download(this.modalService, Reports[27]);
  }
}
