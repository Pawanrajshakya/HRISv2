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
import { IHeadCountTitleSummaryReport } from 'src/app/_models/IHeadcountReport';

import { IRc } from 'src/app/_models/IRcDp';
import { ITitle } from 'src/app/_models/ITitle';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';

import { LoginService } from 'src/app/_services/login.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-headcount-report-title-summary',
  templateUrl: './headcount-report-title-summary.component.html',
  styleUrls: ['./headcount-report-title-summary.component.scss'],
})
export class HeadcountReportTitleSummaryComponent
  extends BaseComponent<IHeadCountTitleSummaryReport>
  implements AfterViewInit, OnInit
{
  constructor(
    private codeService: CodeService,
    private modalService: BsModalService,
    public loginService: LoginService,
    public dataService: DataService
  ) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'titleCode',
      'title',
      'rc',
      'ctlBudgetHC',
      'ctlOnBoardHC',
      'ctlhcVacancies',
      'ctlNewHireTickets',
      'ctlotNewHireTickets',
      'ctlAvailHC',
      'budgetHC',
      'onBoardHC',
      'hcVacancies',
      'newHireTickets',
      'otNewHireTickets',
      'availHC',
      'totalAvailVacancies'
    ];

    this.rcs = this.codeService.rc_dp.RC as IRc[];
    this.titles = this.codeService.titles as ITitle[];
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
          return this.dataService
            .titleSummaryReport$(this.reportParam)
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
    this.reportParam.code.titles = this.selectedTitle.join(',');
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();
    this.filterSubject.next(this.filterValue);
  }

  onExport() {
    this.download(this.modalService, Reports[12]);
  }
}
