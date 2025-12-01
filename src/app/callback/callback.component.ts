import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {filter} from 'rxjs';

@Component({
  selector: 'app-callback',
  standalone: false,
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {
  constructor(private _router: Router,
              private _authService: OAuthService) {
  }
  ngOnInit(): void {
    this._authService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe({
        next: (response) => {
          console.log(response);
          //Tokens are available, navigate to the desired page
          //this._router.navigate(['/']).then(() => window.location.reload());
        }
      })
  }
}
