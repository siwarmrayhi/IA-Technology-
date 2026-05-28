// ============================================================
// REMPLACE :
// src/app/features/moderateur/dashboard/moderateur-dashboard/moderateur-dashboard.component.ts
// ============================================================
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-moderateur-dashboard',
  templateUrl: './moderateur-dashboard.component.html',
  styleUrls: ['./moderateur-dashboard.component.scss']
})
export class ModerateurDashboardComponent {
  constructor(private authService: AuthService, public router: Router) {}

  logout() {
    this.authService.logout();
  }
}
