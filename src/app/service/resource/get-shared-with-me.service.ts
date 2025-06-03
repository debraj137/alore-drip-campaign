import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetSharedWithMeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSharedWithMe(){

    return this.httpClient.get(
      `${environment.coreBackendUrl}/share/sharedWithMe`
    );
  }
}
