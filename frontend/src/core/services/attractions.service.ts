import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Attraction } from '../models';

@Injectable({ providedIn: 'root' })
export class AttractionsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/geoapify`;

  search(destination: string): Observable<Attraction[]> {
    return this.http.get<Attraction[]>(`${this.baseUrl}/search`, {
      params: { destination },
    });
  }
}
