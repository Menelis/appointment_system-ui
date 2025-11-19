import {Inject,  Injectable} from '@angular/core';
import {APP_CONFIG_TOKEN, AppConfig} from '../../models/app-config';
import { OAuthService} from 'angular-oauth2-oidc';
import {SignUpDto} from '../../models/dto/sign-up-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl!: string | undefined;
  constructor(@Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
              private oauthService: OAuthService,
              private http: HttpClient) {
    this.oauthService.configure(appConfig.authServer);
    this.authUrl = appConfig.authServer.issuer;
  }

  signIn = () => {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if(!this.oauthService.hasValidAccessToken()) {
        this.oauthService.initCodeFlow();
      }
      //TODO: Refresh Token
    });
  }
  signUp = (signUpRequest: SignUpDto) => {
    return this.http.post(`${this.authUrl}/api/v1/auth/sign-up`, signUpRequest);
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
