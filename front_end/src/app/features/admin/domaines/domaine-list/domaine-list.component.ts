import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Domaine } from '../../../../core/models/domaine.model';
import { DomaineService } from '../../../../core/services/domaine.service';
import { DomaineFormComponent } from '../domaine-form/domaine-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-domaine-list',
  templateUrl: './domaine-list.component.html',
  styleUrls: ['./domaine-list.component.scss']
})
export class DomaineListComponent implements OnInit {
  displayedColumns = ['nom', 'description', 'actions'];
  dataSource = new MatTableDataSource<Domaine>();
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private domaineService: DomaineService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.domaineService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openForm(domaine?: Domaine) {
    const ref = this.dialog.open(DomaineFormComponent, {
      width: '500px',
      data: domaine || null
    });
    ref.afterClosed().subscribe(res => { if (res) this.load(); });
  }

  delete(domaine: Domaine) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Supprimer le domaine "${domaine.nom}" ?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.domaineService.delete(domaine.id!).subscribe({
          next: () => {
            this.snackBar.open('Domaine supprimé', 'OK', { duration: 3000 });
            this.load();
          },
          error: () => {
            this.snackBar.open('Impossible de supprimer (domaine utilisé)', 'OK', { duration: 4000 });
          }
        });
      }
    });
  }
}
