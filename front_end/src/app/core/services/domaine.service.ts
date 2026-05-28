import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Domaine } from '../models/domaine.model';

@Injectable({ providedIn: 'root' })
export class DomaineService {
  private apiUrl = `${environment.apiUrl}/domaines`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(this.apiUrl);
  }

  create(domaine: Domaine): Observable<Domaine> {
    return this.http.post<Domaine>(this.apiUrl, domaine);
  }

  update(id: number, domaine: Domaine): Observable<Domaine> {
    return this.http.put<Domaine>(`${this.apiUrl}/${id}`, domaine);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
