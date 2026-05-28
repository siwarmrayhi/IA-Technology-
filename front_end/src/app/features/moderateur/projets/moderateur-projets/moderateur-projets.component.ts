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
  loading = true;

  constructor(
    private pubService: PublicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.pubService.getAll().subscribe({
      next: (data:any) => { this.publications = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  toggle(p: Publication) {
    if (!p.id) return;
    const newVal = !p.enAvant;
    this.pubService.setFeatured(p.id, newVal).subscribe({
      next: (updated:any) => {
        p.enAvant = updated.enAvant;
        this.snackBar.open(
          newVal ? 'Publication mise en avant' : 'Publication retirée',
          'OK',
          { duration: 2000 }
        );
      },
      error: () => this.snackBar.open('Erreur', 'OK', { duration: 2500 })
    });
  }

  get countEnAvant(): number {
    return this.publications.filter(p => p.enAvant).length;
  }
}
