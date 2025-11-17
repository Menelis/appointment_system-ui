import {Inject,  Injectable} from '@angular/core';
import {APP_CONFIG_TOKEN, AppConfig} from '../../models/app-config';
import { OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
              private oauthService: OAuthService) {
    this.oauthService.configure(appConfig.authServer);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  signIn = () => {
    this.oauthService.initCodeFlow();
  }

  signOut = () => {
    this.oauthService.logOut();
  }

  get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

 get getProfile() {
    return this.oauthService.getIdentityClaims();
  }
  get getFullName() {
    return this.oauthService.getIdentityClaims()['fullName'];
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }
}
