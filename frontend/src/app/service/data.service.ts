import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenStorageService } from './token-storage.service'; // Make sure to import TokenStorageService
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService // Inject TokenStorageService
  ) { }

  private getHttpOptions(): Observable<{ headers: HttpHeaders }> {
    return this.tokenStorageService.getToken().pipe(
      switchMap((token) => {
        let headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        });
        if (token) {
          headers = headers.append('Authorization', `Bearer ${token}`);
        }
        return of({ headers });
      })
    );
  }

  getUsers(): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get('/api/users/', options)
      )
    );
  }

  getUserById(id: string): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get(`/api/users/${id}/`, options)
      )
    );
  }

  getSalons(): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get('/api/salons/', options)
      )
    );
  }

  getSalonById(id: string): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get(`/api/salons/${id}/`, options)
      )
    );
  }

  fetchServices(salonId: string): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get(`/api/salons/${salonId}/services`, options)
      )
    );
  }

  fetchAllServices(): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get(`/api/services`, options)
      )
    );
  }

  fetchAvailableTimeSlots(salonId: string, date: Date): Observable<any> {
    const dateString = date.toISOString().split('T')[0];
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get(`/api/salons/${salonId}/available-slots?date=${dateString}`, options)
      )
    );
  }

  fetchSalonProfile(salonId: string): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get(`/api/my-salons/`, options)
      )
    );
  }

  updateSalonProfile(salonId: string, salon: any): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.put(`/api/salons/${salonId}`, salon, options)
      )
    );
  }

  fetchReservation () {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.put(`/salons/reservations`, options)
      )
    );
  }

  fetchSalonServices(salonId: number): Observable<any> {
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.get(`/api/salons/${salonId}`, options)
      )
    );
  }

  saveReservation(salonId: number, time: Date): Observable<any> {

    const data = {
      salon_id: Number(salonId),
      reservation_date: time
    }
    return this.getHttpOptions().pipe(
      switchMap(options =>
        this.http.post(`/api/reservations`, data, options)
      )
    );
  }
}
