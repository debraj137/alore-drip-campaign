import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginComponent } from './auth/check-login/check-login.component';
import { CookiesComponent } from './auth/cookies/cookies.component';
import { LoginComponent } from './auth/login/login.component';
import { PolicyComponent } from './auth/policy/policy.component';
import { TermOfServiceComponent } from './auth/term-of-service/term-of-service.component';
import { ErrorScreenComponent } from './layout/error-screen/error-screen.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { AuthGuard } from './service/core/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'chk-credentials/:userId/:companyId/:token',
    component: CheckLoginComponent,
  },
  {
    path: 'privacy-Policy',
    component: PolicyComponent,
  },
  {
    path: 'cookie-Policy',
    component: CookiesComponent,
  },
  {
    path: 'terms-of-service',
    component: TermOfServiceComponent,
  },
  {
    path: '500',
    component: ErrorScreenComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
