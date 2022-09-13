import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { IGroup } from '../_models/IGroup';
import { IRc, IDp, IDpGroup } from '../_models/IRcDp';
import { IReportParam } from '../_models/IReportParam';
import { IRole } from '../_models/IRole';
import { ICSStatus } from '../_models/ICSStatus';
import { ILocation } from '../_models/ILocation';
import { ITitle } from '../_models/ITitle';
import { IBackupTitle } from '../_models/IBackupTitle';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ILeaveStatus } from '../_models/ILeaveStatus';
import { DownloadComponent } from '../download/download.component';
import { IEmployeeBehavior } from '../_models/IEmployeeBehavior';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-base',
  template: ` <p>base works!</p> `,
  styles: [],
})
export class BaseComponent<T> {
  header: string = '';

  /*SnackBar - config*/
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /** table */
  displayedColumns: string[] = [];
  data: T[] = [];
  clickedRows = new Set<T>();

  pageSizeOptions = [10, 25, 50, 100];

  protected filterSubject = new Subject<string>();
  filterAction$ = this.filterSubject.asObservable();
  filterValue: string = '';
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /* Dropdown */
  groups: IGroup[] = [];
  selectedGroup: number[] = [];

  roles: IRole[] = [];

  rcs: IRc[] = [];
  selectedRC: string[] = [];

  dps: IDp[] = [];
  filteredDPs: IDp[] = [];
  selectedDP: string[] = [];

  groupDPs: IDpGroup[] = [];
  filteredGroupDPs: IDpGroup[] = [];
  selectedGroupDP: string[] = [];

  locations: ILocation[] = [];
  selectedLocation: string[] = [];

  titles: ITitle[] = [];
  selectedTitle: string[] = [];

  lvStatuses: ILeaveStatus[] = [];
  selectedLvStatuses: string[] = [];

  bkpTitles: IBackupTitle[] = [];
  selectedBkpTitle: string[] = [];

  csStatuses: ICSStatus[] = [];
  selectedCsStatus: string[] = [];

  employeeBehaviors: IEmployeeBehavior[] = [];
  selectedJobCenter: string[] = [];
  selectedFoodCenter: string[] = [];
  selectedHRAFacility: string[] = [];
  selectedRequestStatus: string[] = [];

  dateFrom: string = '';
  dateTo: string = '';

  reportParam: IReportParam = {
    reportName: 'unknown',
    file: {
      format: 'EXCELOPENXML',
    },
    pagination: {
      pageNumber: 1,
      pageSize: 10,
    },
    rcDp: {
      rcs: '',
      dps: '',
    },
    code: {},
    fields: [],
  };

  /** Model */
  modalRef?: BsModalRef;

  modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg',
  };

  // chart
  backgroundColor: string[] = [
    'rgba(252,129,82)',

    'rgba(78,162,210)',
    'rgba(52,191,120)',
    'rgba(110,78,122)',
    'rgba(252,114,114)',
    'rgba(247,203,137)',
    'rgba(197,170,59)',
    'rgba(199,110,50)',
    'rgba(126,135,135)',
    'rgba(162,71,71)',
  ];

  transparentBackgroundColor: string[] = [
    'rgba(252,129,82,0.4)',

    'rgba(78,162,210,0.4)',
    'rgba(52,191,120,0.4)',
    'rgba(110,78,122,0.4)',
    'rgba(252,114,114,0.4)',
    'rgba(247,203,137,0.4)',
    'rgba(197,170,59,0.4)',
    'rgba(199,110,50,0.4)',
    'rgba(126,135,135,0.4)',
    'rgba(162,71,71,0.4)',
  ];

  hoverBackgroundColor: string[] = [
    '#FC6228',
    '#037bc0',
    '#02af57',
    '#4A235A',
    '#FC4F4F',
    '#f1ab41',
    '#B7950B',
    '#BA4A00',
    '#5F6A6A',
    '#8B1A1A',
  ];

  borderRadius: number = 10;

  borderWidth: number = 2;

  borderColor: string = 'white';

  //chart end

  constructor() {
    //this.ngSelectConfig.appendTo = 'body';
    //this.ngSelectConfig.clearAllText = 'Clear';
  }

  // mat-table
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(this.filterValue);
  }

  clearClickedRow(row: T) {
    if (this.clickedRows.size > 1) this.clickedRows.clear();
    this.clickedRows.add(row);
  }

  getResultLength(data: any[] | null) {
    // Flip flag to show that loading has finished.
    this.isRateLimitReached = true;
    this.resultsLength = 0;
    if (!data || data.length === 0) return 0;
    // Only refresh the result length if there is new data. In case of rate
    // limit errors, we do not want to reset the paginator to zero, as that
    // would prevent users from re-triggering requests.
    return data[0].total ?? 0;
  }

  download(modalService: BsModalService, reportName: string) {
    this.reportParam.reportName = reportName;

    const initialState: ModalOptions = {
      initialState: {
        reportParam: this.reportParam,
      },
    };

    this.modalRef = modalService.show(DownloadComponent, initialState);
  }

  onGroupRcSelect($event: Event) {
    let _selectedGroupDP = this.selectedGroupDP;
    let _selectedRC = this.selectedRC;
    this.filteredGroupDPs = [];
    this.selectedDP = [];

    if (_selectedRC.length === 0) {
      this.filteredGroupDPs = this.dps;
    } else {
      this.groupDPs.forEach((x) => {
        if (_selectedRC.indexOf(x.rcCode || '') != -1) {
          this.filteredGroupDPs.push(x);
        } else {
          let i = _selectedGroupDP.indexOf(x.rcCode || '');

          if (i != -1) {
            _selectedGroupDP.splice(i, 1);
          }
        }
      });

      _selectedGroupDP.forEach((dp) => this.selectedGroupDP.push(dp));
    }
  }

  onRCSelect($event: Event) {
    let _selectedDP = this.selectedDP;
    let _selectedRC = this.selectedRC;
    this.filteredDPs = [];
    this.selectedDP = [];

    if (_selectedRC.length === 0) {
      this.filteredDPs = this.dps;
    } else {
      this.dps.forEach((x) => {
        if (_selectedRC.indexOf(x.rcCode || '') != -1) {
          this.filteredDPs.push(x);
        } else {
          let i = _selectedDP.indexOf(x.dpCode || '');

          if (i != -1) {
            _selectedDP.splice(i, 1);
          }
        }
      });

      _selectedDP.forEach((dp) => this.selectedDP.push(dp));
    }
  }

  clear(hasTable: boolean = true) {
    this.selectedGroup = [];
    this.selectedRC = [];
    this.selectedDP = [];
    this.selectedGroupDP = [];
    this.selectedLocation = [];
    this.selectedTitle = [];
    this.selectedLvStatuses = [];
    this.selectedBkpTitle = [];
    this.selectedCsStatus = [];
    this.filteredDPs = this.dps;
    this.filteredGroupDPs = this.groupDPs;
    this.reportParam.userID = '';
    this.reportParam.ein = '';
    this.reportParam.pagination.pageNumber = 1;
    this.reportParam.pagination.pageSize = 10;
    this.reportParam.pagination.sortColumn = '';
    this.reportParam.pagination.sortOrder = '';
    this.reportParam.pagination.searchTerm = '';
    this.reportParam.rcDp.isAgencyWise = false;
    this.reportParam.rcDp.rcs = '';
    this.reportParam.rcDp.dps = '';
    this.reportParam.code.backupTitles = '';
    this.reportParam.code.locations = '';
    this.reportParam.code.cSStatuses = '';
    this.reportParam.code.titles = '';
    this.reportParam.code.lvStatuses = '';
    this.reportParam.dateFrom = '';
    this.reportParam.dateTo = '';
    this.reportParam.openClose = '';
    this.reportParam.isCalendarYear = true;
    this.filterValue = '';
    if (hasTable) this.sort._stateChanges.next();
    this.filterSubject.next('');
  }

  convertToNumberFormat(value: any) {
    if (Number(value) !== NaN)
      return formatNumber(Number(value), 'en-US', '1.0-0');

    return formatNumber(Number(value.ToString()), 'en-US', '1.0-0');
  }
}
