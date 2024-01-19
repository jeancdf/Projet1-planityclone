import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: any;
  username: any;
  password: any;
  role: any;
  errorMessage: any;
  successMessage: any;

  constructor(private router: Router,  private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSignUp() {
    this.http.post('/api/accounts/register/', {
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role.toLowerCase()
    }).subscribe(response => {
      // If the sign-up was successful, display a success message and navigate to the login page after a short delay
      this.successMessage = "Signup successful! Redirecting to login...";
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, error => {
      // Check if the error status is 201 Created, which means the user was successfully created
      if (error.status === 201) {
        this.successMessage = "Signup successful! Redirecting to login...";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else if (error.status === 409) {
        this.errorMessage = "Username or email already exists.";
      } else {
        // If it's another error, display a generic error message
        console.error(error);
        this.errorMessage = 'There was an error signing up. Please try again.';
      }
    });
  }
  
  
  
  

  navigate(){
    this.router.navigate(['/login']);
  }
  
}
