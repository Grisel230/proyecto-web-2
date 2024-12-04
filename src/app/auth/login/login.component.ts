import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

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


  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin() {
    this.authService.login(this.email, this.password ).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        alert('ola');
        this.router.navigate(['/']);
      },
      error: (err) => alert('Credenciales incorrectas')
    });
  }
}
