import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAnnouncementSummary } from "src/app/_models/IAnnouncementSummary";
import { AnnouncementService } from 'src/app/_services/announcement.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  announcementSummary: IAnnouncementSummary[] = [];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.announcementService.getByUser$().subscribe({
      next: (data) => {

        if (data) {

          let announcement = (data as IAnnouncementSummary[]);

          announcement.forEach(element => {
            this.announcementSummary.push(element);
          });
          console.log(this.announcementSummary);
        }
      },
      error: (error) => {
        // this._snackBar.open(error.userMessage, 'Close', {
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top',
        //   duration: 10000,
        // });
      },
      complete: () => {

      }
    });
  }

}
