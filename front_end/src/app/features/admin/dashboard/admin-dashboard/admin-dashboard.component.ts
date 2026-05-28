import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ChercheurService } from '../../../../core/services/chercheur.service';
import { DomaineService } from '../../../../core/services/domaine.service';
import { PublicationService } from '../../../../core/services/publication.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    chercheurs: 0,
    domaines: 0,
    publications: 0,
    users: 0
  };
  recentPublications: any[] = [];
  loading = true;

  constructor(
    private chercheurService: ChercheurService,
    private domaineService: DomaineService,
    private publicationService: PublicationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    forkJoin({
      chercheurs: this.chercheurService.getAll(),
      domaines: this.domaineService.getAll(),
      publications: this.publicationService.getAll(),
      users: this.userService.getAll()
    }).subscribe({
      next: (data) => {
        this.stats.chercheurs = data.chercheurs.length;
        this.stats.domaines = data.domaines.length;
        this.stats.publications = data.publications.length;
        this.stats.users = data.users.length;
        this.recentPublications = data.publications.slice(0, 5);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
