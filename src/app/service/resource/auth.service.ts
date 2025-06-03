import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private customHttpClient: HttpClient;

  constructor(
    private httpClient: HttpClient,
    private httpHandler: HttpBackend
  ) {
    this.customHttpClient = new HttpClient(httpHandler);
  }

  validateUser(token : string): Observable<any> {
    const customHeader = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    };
    return this.customHttpClient.get(
      environment.coreBackendUrl + `/user/validate`,
      customHeader
    );
  }
}
