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
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRoles');

      console.log('User Role:', userRole);

    if (!token) {

      this.router.navigate(['/login']);
      return false;
    }

    if (route.data['role'] && route.data['role'] !== userRole) {

      console.warn('Unauthorized access attempt: user is not a', route.data['role']);
      this.handleRoleRedirect(userRole);
      return false;
    }

    return true;
  }

  private handleRoleRedirect(userRole: string | null): void {

    switch(userRole) {
      case 'client':
        this.router.navigate(['/client-dashboard']);
        break;
      case 'salon':
        this.router.navigate(['/salon-dashboard']);
        break;
      default:
        this.router.navigate(['/login']); 
    }
  }
    
}
