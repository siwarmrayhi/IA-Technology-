import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from '../dashboard/admin-dashboard/admin-dashboard.component';
import { AdminChercheurListComponent } from '../chercheurs/chercheur-list/chercheur-list.component';
import { ChercheurFormComponent } from '../chercheurs/chercheur-form/chercheur-form.component';
import { DomaineListComponent } from '../domaines/domaine-list/domaine-list.component';  // FIX 1: was AdminDomaineListComponent
import { DomaineFormComponent } from '../domaines/domaine-form/domaine-form.component';
import { PublicationListComponent } from '../publications/publication-list/publication-list.component';  // FIX 2: was AdminPublicationListComponent
import { PublicationFormComponent } from '../publications/publication-form/publication-form.component';
import { UserListComponent } from '../users/user-list/user-list.component';
import { UserFormComponent } from '../users/user-form/user-form.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'chercheurs', component: AdminChercheurListComponent },
      { path: 'domaines', component: DomaineListComponent },         // FIX 1
      { path: 'publications', component: PublicationListComponent }, // FIX 2
      { path: 'users', component: UserListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

const MATERIAL = [
  MatTableModule, MatButtonModule, MatIconModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginatorModule,
  MatSortModule, MatSnackBarModule, MatCardModule, MatChipsModule,
  MatProgressSpinnerModule, MatTooltipModule, MatSidenavModule,
  MatListModule, MatBadgeModule, MatDatepickerModule, MatNativeDateModule,
  MatToolbarModule, MatMenuModule, MatDividerModule
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminChercheurListComponent,
    ChercheurFormComponent,
    DomaineListComponent,      // FIX 1
    DomaineFormComponent,
    PublicationListComponent,  // FIX 2
    PublicationFormComponent,
    UserListComponent,
    UserFormComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    ...MATERIAL
  ]
})
export class AdminModule {}
