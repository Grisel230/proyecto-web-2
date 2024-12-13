import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any = null;

  constructor() {}

  // Guarda los datos del usuario
  setUser(user: any): void {
    this.user = user;
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user)); // Guarda los datos en localStorage
  }

  // Obtiene los datos del usuario
  getUser(): any {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }
    return this.user;
  }

  // Limpia los datos del usuario
  clearUser(): void {
    this.user = null;
    localStorage.removeItem('user');
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  // Verifica el rol del usuario
  hasRole(role: number): boolean {
    const user = this.getUser();
    return user && user.role === role;
  }
}
