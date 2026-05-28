import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chercheur } from '../../../../core/models/chercheur.model';
import { ChercheurService } from '../../../../core/services/chercheur.service';
import { ChercheurFormComponent } from '../chercheur-form/chercheur-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-chercheur-list',
  templateUrl: './chercheur-list.component.html',
  styleUrls: ['./chercheur-list.component.scss']
})
export class AdminChercheurListComponent implements OnInit {
  displayedColumns = ['nom', 'prenom', 'email', 'affiliation', 'domaine', 'actions'];
  dataSource = new MatTableDataSource<Chercheur>();
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private chercheurService: ChercheurService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { this.loadChercheurs(); }

  loadChercheurs() {
    this.loading = true;
    this.chercheurService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm(chercheur?: Chercheur) {
    const dialogRef = this.dialog.open(ChercheurFormComponent, {
      width: '600px',
      data: chercheur || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadChercheurs();
    });
  }

  delete(chercheur: Chercheur) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Supprimer "${chercheur.prenom} ${chercheur.nom}" ?` }
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.chercheurService.delete(chercheur.id!).subscribe({
          next: () => {
            this.snackBar.open('Chercheur supprimé', 'OK', { duration: 3000 });
            this.loadChercheurs();
          }
        });
      }
    });
  }
}
