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

  register(username: string, email: string, password: string, roles: string): Observable<any> {
    return this.http.post(`${AUTH_API}register`, {
      username: username,
      email: email,
      password: password,
      roles: roles
    }, httpOptions);
  }

  login(username: any, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}login`, {
      username: username,
      password: password
    }, httpOptions)
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.storeTokenAndSetLoggedIn(response.token);
          }
        })
      );
  }

  getCurrentId(): string | null {
    return localStorage.getItem('id');
  }

  private storeTokenAndSetLoggedIn(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn = true;
  }
}
