import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MyStaffTreeComponent } from './my-staff-tree/my-staff-tree.component';
import { MyStaffInfoComponent } from './my-staff-info/my-staff-info.component';
import { MaterialModule } from '../_shared/material.module';
import { PipeModule } from '../_shared/pipe.module';
import { RouterModule } from '@angular/router';
import { MyInfoComponent } from './my-info.component';
import { CurrentUserResolver } from '../_services/_resolvers/current-user-resolver.service';
import { MyInfoTreeResolverService } from '../_services/_resolvers/my-info-tree-resolver.service';

@NgModule({
  declarations: [MyStaffTreeComponent, MyStaffInfoComponent],
  imports: [
    SharedModule,
    MaterialModule,
    PipeModule,
    RouterModule.forChild([
      {
        path: 'myinfo',
        component: MyInfoComponent,
        resolve: {
          currentUser: CurrentUserResolver,
          tree: MyInfoTreeResolverService,
        },
      },
    ]),
  ],
  exports: [MyStaffTreeComponent, MyStaffInfoComponent],
})
export class MyInfoModule {}
