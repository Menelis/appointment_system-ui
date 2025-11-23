import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignOutComponent } from './sign-out/sign-out.component';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    SignOutComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
