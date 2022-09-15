import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_shared/material.module';
import { RouterModule } from '@angular/router';
import { DeveloperComponent } from './developer.component';
import { DeveloperGuard } from '../_services/_guard/developer.guard';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'developer',
        component: DeveloperComponent,
        canActivate: [DeveloperGuard],
      },
    ]),
  ],
  declarations: [DeveloperComponent],
  exports: [DeveloperComponent],
})
export class DeveloperModule {}
