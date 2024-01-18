import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        if (data.access) {
          const accessToken = data.access;
          const userRole = data.role; // Assuming the role is part of the response

          this.tokenStorageService.saveToken(accessToken);
          localStorage.setItem('userRole', userRole);

          this.isLoggedIn = true;

          // Extended Redirect based on role
          switch (userRole) {
            case 'admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'client':
              this.router.navigate(['/client-dashboard']);
              break;
            case 'salon':
              this.router.navigate(['/salon-dashboard']);
              break;
            default:
              // Default route for unrecognized roles or if no role is present
              this.router.navigate(['/login']);
              break;
          }
        } else {
          this.isLoginFailed = true;
          this.errorMessage = data.message || 'Failed to login. Please check your credentials.';
        }
      },
      err => {
        this.errorMessage = err.error.message || 'An error occurred. Please try again.';
        this.isLoginFailed = true;
      }
    );
  }


  onSignupClick() {
    this.router.navigate(['/signup']);
  }
}
