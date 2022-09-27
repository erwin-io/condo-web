import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { FeaturesComponent } from './pages/features/features.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: '',
      component: FeaturesComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./pages/features/home/home.module').then(m => m.HomeModule) },
        { path: 'configurations', canActivate: [AuthGuard], loadChildren: () => import('./pages/features/configuration/configuration.module').then(m => m.ConfigurationModule) },
        { path: 'security', canActivate: [AuthGuard], loadChildren: () => import('./pages/features/security/security.module').then(m => m.SecurityModule) },
      ]
    },
    { path: 'account',
      loadChildren:  () => import('./pages/accounts/accounts.module').then( m => m.AccountsModule) ,
      canActivate: [AuthGuard]
    },
    { path: 'auth',
      loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule)
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }