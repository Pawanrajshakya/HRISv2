import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { IRc } from 'src/app/_models/IRcDp';
import { CodeService } from 'src/app/_services/code.service';
import { HeadcountService } from 'src/app/_services/headcount.service';

@Component({
  selector: 'app-headcount',
  templateUrl: './headcount.component.html',
  styleUrls: ['./headcount.component.scss']
})
export class HeadcountComponent  extends BaseComponent<any> implements OnInit {
  constructor(
    private codeService: CodeService,
    private headcountService: HeadcountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rcs = this.codeService.rc_dp.RC as IRc[];
  }

  onSearch() {
    this.headcountService.selectedRCs.emit(this.selectedRC);
  }

  onClear() {
    this.selectedRC = [];
    this.headcountService.selectedRCs.emit(this.selectedRC);
  }
}