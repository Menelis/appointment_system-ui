import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GenericValidationService} from '../../core/services/generic-validation.service';
import {PasswordReset} from '../../core/models/request/password-reset';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  responseMessage!: string;
  success!: boolean;
  busy!: boolean;

  email!: string;
  token!: string
  constructor(private _authService: AuthService,
              private _router: Router,
              public _genericValidation: GenericValidationService,
              private _route: ActivatedRoute) {
    this.email = this._route.snapshot.queryParamMap.get('email') || '';
    this.token = this._route.snapshot.queryParamMap.get('token') || '';
  }
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: this._genericValidation.matchValidator('password', 'confirmPassword')});
  }

  onSubmit = () => {
    if(this.resetPasswordForm.valid) {
      let resetPasswordRequest: PasswordReset = {
        email: this.email,
        token: this.token,
        password: this.resetPasswordForm.value.password
      };
      this._authService.resetPassword(resetPasswordRequest).pipe(finalize(() => {
        this.busy = true;
      })).subscribe({
        next: (response) => {
          this.busy = false;
          this.success = response.success;
          this.responseMessage = response.message;
        },
        error: (error) => {
          this.success = false;
          this.responseMessage = error.error.message;
        }
      });
    }
  }
  onCancel = () => {
    this._router.navigate(['/']);
  }
}
