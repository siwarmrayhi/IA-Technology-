import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (token) => {
        // Après connexion, charger les rôles depuis l'API
        this.userService.getAll().subscribe({
          next: (users) => {
            const currentUser = users.find(u => u.username === username);
            if (currentUser && currentUser.roles) {
              const roles = currentUser.roles.map(r => r.name);
              localStorage.setItem('userRoles', JSON.stringify(roles));
              localStorage.setItem('currentUserId', currentUser.id?.toString() || '');


              // Redirection selon le rôle
              if (roles.includes('ADMIN')) {
                this.router.navigate(['/admin/dashboard']);
              } else if (roles.includes('MODERATOR')) {
                this.router.navigate(['/moderateur/dashboard']);
              } else {
                this.router.navigate(['/']); // <-- Page d'accueil (Home) au lieu du profil
              }
            }
          },
          error: () => {
            // En cas d'erreur de chargement des rôles, rediriger vers accueil
            this.router.navigate(['/']);
          }
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
