import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { IGroup } from '../_models/group';
import { IDP } from '../_models/IDP';
import { IRC } from '../_models/IRC';
import { IReportFormat, IReportParam } from '../_models/report-param';
import { IRole } from '../_models/role';

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

  pageSizeOptions = [5, 10, 20, 50, 100];

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

  //Report
  reportFormat: IReportFormat[] =
    [
      { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extension: '.xlsx' },
      { mimeType: 'application/excel', extension: '.xls' },
      { mimeType: 'application/pdf', extension: '.pdf' },
    ];

  reportParam: IReportParam = {
    detail: {
      reportName: '',
      format: this.reportFormat[0]
    }, pagination: {
      pageNumber: 1,
      pageSize: 10
    }, rcDp: {
      rCList: [],
      dPList: []
    }, code: {
    }
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

}
