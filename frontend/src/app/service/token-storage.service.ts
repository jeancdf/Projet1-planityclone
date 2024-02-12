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
    

    if (token && !this.isTokenExpired(token)) {
        return of(token); 
    } else if (token && this.isTokenExpired(token)){

        return this.refreshToken();
    } else {

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
      const currentTime = Date.now() / 1000;


      return tokenData.exp < currentTime;
    } catch (error) {

      return true;
    }
  }


  public refreshToken(): Observable<string | null> {
    const refreshToken = ''; 

    if (!refreshToken) {
      return new Observable(observer => observer.next(null)); 
    }

    return this.http.post<{ accessToken: string }>('/api/refresh-token', { refreshToken })
      .pipe(
        map((response: any) => response.accessToken), 
        tap((newToken: any) => {
          if (newToken) {
            this.saveToken(newToken); 
          }
        })
      );
  }

}