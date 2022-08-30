import { Component, OnInit } from '@angular/core';
import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';
import { MyInfoService } from 'src/app/_services/my-info.service';

@Component({
  selector: 'app-my-staff-info',
  templateUrl: './my-staff-info.component.html',
  styleUrls: ['./my-staff-info.component.scss'],
})
export class MyStaffInfoComponent implements OnInit {
  selectedRoot: IMyInfoTree = {};
  constructor(public myInfoService: MyInfoService) {
    this.myInfoService.GetMyInfoTree$().subscribe({
      next: (data) => {
        if (data) this.selectedRoot = data;
      },
    });
  }

  ngOnInit(): void {
    //this.selectedRoot = this.myInfoService.selectedRoot;

    this.myInfoService.selectedRoot.subscribe({
      next: (root: IMyInfoTree) => {
        console.log('00', root);
        this.selectedRoot = root;
      },
    });
  }
}
