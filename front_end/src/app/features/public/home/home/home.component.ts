import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../../../../core/services/publication.service';
import { DomaineService } from '../../../../core/services/domaine.service';
import { ChercheurService } from '../../../../core/services/chercheur.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  publications: any[] = [];
  domaines: any[] = [];
  stats = { chercheurs: 0, publications: 0, domaines: 0 };
  isLoggedIn = false;

  constructor(
    public router: Router,
    private pubService: PublicationService,
    private domaineService: DomaineService,
    private chercheurService: ChercheurService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.pubService.getAll().subscribe(p => {
      this.publications = p.slice(0, 6);
      this.stats.publications = p.length;
    });

    this.domaineService.getAll().subscribe(d => {
      this.domaines = d;
      this.stats.domaines = d.length;
    });

    this.chercheurService.getAll().subscribe(c => {
      this.stats.chercheurs = c.length;
    });
  }

  navigateToRecherche() {
    this.router.navigate(['/recherche']);
  }

  downloadPub(filename: string) {
    window.open(`http://localhost:8082/uploads/${filename}`, '_blank');
  }
}
