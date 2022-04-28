import { Component, AfterViewInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, merge, startWith, Subject, switchMap, tap, of as observableOf, Observable } from 'rxjs';
import { IReportParam } from '../_models/report-param';
import { ISearchUser, IUser, IUserList } from '../_models/user';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { IGroup } from '../_models/group';
import { IRole } from '../_models/role';
import { IRC } from '../_models/IRC';
import { IDP } from '../_models/IDP';
import { GroupService } from '../_services/group.service';
import { RoleService } from '../_services/role.service';
import { CodeService } from '../_services/code.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgSelectConfig } from '@ng-select/ng-select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {

  /*SnackBar - config*/
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /** Table */
  displayedColumns: string[] = ['ein', 'firstName', 'role', 'lanid', 'emailAddress', 'editOption', 'deleteOption'];
  data: IUserList[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSizeOptions = [5, 10, 20, 50, 100];
  reportParam: IReportParam = { pageNumber: 1, pageSize: 10 };
  private filterSubject = new Subject<string>();
  filterAction$ = this.filterSubject.asObservable();
  clickedRows = new Set<IUserList>();
  filterValue: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Model */
  modalRef?: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  /* User Form - typeahead*/
  typeaheadUserInput$ = new Subject<string>();
  typeaheadSearchedUsers$: any;
  typeaheadSelectedUser: ISearchUser[] = [];

  /* Dropdown */
  groups: IGroup[] = [];
  selectedGroup: number[] = [];

  roles: IRole[] = [];

  rcs: IRC[] = [];
  selectedRC: string[] = [];

  dps: IDP[] = [];
  filteredDPs: IDP[] = [];
  selectedDP: string[] = [];

  /* User Form */
  user: IUser = {
    isSuper: false,
    lanID: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    ein: "",
    roleID: 1,
    usersGroups: [],
    rCs: [],
    dPs: []
  };

  userForm = {
    inEditMode: false,
    message: "",
    title: "",
    isBusy: false
  }

  constructor(
    private userService: UserService
    , private modalService: BsModalService
    , private groupService: GroupService
    , private roleService: RoleService
    , private codeService: CodeService
    , private ngSelectConfig: NgSelectConfig
    , private _snackBar: MatSnackBar) {
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
          let user: IUserList = data[0];
          this.resultsLength = (user) ? user.total ?? 0 : 0;
          return data;
        }),
      )
      .subscribe(data => {
        if (Array.isArray(data))
          this.data = data;
      });

    this.groupService.groups$.subscribe((data) => {
      this.groups = data as IGroup[];
    });

    this.roleService.roles$.subscribe((data) => {
      let _data = data as IRole[];
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

    this.typeaheadUserInput$.subscribe(data => {
      this.typeaheadSearchedUsers$ = this.userService.search$(data, this.user.isSuper || false);
    })
  }

  // mat-table
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', this.filterValue);
    this.filterSubject.next(this.filterValue);
  }

  onAddNew(template: TemplateRef<any>): void {
    this.userForm.message = "";
    this.userForm.title = "Add User";
    this.userForm.inEditMode = false;
    this.modalRef = this.modalService.show(template, this.config);
  }

  onEdit(template: TemplateRef<any>, user: any): void {
    this.userForm.message = "";
    this.userForm.title = "Edit User";
    this.userForm.inEditMode = true;
    this.getUser(user.ein, user.isSuper);
    this.modalRef = this.modalService.show(template, this.config);
  }

  private ClearUserForm() {
    this.user.ein = "";
    this.user.isSuper = false;
    this.user.firstName = "";
    this.user.lastName = "";
    this.user.lanID = "";
    this.user.emailAddress = "";
    this.user.roleID = 1;
    this.selectedGroup = [];
    this.selectedRC = [];
    this.selectedDP = [];
    this.typeaheadSelectedUser = [];
    this.userForm.message = "";
    this.userForm.title = "Add User";
    this.userForm.inEditMode = false;
  }

  private getUser(ein: string, isSuper: boolean) {
    this.userService.getByEIN$(ein, isSuper).subscribe({
      next: (data) => {
        const user = data as IUser;
        this.user.ein = user.ein ?? '';
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.user.lanID = user.lanID ?? '';
        this.user.emailAddress = user.emailAddress ?? '';
        this.user.isSuper = user.isSuper ?? false;
        (user.roleID !== null && (user.roleID ?? 6 <= 5)) ? this.user.roleID = user.roleID : '';
        (user.usersGroups !== null && user.usersGroups.length > 0) ? this.selectedGroup = user.usersGroups : "";
        (user.rCs !== null && user.rCs.length > 0) ? this.selectedRC = user.rCs : "";
        (user.dPs !== null && user.dPs.length > 0) ? this.selectedDP = user.dPs : "";
        (user.isHRISUser) ? this.userForm.title = "Modify User" : this.userForm.title = "Add User";
      }, error: (error) => {
        console.error(error.userMessage);
        this._snackBar.open(error.userMessage, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 10000,
        });
      }
    });
  }

  onTypeaheadSelect($event: ISearchUser) {
    if ($event === null || $event === undefined)
      return;
    this.getUser($event.ein, this.user.isSuper || false);
  }

  onDelete(template: TemplateRef<any>, user: any): void {
    console.log(user);
    this.user.ein = user.ein;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.modalRef = this.modalService.show(template, this.config);
  }

  onDeleteConfirm(userID?: string) {
    if (userID !== undefined)
      this.userService.delete$(userID).subscribe((data) => {
        console.log("delete success", data);
        this.filterSubject.next(this.filterValue);
        this.ClearUserForm();
        this.modalRef?.hide();
      }, (error) => {
        console.error(error.userMessage);
        this._snackBar.open(error.userMessage, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 10000,
        })
      });
  }

  onSubmit(user: NgForm): void {
    console.log(user.form);

    this.userForm.isBusy = true;
    this.userForm.message = "";

    this.user.usersGroups = this.selectedGroup;
    this.user.rCs = this.selectedRC;
    this.user.dPs = this.selectedDP;
    this.user.userID = this.user.ein;

    if (this.userForm.inEditMode) {
      this.userService.update$(this.user).subscribe({
        next: (data) => {
          this.filterSubject.next(this.filterValue);
          this.modalRef?.hide();
          this.ClearUserForm();
        }, error: (error) => {
          this.userForm.message = " - " + error.userMessage;
          this._snackBar.open(error.userMessage, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
          })
        },
        complete: () => {
          this.userForm.isBusy = false;
        }
      });

    } else {
      this.userService.add$(this.user).subscribe({
        next: (data) => {
          this.filterSubject.next(this.filterValue);
          this.modalRef?.hide();
          this.ClearUserForm();
        }, error: (error) => {
          this.userForm.message = " - " + error.userMessage;
          this._snackBar.open(error.userMessage, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
          })
        },
        complete: () => {
          this.userForm.isBusy = false;
        }
      });
    }
  }

  onCancelClick(): void {
    this.ClearUserForm();
    this.modalRef?.hide();
  }

  onIsSuperClick() {
  }

  onRoleSelect($event: Event) {
    console.log($event);
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

  onRCSelectAllClick() {
    if (this.selectedRC.length === 0) {
      this.selectedRC = [];
      this.rcs.forEach((x) => {
        this.selectedRC.push(x.code || "NO DATA")
      });
    } else {
      this.selectedRC = [];
    }
  }

  getRCSelectLabel() {
    return this.selectedRC.length > 0 ? 'Clear' : 'Select All RCs';
  }

  onDPSelectAllClick() {
    if (this.selectedDP.length === 0) {
      this.selectedDP = [];
      this.filteredDPs.forEach((x) => {
        this.selectedDP.push(x.dpCode || "NO DATA")
      });
    } else {
      this.selectedDP = [];
    }
  }

  getDPSelectLabel() {
    return this.selectedDP.length > 0 ? 'Clear' : 'Select All DPs';
  }

  onDPSelect($event: Event) {
    console.log($event);
  }

  validateUserForm(): boolean {
    let isValid = false;

    isValid = (this.user.firstName.length > 0) && (this.user.lastName.length > 0)

    return isValid;
    // return false;
  }
}
