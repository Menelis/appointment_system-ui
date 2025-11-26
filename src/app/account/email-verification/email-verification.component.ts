import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-email-verification',
  standalone: false,
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent implements OnInit {

  email!: string;
  token!: string;
  success!: boolean;
  responseMessage!: string;
  constructor(private _authService: AuthService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.email = this._route.snapshot.queryParamMap.get('email') || '';
    this.token = this._route.snapshot.queryParamMap.get('token') || '';
  }
  ngOnInit(): void {
    this._authService.verifyEmail(this.email, this.token).subscribe({
      next: (response) => {
        this.success = response.success;
        this.responseMessage = response.message;
      },
      error: (error) => {
        this.success = false;
        this.responseMessage = error.error.message;
      }
    });
  }
  signIn = () => {
    this._router.navigate(['/account/sign-in']);
  }
}
