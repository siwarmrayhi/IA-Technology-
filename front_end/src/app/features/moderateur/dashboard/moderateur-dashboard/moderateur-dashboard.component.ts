import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-moderateur-dashboard',
  template: `
    <div class="mod-dashboard">
      <div class="page-header">
        <h1><mat-icon>edit_note</mat-icon> Espace Modérateur</h1>
        <p>Gérez le contenu de la page d'accueil, les actualités et les annonces.</p>
      </div>

      <div class="mod-cards">
        <mat-card class="mod-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>newspaper</mat-icon>
            <mat-card-title>Actualités</mat-card-title>
            <mat-card-subtitle>Publier et gérer les actualités</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-raised-button color="primary">Gérer les actualités</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="mod-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>campaign</mat-icon>
            <mat-card-title>Annonces</mat-card-title>
            <mat-card-subtitle>Créer et diffuser des annonces</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-raised-button color="accent">Gérer les annonces</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="mod-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>featured_play_list</mat-icon>
            <mat-card-title>Projets en avant</mat-card-title>
            <mat-card-subtitle>Mettre en avant les projets récents</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-raised-button>Configurer</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `
})
export class ModerateurDashboardComponent {
  constructor(private authService: AuthService) {}
}
