import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
declare var bootstrap: any;


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  modalTitle: string = '';
  modalMessage: string = '';
  isSuccess: boolean = false;
  responseModal: any;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {

        // Configurar el modal para éxito
        this.modalTitle = 'Registro exitoso';
        this.modalMessage = 'Por favor, revisa tu correo para verificar tu cuenta.';
        this.isSuccess = true;

        // Mostrar el modal
        this.showModal();
      },
      error: (error) => {
        console.error('Registration failed', error);

        // Configurar el modal para error
        this.modalTitle = 'Error en el registro';
        this.modalMessage = error.error.message || 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.';
        this.isSuccess = false;

        // Mostrar el modal
        this.showModal();
      }
    });
  }

  redirectToHome() {
    // Cerrar el modal antes de redirigir
    if (this.responseModal) {
      this.responseModal.hide();
    }
    this.router.navigate(['/']);
  }

  private showModal() {
    const modalElement = document.getElementById('responseModal');
    if (modalElement) {
      this.responseModal = new bootstrap.Modal(modalElement);
      this.responseModal.show();
    }
  }
}
