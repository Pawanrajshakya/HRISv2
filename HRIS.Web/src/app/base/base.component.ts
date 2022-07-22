import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Observable, Subject } from 'rxjs';
import { IGroup } from '../_models/IGroup';
import { IRC, IDP } from '../_models/IRC_DP';
import { IReportFormat, IReportParam } from '../_models/IReportParam';
import { IRole } from '../_models/IRole';
import { ThemeService } from 'ng2-charts';
import { ICurrentUser } from '../_models/ICurrentUser';
import { ICSStatus } from '../_models/ICSStatus';
import { ILocation } from '../_models/ILocation';
import { ITitle } from '../_models/ITitle';
import { IBackupTitle } from '../_models/IBackupTitle';
import { UserService } from '../_services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ILeaveStatus } from '../_models/ILeaveStatus';

@Component({
  selector: 'app-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ]
})
export class BaseComponent<T> {

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
  filterValue: string = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /* Dropdown */
  groups: IGroup[] = [];
  selectedGroup: number[] = [];

  roles: IRole[] = [];

  rcs: IRC[] = [];
  selectedRC: string[] = [];

  dps: IDP[] = [];
  filteredDPs: IDP[] = [];
  selectedDP: string[] = [];

  locations: ILocation[] = [];
  selectedLocation: string[] = [];

  titles: ITitle[] = [];
  selectedTitle: string[] = [];

  lvStatuses:ILeaveStatus[] = [];
  selectedLvStatuses: string[] = [];

  bkpTitles: IBackupTitle[] = [];
  selectedBkpTitle: string[] = [];

  csStatuses: ICSStatus[] = [];
  selectedCsStatus: string[] = [];

  //Report
  // reportFormat: IReportFormat[] =
  //   [
  //     { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extension: '.xlsx' },
  //     { mimeType: 'application/excel', extension: '.xls' },
  //     { mimeType: 'application/pdf', extension: '.pdf' },
  //   ];

  reportParam: IReportParam = {
    reportName: '',
    file: {
      format: 'EXCELOPENXML'
    }, pagination: {
      pageNumber: 1,
      pageSize: 10
    }, rcDp: {
      rcs: '',
      dps: ''
    }, code: {
    }
  };

    /** Model */
    modalRef?: BsModalRef;

    modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg'
    };
    
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
    if (this.clickedRows.size > 1)
      this.clickedRows.clear();
    this.clickedRows.add(row);
  }

  onClear() {
    this.selectedRC = [];
    this.selectedDP = [];
    this.selectedLocation = [];
    this.selectedTitle = [];
    this.selectedCsStatus = [];
    this.selectedBkpTitle = [];
    this.selectedLvStatuses = [];
    this.filterValue = "";
    this.filterSubject.next("");
  }

}
