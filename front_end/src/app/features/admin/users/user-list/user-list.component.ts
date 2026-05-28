import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['username', 'email', 'roles', 'created', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.userService.getAll().subscribe(data => {
      this.dataSource.data = data;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openForm(user?: User) {
    const ref = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: user || null
    });
    ref.afterClosed().subscribe(res => {
      if (res) this.load();
    });
  }

  delete(user: User) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Supprimer le compte "${user.username}" ?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.userService.delete(user.id!).subscribe({
          next: () => {
            this.snackBar.open('Compte supprimé', 'OK', { duration: 3000 });
            this.load();
          },
          error: () => {
            this.snackBar.open('Erreur lors de la suppression', 'OK', { duration: 3000 });
          }
        });
      }
    });
  }
}
