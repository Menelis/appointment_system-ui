import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {GenericValidationService} from '../../core/services/generic-validation.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs';
import {ApiResponse} from '../../core/models/api-response';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  responseMessage!: string;
  success!: boolean;
  busy!: boolean;
  constructor(private _authService: AuthService,
              private _router: Router,
              public _genericValidation: GenericValidationService) {
  }
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  onSubmit = () => {
    if(this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
      this._authService.forgotPassword(this.forgotPasswordForm.value.email).pipe(finalize(() => {
        this.busy = true;
      }))
        .subscribe({
          next: (response) => {
            let apiResponse: ApiResponse<any> = (response as ApiResponse<any>);
            this.responseMessage = apiResponse.message;
            this.success = apiResponse.success;
            this.busy = false;
          },
          error: (error) => {
            this.success = false;
            this.busy = false;
            this.responseMessage = error.error.message;
          }
        });
    }
  }

  onCancel = () => {
    this._router.navigate(['/']);
  }
}
