import {Component, inject} from '@angular/core';
import {AuthService} from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authService: AuthService = inject(AuthService);

  title = 'appointment-system-ui';
  isAuthenticated = this.authService.isAuthenticated;

  signOut = () => {
    this.authService.signOut()
  }
}
