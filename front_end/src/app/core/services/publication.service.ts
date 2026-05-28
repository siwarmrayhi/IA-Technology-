import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Publication } from '../models/publication.model';

@Injectable({ providedIn: 'root' })
export class PublicationService {
  private apiUrl = `${environment.apiUrl}/publications`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  getById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${id}`);
  }

  create(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, publication);
  }

  update(id: number, publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.apiUrl}/${id}`, publication);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' });
  }

  downloadFile(filename: string): string {
    // URL de téléchargement du fichier depuis le backend
    return `${environment.apiUrl.replace('/api', '')}/uploads/${filename}`;

  }

    recherchePublications(terme: string): Observable<Publication[]> {
    const q = terme.trim().toLowerCase();
    return this.getAll().pipe(
      map((pubs : any) => pubs.filter((p:any) =>
        (p.titre || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.chercheurs || []).some((c :any) =>
          `${c.prenom || ''} ${c.nom || ''}`.toLowerCase().includes(q)
        )
      ))
    );
  }

  // Recherche des publications appartenant à un domaine donné
  // (via les chercheurs associés à ce domaine).
  recherchePublicationsParDomaine(domaineId: number): Observable<Publication[]> {
    return this.getAll().pipe(
      map(pubs => pubs.filter(p =>
        (p.chercheurs || []).some(c => c.domaine?.id === domaineId)
      ))
    );
  }

}
