import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { authGuard } from './core/guard/auth.guard';
import { adminGuard } from './core/guard/admin.guard';
import {CallbackComponent} from './callback/callback.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';

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
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
