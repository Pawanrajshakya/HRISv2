import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
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
import { IDP, IRC } from 'src/app/_models/IRC_DP';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-overtime-report',
  templateUrl: './overtime-report.component.html',
  styleUrls: ['./overtime-report.component.scss'],
})
export class OvertimeReportComponent
  extends BaseComponent<IOvertimeReport>
  implements AfterViewInit, OnInit
{
  overtimeReport: any = [];
  selectedCalendar: string = 'Calendar';
  calendars: string[] = ['Calendar', 'Fiscal'];

  constructor(
    private codeService: CodeService,
    private reportService: ReportService,
    private modalService: BsModalService,
    public loginService: LoginService
  ) {
    super();
  }

  private prepareColoumns() {
    if (
      this.loginService.currentUser.roleID == 1 ||
      this.loginService.currentUser.roleID == 4
    ) {
      this.displayedColumns = [
        'ein',
        'fName',
        'lName',
        'preferredFirstName',
        'preferredLastName',
        'rarc',
        'title',
        'dpCode',
        'salary',
        'adComp',
        'oT_YTDAmt',
        'oT_YTDHrs',
        'compYTD',
        'waiverPrcnt',
        'otPercentofBaseSalary',
        'otPcntRemaining'
      ];
    } else if (
      this.loginService.currentUser.roleID !== 1 &&
      this.loginService.currentUser.roleID !== 4
    ) {
      this.displayedColumns = [
        'ein',
        'fName',
        'lName',
        'rarc',
        'title',
        'dpCode',
        'salary',
        'adComp',
        'oT_YTDAmt',
        'oT_YTDHrs',
        'compYTD',
        'waiverPrcnt',
        'otPercentofBaseSalary',
        'otPcntRemaining',
      ];
    }
  }

  ngOnInit(): void {
    this.prepareColoumns();
    this.rcs = this.codeService.rc_dp.RC as IRC[];
    this.dps = this.codeService.rc_dp.DP as IDP[];
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
          return this.reportService
            .overtimeReport$(this.reportParam)
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
    this.reportParam.rcDp.dps = this.selectedDP.join(',');
    this.reportParam.isCalendarYear = this.selectedCalendar == this.calendars[0];
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.selectedRC = [];
    this.selectedDP = [];
    this.selectedCalendar = this.calendars[0];
    this.filterValue = '';
    this.filterSubject.next('');
  }

  onExport() {
    this.download(this.modalService, Reports[8]);
  }
}
