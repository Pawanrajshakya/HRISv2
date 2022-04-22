import { Component, AfterViewInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { catchError, map, merge, startWith, Subject, switchMap, tap, of as observableOf, Observable } from 'rxjs';
import { ReportParam } from '../_models/report-param';
import { SearchUser, User } from '../_models/user';
import { UserList } from '../_models/user-list';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { Group } from '../_models/group';
import { Role } from '../_models/role';
import { IRC } from '../_models/IRC';
import { IDP } from '../_models/IDP';
import { GroupService } from '../_services/group.service';
import { RoleService } from '../_services/role.service';
import { CodeService } from '../_services/code.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {

  errorMessage: string = '';

  displayedColumns: string[] = ['ein', 'firstName', 'role', 'lanid', 'emailAddress', 'editOption', 'deleteOption'];
  data: UserList[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSizeOptions = [5, 10, 20, 50, 100];
  reportParam: ReportParam = { pageNumber: 1, pageSize: 10 };
  private filterSubject = new Subject<string>();
  filterAction$ = this.filterSubject.asObservable();
  users$: any;
  searchedUser: SearchUser[] = [];
  searchBy: string = "";
  isSuper: boolean = false;
  groups: Group[] = [];
  roles: Role[] = [];
  rcs: IRC[] = [];
  dps: IDP[] = [];
  filteredDPs: IDP[] = [];
  selectedGroup: number[] = [];
  selectedRole?: number;
  selectedRC: string[] = [];
  selectedDP: string[] = [];

  userInput$ = new Subject<string>();
  user$: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modalRef?: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  constructor(
    private userService: UserService
    , private modalService: BsModalService
    , private route: Router
    , private groupService: GroupService
    , private roleService: RoleService
    , private codeService: CodeService
    , private ngSelectConfig: NgSelectConfig) {
    this.ngSelectConfig.appendTo = 'body';
    this.ngSelectConfig.clearAllText = 'Clear';
  }


  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    // mat-table
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // mat-table
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

    this.groupService.groups$.subscribe((data) => {
      this.groups = data as Group[];
    });

    this.roleService.roles$.subscribe((data) => {
      let _data = data as Role[];
      if (_data.length > 0) {
        _data.forEach((role) => {
          if (role.roleID != undefined && role.roleID < 6)
            this.roles.push(role);
        });
      }
    });

    this.codeService.rcs$.subscribe((data) => {
      this.rcs = data as IRC[];
    });

    this.codeService.dps$.subscribe((data) => {
      this.dps = data as IDP[];
      this.filteredDPs = this.dps;
    });

    this.userInput$.subscribe(data => {
      this.users$ = this.userService.search$(data, this.isSuper);
    })
  }


  // mat-table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue);
    this.filterSubject.next(filterValue);
  }

  onAddNew(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.config);
  }

  onEdit(user: User): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  onSubmit(user: NgForm): void {
    console.log(user);
  }

  onCancelClick(): void {
    this.modalRef?.hide();
  }

  onUserSelect($event: Event) {
    console.log($event);
  }

  onRoleSelect($event: Event) {
    console.log($event);
  }

  onRCSelect($event: Event) {
    console.log($event);


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

  onDPSelect($event: Event) {
    console.log($event);
  }

}
