import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const checkAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); // Inyecta el UserService
  const router = inject(Router);          // Inyecta el Router

  const user = userService.getUser();

  if (user) {

    return false;
  }

  // Si no está autenticado, permite acceder a la ruta
  return true;

  return true;
};
