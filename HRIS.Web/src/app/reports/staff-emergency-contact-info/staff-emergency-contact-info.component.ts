import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { catchError, map, merge, startWith, switchMap, tap, of as observableOf } from 'rxjs';
import { BaseComponent } from '../../base/base.component';
import { IActiveStaff } from '../../_models/IActiveStaff';
import { IRC, IDP } from '../../_models/IRC_DP';
import { Reports } from '../../_models/Reports.enum';
import { StaffService } from '../../_services/staff.service';
import { CodeService } from '../../_services/code.service';
import { LoginService } from '../../_services/login.service';
import { DownloadComponent } from '../../download/download.component';
import { IStaffEmergencyContactInfoReport } from 'src/app/_models/IStaffEmergencyContactInfoReport';
import { IStaffEmergencyContactInfo } from 'src/app/_models/IStaffDetail';

@Component({
  selector: 'app-staff-emergency-contact-info',
  templateUrl: './staff-emergency-contact-info.component.html',
  styleUrls: ['./staff-emergency-contact-info.component.scss']
})
export class StaffEmergencyContactInfoComponent extends BaseComponent<IStaffEmergencyContactInfoReport> implements AfterViewInit, OnInit {

  isCollapsed = false;

  emergencyContactInfo: any = [];

  constructor(private codeService: CodeService,
    private staffService: StaffService,
    private modalService: BsModalService,
    public loginService: LoginService) {
    super();
  }

  private prepareColoumns() {
    if (this.loginService.currentUser.roleID == 1 || this.loginService.currentUser.roleID == 4) {
      this.displayedColumns = [
        'ein',
        'lastName',
        'firstName',
        'preferredLastName',
        'preferredFirstName',
        'rcCode',
        'dpCode',
        'workAddress',
        'homeAddress',
        'homePhone',
        'personalEmail',
        'emergencyContactName'
      ];
    }
    else if (this.loginService.currentUser.roleID !== 1 && this.loginService.currentUser.roleID !== 4) {
      this.displayedColumns = [
        'ein',
        'lastName',
        'firstName',
        'rcCode',
        'dpCode',
        'workAddress',
        'homeAddress',
        'homePhone',
        'personalEmail',
        'emergencyContactName'
      ];
    }
  }

  ngOnInit(): void {
    this.prepareColoumns();
    this.rcs = this.codeService.rc_dp.RC as IRC[];
    this.dps = this.codeService.rc_dp.DP as IDP[];
    this.filteredDPs = this.dps;
    this.locations = this.codeService.locations;
  }

  ngAfterViewInit(): void {

    // reset sort order to the first page
    // mat-table sort order
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    //mat-table data loading
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
          return this.staffService.emergencyContactInfoReport$(this.reportParam)
            .pipe(
              tap(),
              catchError(() => observableOf(null))
            );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isRateLimitReached = data === null;
          if (data === null || !(Array.isArray(data))) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          let _data: IActiveStaff = data[0];
          this.resultsLength = (_data) ? _data.total ?? 0 : 0;
          return data;
        }),
      )
      .subscribe({
        next: data => {
          if (Array.isArray(data))
            this.data = data;
          this.isLoadingResults = false;
        }
      });
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

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(",");
    this.reportParam.rcDp.dps = this.selectedDP.join(",");
    this.reportParam.code.locations = this.selectedLocation.join(",");
    this.filterSubject.next(this.filterValue);
  }

  onExport() {
    this.reportParam.reportName = Reports[5];

    const initialState: ModalOptions = {
      initialState: {
        reportParam: this.reportParam
      }
    };

    this.modalRef = this.modalService.show(DownloadComponent, initialState);
  }

  onCancelClick(): void {
    this.modalRef?.hide();
  }

  onShowMore(template: TemplateRef<any>, staff: any): void {
    if (staff.ein) {
      this.staffService.emergencyContactInfo$(staff.ein).subscribe(_emergencyContactInfo => {
        this.emergencyContactInfo = _emergencyContactInfo as IStaffEmergencyContactInfo[];
        this.modalRef = this.modalService.show(template, this.modalConfig);
      });
    }
  }
}

