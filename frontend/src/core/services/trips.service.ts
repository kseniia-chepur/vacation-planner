import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateTripRequest, Trip, UpdateTripRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class TripsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/trips`;

  getAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }

  getById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${id}`);
  }

  create(trip: CreateTripRequest): Observable<Trip> {
    return this.http.post<Trip>(this.baseUrl, trip);
  }

  update(id: string, changes: UpdateTripRequest): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
