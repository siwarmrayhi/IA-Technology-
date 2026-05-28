import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ModerateurDashboardComponent } from '../dashboard/moderateur-dashboard/moderateur-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: ModerateurDashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [ModerateurDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule, MatIconModule, MatCardModule
  ]
})
export class ModerateurModule {}
