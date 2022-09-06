import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { AnnouncementService } from 'src/app/_services/announcement.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 1500, noPause: true, showIndicators: true },
    },
  ],
})
export class CarouselComponent {
  constructor(public announcementService: AnnouncementService) {}
}
