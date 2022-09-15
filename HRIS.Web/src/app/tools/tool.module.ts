import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_shared/material.module';
import { PipeModule } from '../_shared/pipe.module';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CarouselComponent } from './announcement/carousel/carousel.component';
import { UserComponent } from './user/user.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [SharedModule, MaterialModule, PipeModule, CarouselModule.forRoot()],
  declarations: [AnnouncementComponent, CarouselComponent, UserComponent],
  exports: [AnnouncementComponent, CarouselComponent, UserComponent],
})
export class ToolModule {}
