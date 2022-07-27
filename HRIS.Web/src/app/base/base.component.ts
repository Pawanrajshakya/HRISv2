import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { IGroup } from '../_models/IGroup';
import { IRC, IDP } from '../_models/IRC_DP';
import { IReportParam } from '../_models/IReportParam';
import { IRole } from '../_models/IRole';
import { ICSStatus } from '../_models/ICSStatus';
import { ILocation } from '../_models/ILocation';
import { ITitle } from '../_models/ITitle';
import { IBackupTitle } from '../_models/IBackupTitle';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ILeaveStatus } from '../_models/ILeaveStatus';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

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
    

    // chart
    backgroundColor: string[] = ['rgba(247,203,137)', 'rgba(78,162,210)', 'rgba(52,191,120)', 'rgba(110,78,122)', 'rgba(252,114,114)', 'rgba(252,129,82)', 'rgba(197,170,59)', 'rgba(199,110,50)', 'rgba(126,135,135)', 'rgba(162,71,71)'];

  hoverBackgroundColor: string[] = ['#f1ab41', '#037bc0', '#02af57', '#4A235A', '#FC4F4F', '#FC6228', '#B7950B', '#BA4A00', '#5F6A6A', '#8B1A1A'];

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
