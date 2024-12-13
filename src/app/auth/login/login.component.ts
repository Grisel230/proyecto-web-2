import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  modalTitle: string = '';
  modalMessage: string = '';
  isSuccess: boolean = false;
  responseModal: any;


  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  onLogin() {
    this.authService.login(this.email, this.password ).subscribe({
      next: (res: any) => {
        this.userService.setUser(res);
        if (res.id_role == 1) {
          this.router.navigate(['/admin']);
        } else
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.modalTitle = 'Error en el registro';
        this.modalMessage = err.error.message || 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.';
        this.isSuccess = false;

        // Mostrar el modal
        this.showModal();
      }
    });
  }

  private showModal() {
    const modalElement = document.getElementById('responseModal');
    if (modalElement) {
      this.responseModal = new bootstrap.Modal(modalElement);
      this.responseModal.show();
    }
  }
}
