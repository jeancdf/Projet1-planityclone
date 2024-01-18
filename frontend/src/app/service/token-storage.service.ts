import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, of } from 'rxjs';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private http: HttpClient) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): Observable<string | null> {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    
    // Check if the token exists and if it's not expired
    if (token && !this.isTokenExpired(token)) {
        return of(token); // Token is still valid, return it using 'of' operator from rxjs
    } else if (token && this.isTokenExpired(token)){
        // Token is either expired or doesn't exist, so try to refresh it
        return this.refreshToken();
    } else {
        // No token exists, so return null
        return of(null);
    }
}


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isTokenExpired(token: string): boolean {
    try {
      const tokenData: any = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      // Check if the token's expiration time is in the past
      return tokenData.exp < currentTime;
    } catch (error) {
      // Handle invalid tokens or errors
      return true; // Consider it expired if there's an error
    }
  }


  public refreshToken(): Observable<string | null> {
    const refreshToken = ''; // Get the refresh token from wherever it's stored

    if (!refreshToken) {
      return new Observable(observer => observer.next(null)); // No refresh token available
    }

    return this.http.post<{ accessToken: string }>('/api/refresh-token', { refreshToken })
      .pipe(
        map((response: any) => response.accessToken), // Extract the new access token from the response
        tap((newToken: any) => {
          if (newToken) {
            this.saveToken(newToken); // Update the token in session storage
          }
        })
      );
  }

}