import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DestinationPhoto } from '../models';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/unsplash`;

  getRandomPhoto(destination: string): Observable<DestinationPhoto> {
    return this.http.get<DestinationPhoto>(`${this.baseUrl}/random`, {
      params: { destination },
    });
  }
}
