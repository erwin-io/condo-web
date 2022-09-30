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
        { path: 'rooms', canActivate: [AuthGuard], loadChildren: () => import('./pages/features/rooms/rooms.module').then(m => m.RoomsModule) },
        { path: 'incident-report', canActivate: [AuthGuard], loadChildren: () => import('./pages/features/incident-report/incident-report.module').then(m => m.IncidentReportModule) },
        { path: 'monthly-due', canActivate: [AuthGuard], loadChildren: () => import('./pages/features/monthly-due/monthly-due.module').then(m => m.MonthlyDueModule) },
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
