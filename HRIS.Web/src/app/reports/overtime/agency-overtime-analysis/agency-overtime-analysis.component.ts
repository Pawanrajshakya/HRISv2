import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  catchError,
  map,
  merge,
  startWith,
  switchMap,
  tap,
  of as observableOf,
} from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { IOvertimeReport } from 'src/app/_models/IOvertimeReport';
import { IRC } from 'src/app/_models/IRC_DP';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { OvertimeService } from 'src/app/_services/overtime.service';

@Component({
  selector: 'app-agency-overtime-analysis',
  templateUrl: './agency-overtime-analysis.component.html',
  styleUrls: ['./agency-overtime-analysis.component.scss'],
})
export class AgencyOvertimeAnalysisComponent
  extends BaseComponent<IOvertimeReport>
  implements AfterViewInit, OnInit
{
  overtimeEarnedAnalysisReport: any = [];
  selectedType: string = 'Earned';
  types: string[] = ['Earned', 'Paid'];

  selectedYear: string = '2022';
  years: string[] = ['2022', '2021', '2020', '2019'];

  constructor(
    private codeService: CodeService,
    private overtimeService: OvertimeService,
    private modalService: BsModalService,
    public loginService: LoginService
  ) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'rarc',
      'description',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'monthly_Alloc',
      'fY_Alloc',
      'fytD_Earned',
      'fytD_Bal',
      'project_Earned',
      'project_Percent',
      'project_Diff',
    ];
    this.rcs = this.codeService.rc_dp.RC as IRC[];
    this.filteredDPs = this.dps;
  }

  ngAfterViewInit(): void {
    // reset sort order to the first page
    // mat-table sort order
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    //mat-table data loading
    merge(this.sort.sortChange, this.paginator.page, this.filterAction$)
      .pipe(
        startWith({}),
        tap((filter) => {
          if (typeof filter != 'object') {
            this.reportParam.pagination.searchTerm = filter.toString();
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 10;
          }
        }),
        switchMap(() => {
          this.isLoadingResults = true;
          this.reportParam.pagination.pageNumber = this.paginator.pageIndex + 1;
          this.reportParam.pagination.pageSize = this.paginator.pageSize;
          this.reportParam.pagination.sortColumn = this.sort.active;
          this.reportParam.pagination.sortOrder = this.sort.direction;
          this.reportParam.year = this.selectedYear;
          this.reportParam.isDateEarned = this.selectedType == this.types[0];
          return this.overtimeService
            .overtimeEarnedAnalysisReport$(this.reportParam)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.resultsLength = this.getResultLength(data);
          return this.resultsLength > 0 ? data : [];
        })
      )
      .subscribe((data) => {
        if (Array.isArray(data)) this.data = data;
        this.isLoadingResults = false;
      });
  }

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(',');
    this.reportParam.isDateEarned = this.selectedType == this.types[0];
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();
    this.selectedType = this.types[0];
    this.selectedYear = this.years[0];
  }

  onExport() {
    this.download(this.modalService, Reports[9]);
  }
}
