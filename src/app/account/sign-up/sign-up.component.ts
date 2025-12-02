import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {GenericValidationService} from '../../core/services/generic-validation.service';
import {SignUpDto} from '../../core/models/dto/sign-up-dto';
import {finalize} from 'rxjs';
import {ApiResponse} from '../../core/models/api-response';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  responseMessage!: string;
  success!: boolean;

  constructor(private _authService: AuthService,
              private _router: Router,
              public _genericValidation: GenericValidationService) {
  }
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      contactNo: new FormControl('', [Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this._genericValidation.matchValidator('password', 'confirmPassword')});
  }

  onSubmit = () => {
    if(this.signUpForm.valid) {
      let signUpForm = this.signUpForm.value;
      let signUpDto: SignUpDto = {
        firstName: signUpForm.firstName,
        lastName: signUpForm.lastName,
        email: signUpForm.email,
        contactNo: signUpForm.contactNo,
        password: signUpForm.password
      };
      this._authService.signUp(signUpDto).pipe(finalize(() => {
      }))
        .subscribe({
          next: (response) => {
            let apiResponse: ApiResponse<any> = (response as ApiResponse<any>);
            this.success = apiResponse.success;
            this.responseMessage = apiResponse.message;
          },
          error: (error) => {
           this.success = false;
           this.responseMessage = error.error.message;
          }
        });
    }
  }
  cancel = () => {
    this._router.navigate(['/']);
  }
}
