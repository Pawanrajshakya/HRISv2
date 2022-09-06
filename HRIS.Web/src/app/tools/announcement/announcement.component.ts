import { formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgSelectConfig } from '@ng-select/ng-select';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  catchError,
  map,
  merge,
  startWith,
  switchMap,
  tap,
  of as observableOf,
} from 'rxjs';
import { IAnnouncementSummary } from 'src/app/_models/IAnnouncementSummary';
import { BaseComponent } from '../../base/base.component';
import { IAnnouncement } from '../../_models/IAnnouncement';
import { IAnnouncementList } from '../../_models/IAnnouncementList';
import { IRole } from '../../_models/IRole';
import { AnnouncementService } from '../../_services/announcement.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent
  extends BaseComponent<IAnnouncementList>
  implements AfterViewInit
{
  announcementForm = {
    inEditMode: false,
    message: '',
    fileUploadMessage: '',
    file: File,
    title: '',
    isBusy: false,
    defaultImage: false,
    bsStartDateValue: new Date(),
    bsEndDateValue: new Date(),
  };

  selectedAnnouncement = {
    id: 0,
    title: '',
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
    roles: [],
  };

  bsConfig?: Partial<BsDatepickerConfig>;

  applyTheme() {
    // create new object on each property change
    // so Angular can catch object reference change
    this.bsConfig = Object.assign(
      {},
      { containerClass: 'theme-blue', isAnimated: true }
    );
  }

  // bsInlineRangeValue?: Date;

  @ViewChild('fileUpload', { static: false }) fileUploadElement:
    | ElementRef
    | undefined;

  constructor(
    private announcementService: AnnouncementService,
    private userService: UserService,
    private modalService: BsModalService,
    private ngSelectConfig: NgSelectConfig
  ) {
    super();
    this.displayedColumns = [
      'id',
      'title',
      'priority',
      'durationRestricted',
      'status',
      'updatedBy',
      'dateUpdated',
      'editOption',
      'deleteOption',
    ];
    this.applyTheme();
    //this.bsInlineRangeValue = []
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
          if (typeof filter != 'object') {
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
          return this.announcementService
            .tableList$(this.reportParam)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = true;

          if (!data) return [];

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          let user: IAnnouncementList = data[0];
          this.resultsLength = user ? user.total ?? 0 : 0;
          return data;
        })
      )
      .subscribe({
        next: (data) => {
          if (Array.isArray(data)) this.data = data;
          this.isLoadingResults = false;
        },
        error: (error) => {
          this.isLoadingResults = false;
        },
      });

    this.userService.roles$.subscribe((data) => {
      let _data = data as IRole[];
      if (_data.length > 0) {
        _data.forEach((role) => {
          //if (role.roleID != undefined && role.roleID < 6)
          this.roles.push(role);
        });
      }
    });
  }

  onSubmit(announcement: NgForm): void {
    this.announcementForm.isBusy = true;
    this.announcementForm.message = '';

    if (Date.parse(this.announcementForm.bsStartDateValue.toString()) > 0)
      this.announcement.displayAfter = formatDate(
        this.announcementForm.bsStartDateValue.toString(),
        'MM/dd/yyyy',
        'en-US'
      );

    if (Date.parse(this.announcementForm.bsEndDateValue.toString()) > 0)
      this.announcement.displayUntil = formatDate(
        this.announcementForm.bsEndDateValue.toString(),
        'MM/dd/yyyy',
        'en-US'
      );

    if (!this.announcementForm.inEditMode) {
      this.announcementService.add$(this.announcement).subscribe({
        next: (data) => {
          this.filterSubject.next(this.filterValue);
          this.modalRef?.hide();
          this.ClearUserForm();
        },
        error: (error) => {
          this.announcementForm.message = ' - ' + error.userMessage;
          // this._snackBar.open(error.userMessage, 'Close', {
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          //   duration: 10000,
          // })
        },
        complete: () => {
          this.announcementForm.isBusy = false;
        },
      });
    } else {
      this.announcementService.update$(this.announcement).subscribe({
        next: (data) => {
          this.filterSubject.next(this.filterValue);
          this.modalRef?.hide();
          this.ClearUserForm();
        },
        error: (error) => {
          this.announcementForm.message = ' - ' + error.userMessage;
          // this._snackBar.open(error.userMessage, 'Close', {
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          //   duration: 10000,
          // })
        },
        complete: () => {
          this.announcementForm.isBusy = false;
        },
      });
    }
  }

  public onPriorityClick(isUp: boolean, row: IAnnouncementList) {
    if (isUp && row.priority === 1) return;

    if (!isUp && row.priority === row.total) return;

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
      },
    });
  }

  onCancelClick() {
    this.modalRef?.hide();
    this.ClearUserForm();
  }

  onDelete(template: TemplateRef<any>, announcement: any): void {
    this.selectedAnnouncement.id = announcement.id;
    this.selectedAnnouncement.title = announcement.title;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onShow(template: TemplateRef<any>, id: number) {
    this.announcementService.get$(id).subscribe({
      next: (data) => {
        if (data) {
          this.modalConfig.ignoreBackdropClick = false;
          this.modalConfig.backdrop = false;
          this.modalConfig.class = 'modal-md';
          this.modalRef = this.modalService.show(template, this.modalConfig);

          this.announcementService.get$(id).subscribe((data) => {
            if (data) this.announcementService.selectedAnnouncement.emit(data);
          });
          this.modalConfig.ignoreBackdropClick = true;
          this.modalConfig.backdrop = true;
          this.modalConfig.class = 'modal-lg';
        }
      },
    });
  }

  onDeleteConfirm(id: number) {
    if (id > 0)
      this.announcementService.delete$(id).subscribe({
        next: (data) => {
          this.filterSubject.next(this.filterValue);
        },
        error: (error) => {
          // this._snackBar.open(error.userMessage, 'Close', {
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          //   duration: 10000,
          // })
        },
        complete: () => {
          this.modalRef?.hide();
        },
      });
  }

  onAddNew(template: TemplateRef<any>): void {
    this.announcementForm.message = '';
    this.announcementForm.title = 'Add Announcement';
    this.announcementForm.inEditMode = false;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  onEdit(template: TemplateRef<any>, id: number) {
    console.log(id);

    this.announcementService.get$(id).subscribe({
      next: (data) => {
        var _data = (data as unknown as IAnnouncement[])[0];
        console.log(_data, _data.imageURL);
        this.announcementForm.inEditMode = true;

        this.announcementForm.title = 'Edit Announcement';

        this.announcementForm.defaultImage =
          _data.imageURL !== undefined
            ? _data.imageURL.toLowerCase().indexOf('default.jpg') > 0
            : false;

        this.announcementForm.bsStartDateValue = new Date(_data.displayAfter);
        this.announcementForm.bsEndDateValue = new Date(_data.displayUntil);
        this.announcement.durationRestricted = _data.durationRestricted;

        this.announcement.id = _data.id;
        this.announcement.title = _data.title;
        this.announcement.content = _data.content;
        this.announcement.imageURL = _data.imageURL;
        this.announcement.link = _data.link;
        this.announcement.priority = _data.priority;
        this.announcement.roles = _data.roles;

        this.modalRef = this.modalService.show(template, this.modalConfig);
      },
      error: (error) => {
        // this._snackBar.open(error.userMessage, 'Close', {
        //   horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,
        //   duration: 10000,
        // });
      },
      complete: () => {},
    });
  }

  validateForm(): boolean {
    let isValid = false;
    isValid =
      !this.announcementForm.defaultImage && this.announcement.imageURL === '';
    return isValid;
  }

  fileChange(e: Event) {
    this.announcementForm.fileUploadMessage = '';

    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    console.log(file);

    if (file !== undefined) {
      var isImage = file.name.match(/.(jpg|png|jpeg)$/i);
      if (isImage === null) {
        this.announcementForm.fileUploadMessage = 'Invalid Image.';
        return;
      }

      var formData = new FormData();
      formData.append('file', file, file.name);

      this.announcementService.upload$(0, formData).subscribe({
        next: (data) => {
          this.announcement.imageURL = data as string;
        },
        error: (error) => {
          this.announcementForm.fileUploadMessage = error.userMessage;
        },
        complete: () => {},
      });

      console.log(isImage);
    }
  }

  defaultImageChange() {
    this.announcementForm.fileUploadMessage = '';
    this.announcement.imageURL = '';
  }

  private ClearUserForm() {
    this.announcementForm.inEditMode = false;
    this.announcementForm.message = '';
    this.announcementForm.fileUploadMessage = '';
    this.announcementForm.title = 'Add Announcement';
    this.announcementForm.isBusy = false;
    this.announcementForm.defaultImage = false;
    this.announcementForm.bsStartDateValue = new Date();
    this.announcementForm.bsEndDateValue = new Date();
    this.announcement.roles = [];
    this.announcement.id = 0;
    this.announcement.title = '';
    this.announcement.content = '';
    this.announcement.imageURL = '';
    this.announcement.link = '';
    this.announcement.durationRestricted = false;
    this.announcement.displayAfter = '';
    this.announcement.displayUntil = '';
    this.announcement.priority = 0;
    this.announcement.emailSent = false;
    this.announcement.createdBy = '';
    this.announcement.dateCreated = '';
    this.announcement.updatedBy = '';
    this.announcement.isActive = true;
    this.announcement.isVisible = true;
    this.announcement.roles = [];
  }
}
