import { Component, AfterViewInit, TemplateRef } from '@angular/core';
import { catchError, map, merge, startWith, Subject, switchMap, tap, of as observableOf } from 'rxjs';
import { IUser } from '../_models/IUser';
import { IUserList } from "../_models/IUserList";
import { ISearchUser } from "../_models/ISearchUser";
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { IGroup } from '../_models/IGroup';
import { IRole } from '../_models/IRole';
import { IRC, IDP } from '../_models/IRC_DP';
import { CodeService } from '../_services/code.service';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgSelectConfig } from '@ng-select/ng-select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reports } from '../_models/Reports.enum';
import { BaseComponent } from '../base/base.component';
import { DownloadComponent } from '../download/download.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent extends BaseComponent<IUserList> implements AfterViewInit {

  /** Table -- check in BaseComponent*/

  /* User Form - typeahead*/
  typeaheadUserInput$ = new Subject<string>();
  typeaheadSearchedUsers$: any;
  typeaheadSelectedUser: ISearchUser[] = [];

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

  constructor(private userService: UserService
    , private modalService: BsModalService
    , private codeService: CodeService
    , private ngSelectConfig: NgSelectConfig
    , protected _snackBar: MatSnackBar
  ) {
    super();
    this.displayedColumns = ['ein', 'firstName', 'role', 'lanid', 'emailAddress', 'editOption', 'deleteOption'];
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
          return this.userService.list$(this.reportParam)
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

    this.userService.groups$.subscribe((data) => {
      this.groups = data as IGroup[];
    });

    this.userService.roles$.subscribe((data) => {
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



  onAddNew(template: TemplateRef<any>): void {
    this.userForm.message = "";
    this.userForm.title = "Add User";
    this.userForm.inEditMode = false;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onEdit(template: TemplateRef<any>, user: any): void {
    this.userForm.message = "";
    this.userForm.title = "Edit User";
    this.userForm.inEditMode = true;
    this.getUser(user.ein, user.isSuper);
    this.modalRef = this.modalService.show(template, this.modalConfig);
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
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onDeleteConfirm(userID?: string) {
    if (userID !== undefined)
      this.userService.delete$(userID).subscribe({
        next: (data) => {
          console.log("delete success", data);
          this.filterSubject.next(this.filterValue);
          this.ClearUserForm();
          this.modalRef?.hide();
        }, error: (error) => {
          console.error(error.userMessage);
          this._snackBar.open(error.userMessage, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
          })
        }
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

  onExport() {

    this.reportParam.reportName = Reports[1];

    const initialState: ModalOptions = {
      initialState: {
        reportParam: this.reportParam
      }
    };

    this.modalRef = this.modalService.show(DownloadComponent, initialState);
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
