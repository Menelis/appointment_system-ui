import { CanActivateFn } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {inject} from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  if(authService.isAdmin) {
    return true
  }
  //TODO: Route to 403 page
  return false;
};
