import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Actualite } from '../models/actualite.model';

@Injectable({ providedIn: 'root' })
export class ActualiteService {
  private apiUrl = `${environment.apiUrl}/actualites`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(this.apiUrl);
  }

  create(a: Actualite): Observable<Actualite> {
    return this.http.post<Actualite>(this.apiUrl, a);
  }

  update(id: number, a: Actualite): Observable<Actualite> {
    return this.http.put<Actualite>(`${this.apiUrl}/${id}`, a);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
