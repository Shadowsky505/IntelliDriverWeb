// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { collapseAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Attempting to login...');
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login response:', response);
        this.errorMessage = ''; // Limpiar el mensaje de error en caso de éxito
        // Guardar el token en el servicio de autenticación
        this.authService.saveToken(response.token);
        // Redirigir a la vista de dashboard
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = error.message || 'Hubo un error al iniciar sesión';
      }
    );
  } 
}
