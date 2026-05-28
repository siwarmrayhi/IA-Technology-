import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if (token) {
      this.currentUserSubject.next(this.decodeToken(token));
    }
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' })
      .pipe(tap((token: string) => {
        localStorage.setItem('token', token);
        const decoded = this.decodeToken(token);
        this.currentUserSubject.next(decoded);
      }));
  }

  register(user: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  // Récupère les rôles depuis le token JWT
  // Le backend retourne un token simple avec 'sub' = username
  // Les rôles doivent être chargés depuis l'API ou stockés à la connexion
  getUserRoles(): string[] {
    const user = this.currentUserSubject.value;
    return user?.roles || [];
  }

  isAdmin(): boolean {
    // Option 1: via rôles stockés dans localStorage après login
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    return roles.includes('ADMIN');
  }

  isModerator(): boolean {
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    return roles.includes('MODERATOR');
  }

  getCurrentUsername(): string {
    const token = this.getToken();
    if (!token) return '';
    const decoded: any = this.decodeToken(token);
    return decoded?.sub || '';
  }
}
