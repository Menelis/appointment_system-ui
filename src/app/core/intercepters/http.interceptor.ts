import { HttpInterceptorFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {inject} from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let oauthService: OAuthService = inject(OAuthService);
  let accessToken = oauthService.getAccessToken();
  if(accessToken) {
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return next(authRequest);
  }
  return next(req);
};
