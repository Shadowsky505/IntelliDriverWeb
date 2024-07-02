import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() { 
    this.authService.register(this.username, this.email, this.password).subscribe(
      response => {
        console.log(response);
        this.errorMessage = ''; // Limpiar el mensaje de error en caso de éxito
        this.router.navigate(['/dashboard']); // Redirigir al dashboard
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.errorMessage = 'Este correo ya está registrado';
        } else {
          this.errorMessage = 'Hubo un error al registrar el usuario';
        }
      }
    ); 
  }
}
