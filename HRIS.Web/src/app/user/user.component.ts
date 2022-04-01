import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { catchError, map, merge, startWith, Subject, switchMap, tap, of as observableOf } from 'rxjs';
import { ReportParam } from '../_models/report-param';
import { User } from '../_models/user';
import { UserList } from '../_models/user-list';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {

  errorMessage: string = '';

  displayedColumns: string[] = ['ein', 'firstName', 'role', 'lanid', 'emailAddress','editOption','deleteOption'];
  data: UserList[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSizeOptions = [5, 10, 20, 50, 100];
  reportParam: ReportParam = { pageNumber: 1, pageSize: 10 };
  private filterSubject = new Subject<string>();
  filterAction$ = this.filterSubject.asObservable();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, 
    private route: Router) {
  }


  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.filterAction$)
      .pipe(
        startWith({}),
        tap((filter) => {
          //console.log('a', JSON.stringify(a), this.reportParam.searchTerm);
          if ((typeof filter) != "object") {
            this.reportParam.searchTerm = filter.toString();
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 10;
          }
        }),
        switchMap(() => {
          this.isLoadingResults = true;
          this.reportParam.pageNumber = this.paginator.pageIndex + 1;
          this.reportParam.pageSize = this.paginator.pageSize;
          this.reportParam.sortColumn = this.sort.active;
          this.reportParam.sortOrder = this.sort.direction;
          return this.userService.list$(this.reportParam
          )
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
          let user: UserList = data[0];
          this.resultsLength = (user) ? user.total ?? 0 : 0;
          return data;
        }),
      )
      .subscribe(data => {
        if (Array.isArray(data))
          this.data = data;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue);
    this.filterSubject.next(filterValue);
  }
  onEdit(user: User): void {
  }
  
}

