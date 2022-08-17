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
import { IHeadcountReport } from 'src/app/_models/IHeadcountReport';

import { IDpGroup, IRc } from 'src/app/_models/IRcDp';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';

import { LoginService } from 'src/app/_services/login.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-headcount-report-detail',
  templateUrl: './headcount-report-detail.component.html',
  styleUrls: ['./headcount-report-detail.component.scss'],
})
export class HeadcountReportDetailComponent
  extends BaseComponent<IHeadcountReport>
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
      'divisionUnit',
      'rc',
      'dp',
      'dpName',
      'title',
      'titleDescription',
      'ctlBudgetHc',
      'ctlOnBoard',
      'ctlHcVacancies',
      'ctlBdgBaseSalary',
      'ctlTotalBaseSalary',
      'ctlVacancySalary',
      'ctlNewHireTickets',
      'ctlOtNewHireTickets',
      'ctlIncrementCost',
      'ctlAvail',
      'budgetHc',
      'staffOnBoard',
      'hcVacancies',
      'bdgBaseSalary',
      'totalBaseSalary',
      'vacancySalary',
      'newHireTickets',
      'otNewHireTickets',
      'incrementCost',
      'avail',
      'totalAvailVacancies',
      'totalAvail',
      'comments',
    ];

    this.rcs = this.codeService.rc_dp.RC as IRc[];
    this.groupDPs = this.codeService.rc_dp.IDpGroup as IDpGroup[];
    this.filteredGroupDPs = this.groupDPs;
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
            .report$(this.reportParam)
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
    this.reportParam.rcDp.dps = this.selectedGroupDP.join(',');
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();
    this.reportParam.pagination.sortColumn = 'rc';
    this.reportParam.pagination.sortOrder = 'asc';
    this.filterSubject.next(this.filterValue);
  }

  onExport() {
    this.download(this.modalService, Reports[11]);
  }
}
