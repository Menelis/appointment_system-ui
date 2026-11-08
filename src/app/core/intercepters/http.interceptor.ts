import {
  HttpInterceptorFn,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { appendCorrelationId } from '../util/object-util';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let oauthService: OAuthService = inject(OAuthService);
  let accessToken = oauthService.getAccessToken();
  let router: Router = inject(Router);
  if (accessToken) {
    let headers = req.headers.set('Authorization', `Bearer ${accessToken}`);
    headers = appendCorrelationId(headers);
    req = req.clone({ headers });
  }
  return next(req).pipe(
    catchError((error) => {
      // Access Denied
      if (error.status === 403) {
        router.navigate(['/forbidden']);
      }
      return throwError(() => error);
    }),
  );
};
