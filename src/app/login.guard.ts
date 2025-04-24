import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './core/services/user/user.service';

export const loginGuard: CanActivateFn = (_route, _state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedin()) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
