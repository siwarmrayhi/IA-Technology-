import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../../../../core/services/publication.service';
import { DomaineService } from '../../../../core/services/domaine.service';
import { ChercheurService } from '../../../../core/services/chercheur.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ActualiteService } from '../../../../core/services/actualite.service';
import { AnnonceService } from '../../../../core/services/annonce.service';
import { Actualite } from '../../../../core/models/actualite.model';
import { Annonce } from '../../../../core/models/annonce.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  publications: any[] = [];
  publicationsFeatured: any[] = [];
  domaines: any[] = [];
  actualites: Actualite[] = [];
  annonces: Annonce[] = [];
  stats = { chercheurs: 0, publications: 0, domaines: 0 };
  isLoggedIn = false;

  constructor(
    public router: Router,
    private pubService: PublicationService,
    private domaineService: DomaineService,
    private chercheurService: ChercheurService,
    public authService: AuthService,
    private actualiteService: ActualiteService,
    private annonceService: AnnonceService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.pubService.getAll().subscribe(p => {
      this.publications = p.slice(0, 6);
      this.stats.publications = p.length;
    });

    // Projets mis en avant par le modérateur
    this.pubService.getFeatured().subscribe({
      next: data => this.publicationsFeatured = data,
      error: () => {} // pas critique si vide
    });

    this.domaineService.getAll().subscribe(d => {
      this.domaines = d;
      this.stats.domaines = d.length;
    });

    this.chercheurService.getAll().subscribe(c => {
      this.stats.chercheurs = c.length;
    });

    // Actualités et annonces publiées par le modérateur
    this.actualiteService.getAll().subscribe({
      next: data => this.actualites = data.slice(0, 3),
      error: () => {}
    });
    this.annonceService.getAll().subscribe({
      next: data => this.annonces = data.slice(0, 3),
      error: () => {}
    });
  }

  navigateToRecherche() {
    this.router.navigate(['/recherche']);
  }

  downloadPub(filename: string) {
    window.open(`http://localhost:8082/uploads/${filename}`, '_blank');
  }

  logout() {
    this.authService.logout();
  }
}
