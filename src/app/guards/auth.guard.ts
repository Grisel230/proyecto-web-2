import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); // Inyecta el UserService
  const router = inject(Router);          // Inyecta el Router

  const user = userService.getUser();
  console.log(user);
  if (user && user.id_role === 1) { // Supongamos que el rol 1 es Admin
    return true;
  }

  // Redirige a login si no tiene acceso
  router.navigate(['/auth/login']);
  return false;
};
