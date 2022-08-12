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
import { IPARDetail, IPARReport } from 'src/app/_models/IPARReport';
import { IDp, IRc } from 'src/app/_models/IRcDp';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { ParService } from 'src/app/_services/par.service';

@Component({
  selector: 'app-par',
  templateUrl: './par.component.html',
  styleUrls: ['./par.component.scss'],
})
export class ParComponent
  extends BaseComponent<IPARReport>
  implements AfterViewInit, OnInit
{
  isCollapsed = false;

  selectedCPSStatus: string = 'Open Request';
  cpsStatuses: string[] = ['Open Request', 'Closed Request'];
  dateFrom: string = '';
  dateTo: string = '';

  parDetails: any = [];

  constructor(
    private codeService: CodeService,
    private parService: ParService,
    private modalService: BsModalService,
    public loginService: LoginService
  ) {
    super();
  }

  private prepareColoumns() {
    this.displayedColumns = [
      'reqNumber',
      'reqType',
      'rC_po_approve_date',
      'currentStatus',
      'history',
      'trans_Desc',
      'txtDisReplace',
      'attritionEin',
      'txtAttdate',
      'attr_Replace_Reason_desc',
      'title',
      'txtFunCTitle',
      'rC_code',
      'txtDPCode',
      'txtLoc',
      'sA_analyst_approve_desc',
      'sA_analyst_remark',
      'sA_analyst_appr_by',
      'sA_analyst_approve_date',
      'obA_analyst_approve_desc',
      'obA_analyst_remark',
      'obA_analyst_appr_by',
      'obA_analyst_approve_date',
      'perC_approve_desc',
      'perC_Remark',
      'perC_appr_by',
      'perC_approve_date',
      'commisS_Remark',
      'commisS_approve_desc',
      'commisS_approve_date',
      'omB_Disposition_desc',
      'ombSubmittedDate',
      'omBapproval',
      'daysatOMB',
      'omB_ShelfDate',
      'nycaps',
      'recruitmentStatus',
      'dateFlyerPosted',
      'poolDate',
      'candidateFirstName',
      'preferredFirstName',
      'cpD_released_to_Candidate',
      'cpD_Submitted_to_Processing',
      'screeningDate',
      'action',
      'effDate',
    ];
  }

  ngOnInit(): void {
    this.prepareColoumns();
    this.rcs = this.codeService.rc_dp.RC as IRc[];
    this.dps = this.codeService.rc_dp.DP as IDp[];
    this.filteredDPs = this.dps;
    this.titles = this.codeService.titles;
    this.locations = this.codeService.locations;
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
          return this.parService
            .parReport$(this.reportParam)
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

  // onRCSelect($event: Event) {
  //   let _selectedDP = this.selectedDP;
  //   let _selectedRC = this.selectedRC;
  //   this.filteredDPs = [];
  //   this.selectedDP = [];

  //   if (_selectedRC.length === 0) {
  //     this.filteredDPs = this.dps;
  //   } else {
  //     this.dps.forEach((x) => {
  //       if (_selectedRC.indexOf(x.rcCode || '') != -1) {
  //         this.filteredDPs.push(x);
  //       } else {
  //         let i = _selectedDP.indexOf(x.dpCode || '');

  //         if (i != -1) {
  //           _selectedDP.splice(i, 1);
  //         }
  //       }
  //     });

  //     _selectedDP.forEach((dp) => this.selectedDP.push(dp));
  //   }
  // }

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(',');
    this.reportParam.rcDp.dps = this.selectedDP.join(',');
    this.reportParam.code.titles = this.selectedTitle.join(',');
    this.reportParam.code.locations = this.selectedLocation.join(',');
    this.reportParam.openClose =
      this.selectedCPSStatus === 'Open Request' ? 'Open' : 'Closed';
    this.reportParam.dateFrom = this.dateFrom;
    this.reportParam.dateTo = this.dateTo;
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    
    this.selectedCPSStatus = 'Open Request';
    this.reportParam.openClose = 'Open';
    this.clear();
    this.filterSubject.next(this.filterValue);
  }

  onExport() {
    this.download(this.modalService, Reports[7]);
  }

  onCancelClick() {
    this.modalRef?.hide();
  }

  onShowDetail(template: TemplateRef<any>, IPARReport: any): void {
    if (IPARReport.reqNumber) {
      this.parService.parDetail$(IPARReport.reqNumber).subscribe({
        next: (_detail) => {
          if (_detail) {
            this.parDetails = _detail as IPARDetail[];
            this.modalRef = this.modalService.show(template, this.modalConfig);
          }
        },
      });
    }
  }
}
