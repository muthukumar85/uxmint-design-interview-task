import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { DomainNotFoundComponent } from './domain-not-found/domain-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  { path: 'invalid-domain', component: DomainNotFoundComponent},
  { path: '**', redirectTo: 'dashboard' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
