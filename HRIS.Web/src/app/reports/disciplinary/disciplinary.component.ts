import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { IRc } from 'src/app/_models/IRcDp';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { DisciplinaryService } from 'src/app/_services/disciplinary.service';

@Component({
  selector: 'app-disciplinary',
  templateUrl: './disciplinary.component.html',
  styleUrls: ['./disciplinary.component.scss'],
})
export class DisciplinaryComponent
  extends BaseComponent<any>
  implements OnInit
{
  constructor(
    private codeService: CodeService,
    public loginService: LoginService,
    private disciplinaryService: DisciplinaryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rcs = this.codeService.rc_dp.RC as IRc[];
  }

  onSearch() {
    this.disciplinaryService.selectedRCs.emit(this.selectedRC);
  }

  onClear() {
    this.selectedRC = [];
    this.disciplinaryService.selectedRCs.emit(this.selectedRC);
  }
}
