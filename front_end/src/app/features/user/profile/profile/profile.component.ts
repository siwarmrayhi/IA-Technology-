import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  loading = false;
  saving = false;
  hidePassword = true;
  userRoles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit() {
    this.loading = true;
    this.userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    const userId = localStorage.getItem('currentUserId');

    if (userId) {
      this.userService.getAll().subscribe({
        next: (users) => {
          this.currentUser = users.find(u => u.id === +userId) || null;
          if (this.currentUser) {
            this.profileForm.patchValue({
              username: this.currentUser.username,
              email: this.currentUser.email
            });
          }
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
    } else {
      this.loading = false;
    }
  }

  onSubmit() {
    if (!this.currentUser || this.profileForm.invalid) return;
    this.saving = true;

    const updatedUser: User = {
      ...this.currentUser,
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password || this.currentUser.password
    };

    const role = this.currentUser.roles?.[0]?.name || 'USER';

    this.userService.update(this.currentUser.id!, updatedUser, role).subscribe({
      next: () => {
        this.snackBar.open('Profil mis à jour avec succès !', 'OK', { duration: 3000 });
        this.saving = false;
      },
      error: () => {
        this.snackBar.open('Erreur lors de la mise à jour', 'OK', { duration: 3000 });
        this.saving = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
