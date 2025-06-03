import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetSharedByMeService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getSharedByMe(){

    return this.httpClient.get(
      `${environment.coreBackendUrl}/share/sharedByMe`
    );
  }
}
