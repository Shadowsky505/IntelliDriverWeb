// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; 
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService, 
    private authService: AuthService 
  ) {}

  canActivate(): boolean {
    console.log('AuthGuard canActivate called');
    const token = this.authService.getToken(); 

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log('User is authenticated');
      return true;
    } else {
      console.log('User is not authenticated');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
