import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domaine } from '../../../../core/models/domaine.model';
import { ChercheurService } from '../../../../core/services/chercheur.service';
import { DomaineService } from '../../../../core/services/domaine.service';
import { PublicationService } from '../../../../core/services/publication.service';


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  searchQuery = '';
  selectedDomaineId: number | null = null;
  searchType: 'nom' | 'domaine' | 'mots-cles' = 'nom';

  chercheurs: any[] = [];
  domaines: Domaine[] = [];
  publications: any[] = [];
  loading = false;
  searched = false;

  constructor(
    private chercheurService: ChercheurService,
    private domaineService: DomaineService,
    private pubService: PublicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.domaineService.getAll().subscribe((d : any )=> this.domaines = d);

    // Gestion des queryParams (depuis la page d'accueil)
    this.route.queryParams.subscribe(params => {
      if (params['domaineId']) {
        this.selectedDomaineId = +params['domaineId'];
        this.searchType = 'domaine';
        this.search();
      }
    });
  }

  search() {
    this.loading = true;
    this.searched = true;
    this.chercheurs = [];

    if (this.searchType === 'nom' && this.searchQuery) {
      this.chercheurService.recherchePubliqueNom(this.searchQuery).subscribe({
        next: (data : any) => { this.chercheurs = data; this.loading = false; }
      });
    } else if (this.searchType === 'domaine' && this.selectedDomaineId) {
      this.chercheurService.recherchePubliqueDomaine(this.selectedDomaineId).subscribe({
        next: (data : any) => { this.chercheurs = data; this.loading = false; }
      });
    } else if (this.searchType === 'mots-cles' && this.searchQuery) {
      this.chercheurService.rechercheMotsCles(this.searchQuery).subscribe({
        next: (data : any) => { this.chercheurs = data; this.loading = false; }
      });
    } else {
      this.loading = false;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.selectedDomaineId = null;
    this.chercheurs = [];
    this.searched = false;
  }
}
