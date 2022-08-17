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
import {
  IEEOConfirmedReport,
  IEEOPendingReport,
  IEEOSummaryReport,
} from 'src/app/_models/IEEO';
import { IRc } from 'src/app/_models/IRcDp';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';
import { DataService } from 'src/app/_services/data.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-eeo-report-pending',
  templateUrl: './eeo-report-pending.component.html',
  styleUrls: ['./eeo-report-pending.component.scss'],
})
export class EeoReportPendingComponent
  extends BaseComponent<IEEOPendingReport>
  implements AfterViewInit, OnInit
{
  additionalTitle =
    new Date().getMonth() < 6
      ? 'between January 1 – June 30.'
      : 'between July 1 – December 31.';

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
      'ra',
      'rc',
      'rcName',
      'dpCode',
      'dpName',
      'name',
      'preferredEmployeeName',
      'supervisorName',
      'preferredSupervisorName',
      'supervisorEmail',
    ];
    this.rcs = this.codeService.rc_dp.RC as IRc[];
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
            .eeoPendingReport$(this.reportParam)
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
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();
    this.reportParam.pagination.sortColumn = 'rc';
    this.reportParam.pagination.sortOrder = 'asc';
    this.filterSubject.next(this.filterValue);
  }

  onExport() {
    this.download(this.modalService, Reports[18]);
  }
}
