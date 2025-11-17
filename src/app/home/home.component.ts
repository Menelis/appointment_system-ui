import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  isAuthenticated!: boolean;

  public constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    console.log(this.authService.accessToken);
  }
}
