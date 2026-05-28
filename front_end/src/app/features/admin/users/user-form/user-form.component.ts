import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean;
  loading = false;
  hidePassword = true;

  roles = [
    { value: 'ADMIN', label: 'Administrateur' },
    { value: 'MODERATOR', label: 'Modérateur' },
    { value: 'USER', label: 'Utilisateur' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      username: [data?.username || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: [this.isEdit ? '' : '', this.isEdit ? [] : [Validators.required, Validators.minLength(6)]],
      role: [data?.roles?.[0]?.name || 'USER', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const { role, password, ...userFields } = this.form.value;
    const user: User = { ...userFields };

    if (password) user.password = password;

    const request = this.isEdit
      ? this.userService.update(this.data!.id!, user, role)
      : this.userService.create(user, role);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEdit ? 'Compte modifié !' : 'Compte créé !',
          'OK', { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'opération', 'OK', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
