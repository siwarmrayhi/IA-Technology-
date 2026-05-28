import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ModerateurGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    if (this.auth.isLoggedIn() && (roles.includes('MODERATOR') || roles.includes('ADMIN'))) return true;
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
