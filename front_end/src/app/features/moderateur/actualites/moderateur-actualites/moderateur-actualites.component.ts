import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Actualite {
  id: number;
  titre: string;
  contenu: string;
  date: Date;
}

@Component({
  selector: 'app-moderateur-actualites',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule
  ],
  templateUrl: './moderateur-actualites.component.html',
  styleUrls: ['./moderateur-actualites.component.scss']
})
export class ModerateurActualitesComponent {
  // NOTE : stockage en mémoire pour la démo.
  // Branche ici un service REST quand l'endpoint backend existera.
  actualites: Actualite[] = [];
  titre = '';
  contenu = '';
  private nextId = 1;

  constructor(private snackBar: MatSnackBar) {}

  ajouter() {
    if (!this.titre.trim() || !this.contenu.trim()) {
      this.snackBar.open('Titre et contenu obligatoires', 'OK', { duration: 2500 });
      return;
    }
    this.actualites.unshift({
      id: this.nextId++,
      titre: this.titre.trim(),
      contenu: this.contenu.trim(),
      date: new Date()
    });
    this.titre = '';
    this.contenu = '';
    this.snackBar.open('Actualité publiée !', 'OK', { duration: 2500 });
  }

  supprimer(a: Actualite) {
    this.actualites = this.actualites.filter(x => x.id !== a.id);
    this.snackBar.open('Actualité supprimée', 'OK', { duration: 2500 });
  }
}
