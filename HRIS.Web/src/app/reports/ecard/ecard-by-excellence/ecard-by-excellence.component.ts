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
import { IRc } from 'src/app/_models/IRcDp';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { DataService } from 'src/app/_services/data.service';
import { IECardByExcellenceReport } from 'src/app/_models/IECard';

@Component({
  selector: 'app-ecard-by-excellence',
  templateUrl: './ecard-by-excellence.component.html',
  styleUrls: ['./ecard-by-excellence.component.scss'],
})
export class EcardByExcellenceComponent
  extends BaseComponent<IECardByExcellenceReport>
  implements AfterViewInit, OnInit
{
  selectedReport: string = 'Sent By';
  reports: string[] = ['Sent By', 'Received By'];

  constructor(
    private codeService: CodeService,
    private dataService: DataService,
    private modalService: BsModalService,
    public loginService: LoginService
  ) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'id',
      'fName',
      'lName',
      'rc',
      'rcName',
      'service',
      'respect',
      'transparency',
      'accountability',
      'cardCount',
    ];
    this.rcs = this.codeService.rc_dp.RC as IRc[];
    let today = new Date();
    today.setMonth(today.getMonth() - 3);
    today.setDate(1);
    this.dateFrom = today.toISOString();
    this.dateTo = new Date().toISOString();
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
          this.reportParam.dateFrom = this.dateFrom;
          this.reportParam.dateTo = this.dateTo;
          this.reportParam.isSentBy =
            this.selectedReport === 'Sent By' ? true : false;
          return this.dataService
            .GetECardByExcellenceReport$(this.reportParam)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.resultsLength = this.getResultLength(data);
          return this.resultsLength > 0 ? data : [];
        })
      )
      .subscribe({
        next: (data) => {
          if (Array.isArray(data)) this.data = data;
          this.isLoadingResults = false;
        },
        error: (error) => {
          this.isLoadingResults = false;
        },
      });
  }

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(',');
    this.reportParam.isSentBy =
      this.selectedReport === 'Sent By' ? true : false;
    this.reportParam.dateFrom = this.dateFrom;
    this.reportParam.dateTo = this.dateTo;
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.selectedReport = 'Sent By';
    this.reportParam.isSentBy =
      this.selectedReport === 'Sent By' ? true : false;
    this.sort.direction = 'asc';
    this.sort.active = 'rc';
    this.clear();
  }

  onExport() {
    this.reportParam.isSentBy ?? true === true
      ? this.download(this.modalService, Reports[22])
      : this.download(this.modalService, Reports[23]);
  }
}
