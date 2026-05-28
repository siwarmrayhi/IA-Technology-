import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-admin-layout',
  template: `
    <mat-sidenav-container class="admin-container">
      <mat-sidenav #sidenav mode="side" opened class="admin-sidenav">
        <div class="sidenav-header">
          <mat-icon class="brand-icon">science</mat-icon>
          <div>
            <h3>IA-Technology</h3>
            <span class="role-badge">Administrateur</span>
          </div>
        </div>

        <mat-nav-list>
          <a mat-list-item routerLink="dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Tableau de bord</span>
          </a>
          <a mat-list-item routerLink="chercheurs" routerLinkActive="active">
            <mat-icon matListItemIcon>groups</mat-icon>
            <span matListItemTitle>Chercheurs</span>
          </a>
          <a mat-list-item routerLink="domaines" routerLinkActive="active">
            <mat-icon matListItemIcon>category</mat-icon>
            <span matListItemTitle>Domaines</span>
          </a>
          <a mat-list-item routerLink="publications" routerLinkActive="active">
            <mat-icon matListItemIcon>article</mat-icon>
            <span matListItemTitle>Publications</span>
          </a>
          <a mat-list-item routerLink="users" routerLinkActive="active">
            <mat-icon matListItemIcon>manage_accounts</mat-icon>
            <span matListItemTitle>Comptes</span>
          </a>
        </mat-nav-list>

        <div class="sidenav-footer">
          <button mat-button (click)="logout()" class="logout-btn">
            <mat-icon>logout</mat-icon> Déconnexion
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="admin-content">
        <div class="admin-topbar">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="topbar-user">
            <mat-icon>account_circle</mat-icon>
            {{ username }}
          </span>
        </div>
        <div class="admin-main">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  username = '';

  constructor(private authService: AuthService, private router: Router) {
    this.username = this.authService.getCurrentUsername();
  }

  logout() {
    this.authService.logout();
  }
}
