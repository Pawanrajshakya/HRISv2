import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CurrentUserResolver } from '../_services/_resolvers/current-user-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { currentUser: CurrentUserResolver },
  },
  {
    path: 'developer',
    loadChildren: () =>
      import('./../developer/developer.module').then((m) => m.DeveloperModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    resolve: { currentUser: CurrentUserResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
