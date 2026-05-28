import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-unauthorized',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:16px;text-align:center">
      <mat-icon style="font-size:4rem;width:4rem;height:4rem;color:#f87171">block</mat-icon>
      <h1 style="font-size:2rem;font-weight:700">Accès refusé</h1>
      <p style="color:#94a3b8">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      <button mat-raised-button color="primary" routerLink="/">
        <mat-icon>home</mat-icon> Retour à l'accueil
      </button>
    </div>
  `
})
export class UnauthorizedComponent {}
