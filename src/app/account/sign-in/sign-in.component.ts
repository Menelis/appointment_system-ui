import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{

  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.signIn();
  }
}
