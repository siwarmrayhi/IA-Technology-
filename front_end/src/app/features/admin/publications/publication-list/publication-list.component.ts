import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publication } from '../../../../core/models/publication.model';
import { PublicationService } from '../../../../core/services/publication.service';
import { PublicationFormComponent } from '../publication-form/publication-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {
  displayedColumns = ['titre', 'date', 'chercheurs', 'fichier', 'actions'];
  dataSource = new MatTableDataSource<Publication>();
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pubService: PublicationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.pubService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openForm(pub?: Publication) {
    const ref = this.dialog.open(PublicationFormComponent, {
      width: '700px',
      maxHeight: '90vh',
      data: pub || null
    });
    ref.afterClosed().subscribe(res => { if (res) this.load(); });
  }

  delete(pub: Publication) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Supprimer la publication "${pub.titre}" ?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.pubService.delete(pub.id!).subscribe({
          next: () => {
            this.snackBar.open('Publication supprimée', 'OK', { duration: 3000 });
            this.load();
          }
        });
      }
    });
  }

  downloadFile(filename: string) {
    window.open(`http://localhost:8082/uploads/${filename}`, '_blank');
  }
}
