import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_shared/material.module';
import { PipeModule } from '../_shared/pipe.module';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CarouselComponent } from './announcement/carousel/carousel.component';
import { UserComponent } from './user/user.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule } from '@angular/router';
import { CurrentUserResolver } from '../_services/_resolvers/current-user-resolver.service';
import { AdminToolGuard } from '../_services/_guard/admin-tool.guard';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PipeModule,
    CarouselModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'user',
        component: UserComponent,
        resolve: { currentUser: CurrentUserResolver },
        canActivate: [AdminToolGuard],
      },
      {
        path: 'announcement',
        component: AnnouncementComponent,
        resolve: { currentUser: CurrentUserResolver },
        canActivate: [AdminToolGuard],
      },
    ]),
  ],
  declarations: [AnnouncementComponent, CarouselComponent, UserComponent],
  exports: [AnnouncementComponent, CarouselComponent, UserComponent],
})
export class ToolModule {}
