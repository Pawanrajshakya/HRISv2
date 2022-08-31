import { Component, OnInit } from '@angular/core';
import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';
import { MyInfoService } from 'src/app/_services/my-info.service';
import { StaffService } from 'src/app/_services/staff.service';

@Component({
  selector: 'app-my-staff-info',
  templateUrl: './my-staff-info.component.html',
  styleUrls: ['./my-staff-info.component.scss'],
})
export class MyStaffInfoComponent implements OnInit {
  constructor(
    public myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.myInfoService.myInfoTreeStaffSelectedEvent.subscribe({
      next: (data: IMyInfoTree) => {
        this.myInfoService.selectedMyInfoTreeStaff = data;

        this.myInfoService.GetStaffInfo(data.ein ?? '').then((data) => {
          if (data.myInfoStaffInfo)
            this.myInfoService.myInfoStaffInfo = data.myInfoStaffInfo;
          if (data.myInfoEmergencyContactStaffInfo)
            this.myInfoService.myInfoEmergencyContactStaffInfo =
              data.myInfoEmergencyContactStaffInfo;
          if (data.myInfoOvertimeSummaryStaffInfo)
            this.myInfoService.myInfoOvertimeSummaryStaffInfo =
              data.myInfoOvertimeSummaryStaffInfo;
        });
      },
    });
  }
}
