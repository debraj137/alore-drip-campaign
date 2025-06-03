import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  boolean {
      const isAuthorized: any = JSON.parse(localStorage.getItem('usrCompObj') || '{}');
      if(isAuthorized.token) {
        return true;
      } else {
        localStorage.removeItem('usrCompObj')
        this.router.navigateByUrl('login');
        return false;
      };
  }
  
}
