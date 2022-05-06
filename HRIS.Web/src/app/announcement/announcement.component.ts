import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgSelectConfig } from '@ng-select/ng-select';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, map, merge, startWith, switchMap, tap, of as observableOf } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { ToolBaseComponent } from '../base/tool-base.component';
import { IAnnouncement, IAnnouncementList } from '../_models/announcement';
import { AnnouncementService } from '../_services/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent extends ToolBaseComponent<IAnnouncementList> implements AfterViewInit {


  announcementForm = {
    inEditMode: false,
    message: "",
    title: "",
    isBusy: false,
    defaultImage: false
  }

  selectedAnnouncement = {
    id: 0,
    title: ''
  };

  announcement: IAnnouncement = {
    id: 0,
    title: '',
    content: '',
    imageURL: '',
    link: '',
    durationRestricted: false,
    displayAfter: '',
    displayUntil: '',
    priority: 0,
    emailSent: false,
    createdBy: '',
    dateCreated: '',
    updatedBy: '',
    isActive: true,
    isVisible: true,
    roles: ''

  };

  constructor(private announcementService: AnnouncementService
    , private modalService: BsModalService
    , private __ngSelectConfig: NgSelectConfig
    , protected _snackBar: MatSnackBar) {
    super(__ngSelectConfig);
    this.displayedColumns = ['id', 'title', 'priority', 'durationRestricted', 'status', 'updatedBy', 'dateUpdated', 'editOption', 'deleteOption'];
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
          return this.announcementService.tableList$(this.reportParam)
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
          let user: IAnnouncementList = data[0];
          this.resultsLength = (user) ? user.total ?? 0 : 0;
          return data;
        }),
      )
      .subscribe(data => {
        if (Array.isArray(data))
          this.data = data;
      });
  }

  onSubmit(announcement: NgForm): void {
  }

  public onPriorityClick(isUp: boolean, row: IAnnouncementList) {
    console.log(row);

    if (isUp && (row.priority === 1))
      return;

    if (!isUp && (row.priority === row.total))
      return;

    let _priority = isUp ? -1 : 1;

    this.announcementService.updatePriority$(row.id, _priority).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.filterSubject.next(this.filterValue);
      }
    });
  }

  onCancelClick() {
    this.modalRef?.hide();
  }

  onDelete(template: TemplateRef<any>, announcement: any): void {
    this.selectedAnnouncement.id = announcement.id;
    this.selectedAnnouncement.title = announcement.title;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onDeleteConfirm(id: number) {
    if (id > 0)
      this.announcementService.delete$(id).subscribe({
        next: (data) => {
          this.filterSubject.next(this.filterValue);
        },
        error: (error) => {
          this._snackBar.open(error.userMessage, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
          })
        },
        complete: () => {
          this.modalRef?.hide();
        }
      });

  }

  onAddNew(template: TemplateRef<any>): void {
    this.announcementForm.message = "";
    this.announcementForm.title = "Add Announcement";
    this.announcementForm.inEditMode = false;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  validateUserForm(): boolean {
    let isValid = false;

    //isValid = (this.user.firstName.length > 0) && (this.user.lastName.length > 0)

    return isValid;
    // return false;
  }
}
