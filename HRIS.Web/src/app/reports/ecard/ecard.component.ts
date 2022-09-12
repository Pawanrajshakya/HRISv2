import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { IRc } from 'src/app/_models/IRcDp';
import { CodeService } from 'src/app/_services/code.service';
import { EcardService } from 'src/app/_services/ecard.service';

@Component({
  selector: 'app-ecard',
  templateUrl: './ecard.component.html',
  styleUrls: ['./ecard.component.scss']
})
export class EcardComponent extends BaseComponent<any>
implements OnInit
{
constructor(
  private codeService: CodeService,
  private ecardService: EcardService
) {
  super();
}

ngOnInit(): void {
  this.rcs = this.codeService.rc_dp.RC as IRc[];
}

onSearch() {
  this.ecardService.selectedRCs.emit(this.selectedRC);
}

onClear() {
  this.selectedRC = [];
  this.ecardService.selectedRCs.emit(this.selectedRC);
}
}