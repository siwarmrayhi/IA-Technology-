import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Publication } from '../../../../core/models/publication.model';
import { PublicationService } from '../../../../core/services/publication.service';

;

@Component({
  selector: 'app-moderateur-projets',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatButtonModule, MatIconModule, MatCardModule, MatSlideToggleModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './moderateur-projets.component.html',
  styleUrls: ['./moderateur-projets.component.scss']
})
export class ModerateurProjetsComponent implements OnInit {
  publications: Publication[] = [];
  // IDs des publications mises en avant (persistence locale en attendant l'endpoint backend)
  enAvant: Set<number> = new Set<number>();
  loading = true;

  constructor(
    private pubService: PublicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Restaure la sélection précédente
    const saved = localStorage.getItem('projetsEnAvant');
    if (saved) {
      try { this.enAvant = new Set(JSON.parse(saved)); } catch {}
    }

    this.pubService.getAll().subscribe({
      next: (data : any) => { this.publications = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  toggle(p: Publication) {
    if (!p.id) return;
    if (this.enAvant.has(p.id)) {
      this.enAvant.delete(p.id);
    } else {
      this.enAvant.add(p.id);
    }
    localStorage.setItem('projetsEnAvant', JSON.stringify(Array.from(this.enAvant)));
  }

  isEnAvant(p: Publication): boolean {
    return !!p.id && this.enAvant.has(p.id);
  }

  enregistrer() {
    localStorage.setItem('projetsEnAvant', JSON.stringify(Array.from(this.enAvant)));
    this.snackBar.open(
      `${this.enAvant.size} projet(s) mis en avant`,
      'OK',
      { duration: 2500 }
    );
  }
}
