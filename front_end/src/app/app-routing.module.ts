import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { ModerateurGuard } from './core/guards/moderateur.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/public/public/public.module').then(m => m.PublicModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./features/admin/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'moderateur',
    canActivate: [ModerateurGuard],
    loadChildren: () => import('./features/moderateur/moderateur/moderateur.module').then(m => m.ModerateurModule)
  },
  {
    path: 'espace-utilisateur',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/user/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component')
      .then(c => c.UnauthorizedComponent)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
