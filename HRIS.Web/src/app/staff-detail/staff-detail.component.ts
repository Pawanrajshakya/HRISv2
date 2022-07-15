import { Component, OnInit } from '@angular/core';
import { ModalBaseComponent } from '../base/tool-base.component';
import { IActiveStaff } from '../_models/IActiveStaff';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent extends ModalBaseComponent<IActiveStaff> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }


  onExport() {

  }
}
