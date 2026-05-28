import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { HomeComponent } from '../home/home/home.component';
import { RechercheComponent } from '../recherche/recherche/recherche.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recherche', component: RechercheComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    RechercheComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatButtonModule, MatIconModule, MatCardModule, MatChipsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatProgressSpinnerModule, MatToolbarModule, MatMenuModule, MatDividerModule
  ]
})
export class PublicModule {}
