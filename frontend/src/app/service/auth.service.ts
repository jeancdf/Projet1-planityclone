import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const AUTH_API = '/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}accounts/login/`, {
      username: username,
      password: password,
    }, httpOptions)
      .pipe(
        tap((response: any) => {
          if (response && response.access) {
            // Save the token in local storage
            localStorage.setItem('token', response.access);
            this.isLoggedIn = true;

            // Save the role in local storage, assuming it's included in the response
            if (response.role) {
              localStorage.setItem('role', response.role);
            }

            // Save the teacher ID in local storage, assuming it's included in the response
            if (response.id) {
              localStorage.setItem('id', response.id);
            }

            // save the username in local storage, assuming it's included in the response
            if (response.username) {
              localStorage.setItem('username', response.username);
            }
          }
        })
      );
  }

  // Method to retrieve the current teacher's ID
  getCurrentId(): string | null {
    return localStorage.getItem('id');
  }
}
