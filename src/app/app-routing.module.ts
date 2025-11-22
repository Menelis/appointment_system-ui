import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { authGuard } from './core/guard/auth.guard';
import { adminGuard } from './core/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'branch',
    loadChildren: () => import('./branch/branch.module').then(module => module.BranchModule),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'account',
    loadChildren:() => import('./account/account.module').then(module => module.AccountModule)
  },
  {
    path: 'appointment',
    loadChildren:() => import('./appointment/appointment.module').then(module => module.AppointmentModule),
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
