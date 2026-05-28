import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ModerateurDashboardComponent } from '../dashboard/moderateur-dashboard/moderateur-dashboard.component';
import { ModerateurActualitesComponent } from '../actualites/moderateur-actualites/moderateur-actualites.component';
import { ModerateurAnnoncesComponent } from '../annonces/moderateur-annonces/moderateur-annonces.component';
import { ModerateurProjetsComponent } from '../projets/moderateur-projets/moderateur-projets.component';
// Composants STANDALONE -> à mettre dans `imports`, pas `declarations`.


const routes: Routes = [
  { path: 'dashboard',  component: ModerateurDashboardComponent },
  { path: 'actualites', component: ModerateurActualitesComponent },
  { path: 'annonces',   component: ModerateurAnnoncesComponent },
  { path: 'projets',    component: ModerateurProjetsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [ModerateurDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule, MatIconModule, MatCardModule,
    // composants standalone
    ModerateurActualitesComponent,
    ModerateurAnnoncesComponent,
    ModerateurProjetsComponent
  ]
})
export class ModerateurModule {}

