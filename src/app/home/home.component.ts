import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG_TOKEN, AppConfig} from '../core/models/app-config';
import {AuthService} from '../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(@Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
              public authService: AuthService) {
  }
  logIn = () => {
    this.authService.logIn();
  }

  ngOnInit(): void {
    console.log(this.authService.accessToken);
  }
}
