import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInUrl = environment.redirectLoginUrl;
  isLoading = false;
  isActive = true;
  headerLink : string[] = [
    'home',
    'features',
    'product',
    'resources',
    'enterprise',
    'pricing'
  ]

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    let userObj = localStorage.getItem('usrCompObj') ?JSON.parse(localStorage.getItem('usrCompObj') || '') : '';
    if (userObj.companyId && userObj.token && userObj.userId) {
      this.router.navigate(['/domain-health-check'])
    } else {
      localStorage.removeItem('activeCampaign')
    }
  }

  redirectToAccountLoginPage(): void{
    window.location.href = environment.redirectLoginUrl;
  }
  signIn() {
    const signUpLink : string = 'https://auth.alore.io/?returnto=campaign.alore.io'
    this.document.location.href = signUpLink
  }

  signUp() {
    const signUpLink : string = 'https://auth.alore.io/sign-up?returnto=campaign.alore.io'
    this.document.location.href = signUpLink
  }

  openingTermOfService() {
    window.open('../../../assets/html/termsOfService.html', '_blank')
  }

}
