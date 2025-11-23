import {HttpErrorResponse, HttpInterceptorFn, HttpXsrfTokenExtractor} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let oauthService: OAuthService = inject(OAuthService);
  let accessToken = oauthService.getAccessToken();
  let router: Router = inject(Router);
  if(accessToken) {
    // const authRequest = req.clone({
    //   headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    // });
    // return next(authRequest);
    req = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${accessToken}`)
    });
  }
  return next(req).pipe(
    catchError((error) => {
      // Access Denied
      if(error.status === 403) {
        router.navigate(['/forbidden']);
      }
      return throwError(() => error)
  }));
};
