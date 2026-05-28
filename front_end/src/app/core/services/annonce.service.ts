import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Annonce } from '../models/annonce.model';

@Injectable({ providedIn: 'root' })
export class AnnonceService {
  private apiUrl = `${environment.apiUrl}/annonces`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl);
  }

  create(a: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(this.apiUrl, a);
  }

  update(id: number, a: Annonce): Observable<Annonce> {
    return this.http.put<Annonce>(`${this.apiUrl}/${id}`, a);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
