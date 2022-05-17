import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolBaseComponent } from 'src/app/base/tool-base.component';
import { IAnnouncementSummary } from 'src/app/_models/announcement';
import { AnnouncementService } from 'src/app/_services/announcement.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  announcementSummary: IAnnouncementSummary[] = [];

  constructor(private announcementService: AnnouncementService
    , protected _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    this.announcementService.getByUser$().subscribe({
      next: (data) => {

        let announcement = (data as IAnnouncementSummary[]);

        announcement.forEach(element => {
          this.announcementSummary.push(element);
        });
        console.log(this.announcementSummary);

      },
      error: (error) => {
        this._snackBar.open(error.userMessage, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 10000,
        });
      },
      complete: () => {

      }
    });
  }

}
