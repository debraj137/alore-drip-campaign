import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetFavoriteService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFav(){

    return this.httpClient.get(
      `${environment.coreBackendUrl}/favourite/getFavOfUser`
    );
  }

}
