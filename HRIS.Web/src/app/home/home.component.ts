import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../_services/announcement.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.announcementService.getByUser().then((data) => {
      if (data && data.length > 0) this.announcementService.selectedAnnouncement.emit(data);
    });
  }
}
