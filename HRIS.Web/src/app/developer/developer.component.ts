import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { EMPTY, Subject, merge, of as observableOf } from 'rxjs';
import { catchError, switchMap, tap, startWith, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IReportParam } from '../_models/report-param';
import { ICurrentUser, IUserList } from '../_models/user';
import { HRISError } from '../_models/hriserror';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})

export class DeveloperComponent implements AfterViewInit {

  errorMessage: string = '';

  displayedColumns: string[] = ['firstName', 'role', 'groups', 'lanid', 'options'];
  data: IUserList[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSizeOptions = [5, 10, 20, 50, 100];
  reportParam: IReportParam = { pageNumber: 1, pageSize: 10 };
  lanID = "";
  private filterSubject = new Subject<string>();
  filterAction$ = this.filterSubject.asObservable();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private route: Router) {
    this.userService.loginSubject.next("");
  }


  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    //this.reportParam.searchTerm = "";

    //console.log(this.sort.sortChange, this.paginator.page);

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
          let user: IUserList = data[0];
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

  onLogin(user: ICurrentUser): void {
    this.userService.loginSubject.next(user.lanID ?? "");
    this.userService.user$.subscribe((user) => {
      console.log('onLogin>user>', user);
      this.route.navigate(["home"]);
    });
  }

  onLoginClick(): void {
    if (this.lanID.length === 0) {
      this.errorMessage = "Invalid User.";
      return;
    }
    this.userService.loginSubject.next(this.lanID);
    this.userService.user$.subscribe((user) => {
      this.route.navigate(["home"]);
    }, (error: HRISError) => {
      this.errorMessage = error.userMessage ?? "Error";
    });
  }
}



  ///*create Subject -- step 1*/
  //private roleSelectedSubject = new BehaviorSubject<number>(0); //BehaviorSubject has start value
  //private groupSelectedSubject = new BehaviorSubject<number>(0); //BehaviorSubject has start value
  ///*create action observable -- step 2*/
  //roleSelectedAction$ = this.roleSelectedSubject.asObservable();
  //groupSelectedAction$ = this.groupSelectedSubject.asObservable();

  //ngOnInit(): void {




  //  //this.dataSource = new MatTableDataSource<User>(this.users);
  //}



  //users$ = combineLatest(this.roleSelectedAction$, this.groupSelectedAction$).pipe(
  //  tap(x => { console.log('x', x) }),
  //  switchMap((id1) => this.userService.usersRoleFilter$(id1[0], id1[1]))
  //).pipe(
  //  catchError(err => {
  //    //show error to user
  //    this.errorMessage = err;
  //    return EMPTY;
  //  }));

  ////users$ = this.userService.users$
  ////.pipe(
  ////  catchError(err => {
  ////    //show error to user
  ////    this.errorMessage = err;
  ////    return EMPTY;
  ////  })
  ////);

  //roles$ = this.roleService.roles$
  //  .pipe(
  //    catchError(err => {
  //      //show error to user
  //      this.errorMessage = err;
  //      return EMPTY;
  //    })
  //  );


  //groups$ = this.groupService.groups$
  //  .pipe(
  //    catchError(err => {
  //      //show error to user
  //      this.errorMessage = err;
  //      return EMPTY;
  //    })
  //  );



  //onSelectedRole(roleID: number): void {
  //  console.log(this.roleSelectedSubject.value);
  //  this.roleSelectedSubject.next(roleID);
  //}

  //onSelectedGroup(groupID: number): void {
  //  console.log(this.groupSelectedSubject.value);
  //  this.groupSelectedSubject.next(groupID);
  //}

  //onLogin(user: User): void {
  //  this.userService.loginSubject.next(user.lanID ?? "");
  //}
//}
