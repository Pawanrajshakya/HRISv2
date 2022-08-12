import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, map, merge, startWith, switchMap, tap, of as observableOf } from 'rxjs';
import { BaseComponent } from '../../base/base.component';
import { IActiveStaffReport } from '../../_models/IActiveStaffReport';
import { IRc, IDp } from '../../_models/IRcDp';
import { Reports } from '../../_models/Reports.enum';
import { StaffService } from '../../_services/staff.service';
import { CodeService } from '../../_services/code.service';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-active-staff',
  templateUrl: './active-staff.component.html',
  styleUrls: ['./active-staff.component.scss']
})
export class ActiveStaffComponent extends BaseComponent<IActiveStaffReport> implements AfterViewInit, OnInit {

  isCollapsed = false;

  constructor(private codeService: CodeService,
    private staffService: StaffService,
    private modalService: BsModalService,
    public loginService: LoginService) {
    super();
  }

  private prepareColoumns() {
    if (this.loginService.currentUser.roleID == 1 || this.loginService.currentUser.roleID == 4) {
      this.displayedColumns = [
        'ein',
        'lastName',
        'firstName',
        'preferredLastName',
        'preferredFirstName',
        'rcName',
        'dpName',
        'csStatus',
        'payTitle',
        'payTitleDate',
        'backupTitle',
        'backupTitleDate',
        'address',
        'actionDate',
        'actionReason'
      ];
    }
    else if (this.loginService.currentUser.roleID !== 1 && this.loginService.currentUser.roleID !== 4) {
      this.displayedColumns = [
        'ein',
        'combinedLastName',
        'combinedFirstName',
        'rcName',
        'dpName',
        'csStatus',
        'payTitle',
        'payTitleDate',
        'backupTitle',
        'backupTitleDate',
        'address',
        'actionDate',
        'actionReason'
      ];
    }
  }

  ngOnInit(): void {
    this.prepareColoumns();
    this.rcs = this.codeService.rc_dp.RC as IRc[];
    this.dps = this.codeService.rc_dp.DP as IDp[];
    this.filteredDPs = this.dps;
    this.locations = this.codeService.locations;
    this.titles = this.codeService.titles;
    this.csStatuses = this.codeService.csStatuses;
    this.bkpTitles = this.codeService.bkpTitles;
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
          if ((typeof filter) != "object") {
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
          return this.staffService.activeStaffReport$(this.reportParam)
            .pipe(
              catchError(() => observableOf(null))
            );
        }),
        map(data => {
          this.resultsLength = this.getResultLength(data);
          return this.resultsLength > 0 ? data : [];
        }),
      )
      .subscribe(data => {
        if (Array.isArray(data))
          this.data = data;
        this.isLoadingResults = false;
      });
  }

  // onRCSelect($event: Event) {
  //   let _selectedDP = this.selectedDP;
  //   let _selectedRC = this.selectedRC;
  //   this.filteredDPs = [];
  //   this.selectedDP = []

  //   if (_selectedRC.length === 0) {
  //     this.filteredDPs = this.dps;
  //   } else {
  //     this.dps.forEach((x) => {
  //       if (_selectedRC.indexOf(x.rcCode || "") != -1) {
  //         this.filteredDPs.push(x);
  //       }
  //       else {

  //         let i = _selectedDP.indexOf(x.dpCode || "");

  //         if (i != -1) {
  //           _selectedDP.splice(i, 1);
  //         }
  //       }
  //     })

  //     _selectedDP.forEach(dp => this.selectedDP.push(dp));
  //   }
  // }

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(",");
    this.reportParam.rcDp.dps = this.selectedDP.join(",");
    this.reportParam.code.backupTitles = this.selectedBkpTitle.join(",");
    this.reportParam.code.cSStatuses = this.selectedCsStatus.join(",");
    this.reportParam.code.locations = this.selectedLocation.join(",");
    this.reportParam.code.titles = this.selectedTitle.join(",");
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();
    this.filterSubject.next(this.filterValue);
  }
  
  onExport() {
    this.download(this.modalService, Reports[0]);
  }

}

