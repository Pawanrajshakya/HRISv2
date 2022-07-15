import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveStaffComponent } from './active-staff/active-staff.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { DeveloperComponent } from './developer/developer.component';
import { HomeComponent } from './home/home.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'announcement', component: AnnouncementComponent },
  { path: 'activeStaff', component: ActiveStaffComponent },
  { path: 'staffDetail', component: StaffDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
