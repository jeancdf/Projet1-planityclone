import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private http: HttpClient,
    ) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      const token = localStorage.getItem('token'); // Get the auth token from localStorage
      const userRole = localStorage.getItem('userRoles'); // Get the user's role

      console.log('User Role:', userRole);

    if (!token) {
      // If no token, redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    // Check for specific roles if needed
    if (route.data['role'] && route.data['role'] !== userRole) {
      // If user role doesn't match the required role
      // Redirect to a specific component based on the user's role
      console.warn('Unauthorized access attempt: user is not a', route.data['role']);
      this.handleRoleRedirect(userRole);
      return false;
    }

    // If token exists and user has the correct role, allow access
    return true;
  }

  private handleRoleRedirect(userRole: string | null): void {
    // Define your redirects based on roles
    switch(userRole) {
      case 'client':
        this.router.navigate(['/client-dashboard']);
        break;
      case 'salon':
        this.router.navigate(['/salon-dashboard']);
        break;
      // Add cases for other roles as needed
      default:
        this.router.navigate(['/login']); // Redirect to a default page for unauthorized access
    }
  }
    
}
