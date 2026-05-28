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

interface Annonce {
  id: number;
  titre: string;
  contenu: string;
  date: Date;
}

@Component({
  selector: 'app-moderateur-annonces',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule
  ],
  templateUrl: './moderateur-annonces.component.html',
  styleUrls: ['./moderateur-annonces.component.scss']
})
export class ModerateurAnnoncesComponent {
  annonces: Annonce[] = [];
  titre = '';
  contenu = '';
  private nextId = 1;

  constructor(private snackBar: MatSnackBar) {}

  ajouter() {
    if (!this.titre.trim() || !this.contenu.trim()) {
      this.snackBar.open('Titre et contenu obligatoires', 'OK', { duration: 2500 });
      return;
    }
    this.annonces.unshift({
      id: this.nextId++,
      titre: this.titre.trim(),
      contenu: this.contenu.trim(),
      date: new Date()
    });
    this.titre = '';
    this.contenu = '';
    this.snackBar.open('Annonce diffusée !', 'OK', { duration: 2500 });
  }

  supprimer(a: Annonce) {
    this.annonces = this.annonces.filter(x => x.id !== a.id);
    this.snackBar.open('Annonce supprimée', 'OK', { duration: 2500 });
  }
}
