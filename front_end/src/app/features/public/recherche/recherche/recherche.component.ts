// ============================================================
//  REMPLACE entièrement :
//  src/app/features/public/recherche/recherche/recherche.component.ts
// ============================================================
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
  publications: any[] = [];
  domaines: Domaine[] = [];
  loading = false;
  searched = false;

  constructor(
    private chercheurService: ChercheurService,
    private domaineService: DomaineService,
    private pubService: PublicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.domaineService.getAll().subscribe((d: any) => this.domaines = d);

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
    this.publications = [];

    if (this.searchType === 'domaine' && this.selectedDomaineId) {
      // Chercheurs du domaine
      this.chercheurService.recherchePubliqueDomaine(this.selectedDomaineId).subscribe({
        next: (data: any) => { this.chercheurs = data; this.finish(); }
      });
      // Publications liées au domaine (filtrées côté client)
      this.pubService.recherchePublicationsParDomaine(this.selectedDomaineId).subscribe({
        next: (data: any) => { this.publications = data; }
      });

    } else if (this.searchQuery && (this.searchType === 'nom' || this.searchType === 'mots-cles')) {
      const terme = this.searchQuery;

      // Chercheurs (endpoint backend selon le type)
      const chercheurReq = this.searchType === 'nom'
        ? this.chercheurService.recherchePubliqueNom(terme)
        : this.chercheurService.rechercheMotsCles(terme);

      chercheurReq.subscribe({
        next: (data: any) => { this.chercheurs = data; this.finish(); },
        error: () => this.finish()
      });

      // Publications (filtrage côté client sur titre/description/chercheur)
      this.pubService.recherchePublications(terme).subscribe({
        next: (data: any) => { this.publications = data; }
      });

    } else {
      this.loading = false;
    }
  }

  private finish() {
    this.loading = false;
  }

  get totalResultats(): number {
    return this.chercheurs.length + this.publications.length;
  }

  downloadPub(filename: string) {
    window.open(`http://localhost:8082/uploads/${filename}`, '_blank');
  }

  clearSearch() {
    this.searchQuery = '';
    this.selectedDomaineId = null;
    this.chercheurs = [];
    this.publications = [];
    this.searched = false;
  }
}
