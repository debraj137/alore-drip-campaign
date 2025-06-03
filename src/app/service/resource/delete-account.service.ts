import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class deleteAccountService {
  private customHttpClient: HttpClient;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpHandler: HttpBackend,
    private http: HttpClient
  ) {
    this.customHttpClient = new HttpClient(httpHandler);
  }

  async deleteAccount(){

    const tokenParam = this.route.snapshot.queryParamMap.get('token');
    const customHeader = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + tokenParam),
    };

    localStorage.clear()
    
    const deleteAccountRequest = await this.customHttpClient.post(
     'https://auth.alore.io:9090/user/deleteAccount',
      {},
      customHeader
    );

    this.router.navigateByUrl('https://campaign.alore.io');
  }
}
