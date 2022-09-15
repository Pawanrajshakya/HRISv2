import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MyStaffTreeComponent } from './my-staff-tree/my-staff-tree.component';
import { MyStaffInfoComponent } from './my-staff-info/my-staff-info.component';
import { MaterialModule } from '../_shared/material.module';
import { PipeModule } from '../_shared/pipe.module';

@NgModule({
  imports: [SharedModule, MaterialModule, PipeModule],
  declarations: [MyStaffTreeComponent, MyStaffInfoComponent],
  exports: [MyStaffTreeComponent, MyStaffInfoComponent],
})
export class MyInfoModule {}
