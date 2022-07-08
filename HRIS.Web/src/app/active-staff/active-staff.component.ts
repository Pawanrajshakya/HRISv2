import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { catchError, map, merge, startWith, switchMap, tap, of as observableOf, Observable } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { ModalBaseComponent } from '../base/tool-base.component';
import { ReportComponent } from '../report/report.component';
import { IActiveStaff } from '../_models/IActiveStaff';
import { IBackupTitle } from '../_models/IBackupTitle';
import { ICSStatus } from '../_models/ICSStatus';
import { ICurrentUser } from '../_models/ICurrentUser';
import { IDP } from '../_models/IDP';
import { ILocation } from '../_models/ILocation';
import { IRC } from '../_models/IRC';
import { ITitle } from '../_models/ITitle';
import { Reports } from '../_models/Reports.enum';
import { ActiveStaffService } from '../_services/active-staff.service';
import { CodeService } from '../_services/code.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-active-staff',
  templateUrl: './active-staff.component.html',
  styleUrls: ['./active-staff.component.scss']
})
export class ActiveStaffComponent extends ModalBaseComponent<IActiveStaff> implements AfterViewInit, OnInit {

  isCollapsed = false;

  currentUser: ICurrentUser = {
    lastName: '',
    firstName: '',
    userGroups: []
  };

  constructor(private codeService: CodeService,
    private userService: UserService,
    private activeStaffService: ActiveStaffService,
    private modalService: BsModalService) {
    super();

    //check loggedIn user - needed if user refresh the browser
    if (this.userService.currentUser.lanID === undefined || this.userService.currentUser.lanID === null) {
      console.log("Current User not found", this.userService.currentUser);
      this.userService.user$.subscribe((data1) => {
        this.currentUser = data1 as ICurrentUser;
        this.prepareColoumns();
      });
    } else {
      console.log("Current User found", this.userService.currentUser);
      this.currentUser = this.userService.currentUser;
      this.prepareColoumns();
    }
  }

  private prepareColoumns() {
    if (this.currentUser.roleID == 1 || this.currentUser.roleID == 4) {
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
    else if (this.currentUser.roleID !== 1 && this.currentUser.roleID !== 4) {
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
          return this.activeStaffService.list$(this.reportParam)
            .pipe(
              catchError(() => observableOf(null))
            );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
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
      });

    this.codeService.rcs$.subscribe((rcs) => {
      this.rcs = rcs as IRC[];
    });

    this.codeService.dps$.subscribe((dps) => {
      this.dps = dps as IDP[];
      this.filteredDPs = this.dps;
    });

    this.codeService.locations$.subscribe((locations) => {
      this.locations = locations as ILocation[];
    });

    this.codeService.csStatuses$.subscribe((csStatus) => {
      this.csStatuses = csStatus as ICSStatus[];
    });

    this.codeService.titles$.subscribe((titles) => {
      this.titles = titles as ITitle[];
    });

    this.codeService.bkpTitles$.subscribe((bkpTitles) => {
      this.bkpTitles = bkpTitles as IBackupTitle[];
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
    this.reportParam.code.cSStatus = this.selectedCsStatus.join(",");
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

    this.modalRef = this.modalService.show(ReportComponent, initialState);
  }

}

