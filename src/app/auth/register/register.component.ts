import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

constructor(private authService: AuthService, private router: Router) {
}
  onRegister() {
      this.authService.register(this.name, this.email, this.password).subscribe(response => {
        console.log('Registration successful', response);
        this.router.navigate(['/']);
        // Handle successful registration
      }, error => {
        console.error('Registration failed', error);
        // Handle registration error
      });
    }
}
