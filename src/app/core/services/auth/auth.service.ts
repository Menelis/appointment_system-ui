import {Inject,  Injectable} from '@angular/core';
import {APP_CONFIG_TOKEN, AppConfig} from '../../models/app-config';
import { OAuthService} from 'angular-oauth2-oidc';
import { SignUpDto } from '../../models/dto/sign-up-dto';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RoleConstants } from '../../constants/app-constants';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl!: string | undefined;
  constructor(@Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
              private _oauthService: OAuthService,
              private _http: HttpClient) {
    this._oauthService.configure(appConfig.authServer);
    this._oauthService.loadDiscoveryDocumentAndTryLogin();
    this.authUrl = appConfig.authServer.issuer;
  }

  signIn = () => {
    this._oauthService.initCodeFlow();
  }
  signUp = (signUpRequest: SignUpDto) => {
    return this._http.post(`${this.authUrl}/api/v1/auth/sign-up`, signUpRequest);
  }
  signOut = () => {
    this._oauthService.logOut();
  }
  refreshToken = () => {
    this._oauthService.refreshToken();
  }
  get isAuthenticated(): boolean {
    return this._oauthService.hasValidAccessToken();
  }
  get fullName() {
    let decodedToken = this.getDecodedToken()
    if(decodedToken != null) {
      return decodedToken.given_username;
    }
    return '';
  }
  private getDecodedToken() : any {
    if(this.isAuthenticated) {
      return jwtDecode(this.accessToken);
    }
    return null;
  }
  get userRoles(): string[] {
    let decodedToken = this.getDecodedToken();
    if(decodedToken != null) {
      return decodedToken.roles as string[];
    }
    return [];
  }

  hasRole = (role: string): boolean => {
    return this.userRoles.includes(role);
  }
  get isAdmin() {
    return this.userRoles.includes(RoleConstants.ADMIN_ROLE);
  }
  get isUser(): boolean {
    return this.userRoles.includes(RoleConstants.USER_ROLE);
  }
  get accessToken() {
    return this._oauthService.getAccessToken();
  }
}
