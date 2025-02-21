import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const isLogged: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const authService=inject(AuthService)
  if(authService.isUserloggedIn()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;

  }
};

export const isLogout: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const authService=inject(AuthService)
  if(authService.isUserloggedIn()){
    router.navigate(['/']);
    return false;
  }else{
    return true;
  }
};