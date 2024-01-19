import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<any> {
    return this.http.get('/api/users/');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`/api/users/${id}/`);
  }

  getSalons(): Observable<any> {
    return this.http.get('/api/salons/');
  }

  getSalonById(id: string): Observable<any> {
    return this.http.get(`/api/salons/${id}/`);
  }

  




}
