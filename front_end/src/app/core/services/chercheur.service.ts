import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Chercheur } from '../models/chercheur.model';

@Injectable({ providedIn: 'root' })
export class ChercheurService {
  private apiUrl = `${environment.apiUrl}/chercheurs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Chercheur[]> {
    return this.http.get<Chercheur[]>(this.apiUrl);
  }

  getByDomaine(domaineId: number): Observable<Chercheur[]> {
    return this.http.get<Chercheur[]>(`${this.apiUrl}/domaine/${domaineId}`);
  }

  rechercher(nom: string): Observable<Chercheur[]> {
    return this.http.get<Chercheur[]>(`${this.apiUrl}/rechercher`, {
      params: new HttpParams().set('nom', nom)
    });
  }

  // Pour l'espace public (sans auth)
  recherchePubliqueNom(nom: string): Observable<Chercheur[]> {
    return this.http.get<Chercheur[]>(`${environment.apiUrl}/public/recherche/nom`, {
      params: new HttpParams().set('nom', nom)
    });
  }

  recherchePubliqueDomaine(id: number): Observable<Chercheur[]> {
    return this.http.get<Chercheur[]>(`${environment.apiUrl}/public/recherche/domaine/${id}`);
  }

  rechercheMotsCles(mot: string): Observable<Chercheur[]> {
    return this.http.get<Chercheur[]>(`${environment.apiUrl}/public/recherche/mots-cles`, {
      params: new HttpParams().set('mot', mot)
    });
  }

  create(chercheur: Chercheur): Observable<Chercheur> {
    return this.http.post<Chercheur>(this.apiUrl, chercheur);
  }

  update(id: number, chercheur: Chercheur): Observable<Chercheur> {
    return this.http.put<Chercheur>(`${this.apiUrl}/${id}`, chercheur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
