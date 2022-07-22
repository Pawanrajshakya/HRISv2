import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { catchError, map, merge, startWith, switchMap, tap, of as observableOf, Observable } from 'rxjs';
import { BaseComponent } from '../../base/base.component';
import { IActiveStaff } from '../../_models/IActiveStaff';
import { IRC, IDP } from '../../_models/IRC_DP';
import { Reports } from '../../_models/Reports.enum';
import { StaffService } from '../../_services/staff.service';
import { CodeService } from '../../_services/code.service';
import { LoginService } from '../../_services/login.service';
import { DownloadComponent } from '../../download/download.component';

@Component({
  selector: 'app-active-staff',
  templateUrl: './active-staff.component.html',
  styleUrls: ['./active-staff.component.scss']
})
export class ActiveStaffComponent extends BaseComponent<IActiveStaff> implements AfterViewInit, OnInit {

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
    this.rcs = this.codeService.rc_dp.RC as IRC[];
    this.dps = this.codeService.rc_dp.DP as IDP[];
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
          // Flip flag to show that loading has finished.

          this.isRateLimitReached = data === null;

          if (data === null || !(Array.isArray(data))) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          let _data: IActiveStaff = data[0];
          this.resultsLength = (_data) ? _data.total ?? 0 : 0;
          return data;
        }),
      )
      .subscribe(data => {
        if (Array.isArray(data))
          this.data = data;
        this.isLoadingResults = false;
      });
  }

  onRCSelect($event: Event) {
    let _selectedDP = this.selectedDP;
    let _selectedRC = this.selectedRC;
    this.filteredDPs = [];
    this.selectedDP = []

    if (_selectedRC.length === 0) {
      this.filteredDPs = this.dps;
    } else {
      this.dps.forEach((x) => {
        if (_selectedRC.indexOf(x.rcCode || "") != -1) {
          this.filteredDPs.push(x);
        }
        else {

          let i = _selectedDP.indexOf(x.dpCode || "");

          if (i != -1) {
            _selectedDP.splice(i, 1);
          }
        }
      })

      _selectedDP.forEach(dp => this.selectedDP.push(dp));
    }
  }

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(",");
    this.reportParam.rcDp.dps = this.selectedDP.join(",");
    this.reportParam.code.backupTitles = this.selectedBkpTitle.join(",");
    this.reportParam.code.cSStatuses = this.selectedCsStatus.join(",");
    this.reportParam.code.locations = this.selectedLocation.join(",");
    this.reportParam.code.titles = this.selectedTitle.join(",");
    this.filterSubject.next(this.filterValue);
  }

  onExport() {
    this.reportParam.reportName = Reports[0];

    const initialState: ModalOptions = {
      initialState: {
        reportParam: this.reportParam
      }
    };

    this.modalRef = this.modalService.show(DownloadComponent, initialState);
  }

}

