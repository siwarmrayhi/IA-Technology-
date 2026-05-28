import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Actualite } from '../../../../core/models/actualite.model';
import { ActualiteService } from '../../../../core/services/actualite.service';


@Component({
  selector: 'app-moderateur-actualites',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './moderateur-actualites.component.html',
  styleUrls: ['./moderateur-actualites.component.scss']
})
export class ModerateurActualitesComponent implements OnInit {
  actualites: Actualite[] = [];
  titre = '';
  contenu = '';
  loading = true;
  saving = false;

  constructor(
    private service: ActualiteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => { this.actualites = data; this.loading = false; },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur de chargement', 'OK', { duration: 3000 });
      }
    });
  }

  ajouter() {
    if (!this.titre.trim() || !this.contenu.trim()) {
      this.snackBar.open('Titre et contenu obligatoires', 'OK', { duration: 2500 });
      return;
    }
    this.saving = true;
    this.service.create({ titre: this.titre.trim(), contenu: this.contenu.trim() })
      .subscribe({
        next: () => {
          this.titre = '';
          this.contenu = '';
          this.saving = false;
          this.snackBar.open('Actualité publiée !', 'OK', { duration: 2500 });
          this.refresh();
        },
        error: () => {
          this.saving = false;
          this.snackBar.open('Erreur lors de la publication', 'OK', { duration: 3000 });
        }
      });
  }

  supprimer(a: Actualite) {
    if (!a.id) return;
    if (!confirm('Supprimer cette actualité ?')) return;
    this.service.delete(a.id).subscribe({
      next: () => {
        this.snackBar.open('Actualité supprimée', 'OK', { duration: 2500 });
        this.refresh();
      },
      error: () => this.snackBar.open('Erreur lors de la suppression', 'OK', { duration: 3000 })
    });
  }
}
