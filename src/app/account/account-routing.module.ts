import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {SignOutComponent} from './sign-out/sign-out.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'sign-out',
    component: SignOutComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'confirm-email',
    component: EmailVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
