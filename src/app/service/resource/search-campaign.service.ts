import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchCampaignService {

  constructor(
    private httpClient: HttpClient,
    
  ) { }


  getTeamSpaceList() {
    
    return this.httpClient.get(
      environment.coreBackendUrl + `/search/getCampaignList`,{}
    );
  }

   getCreatedByList() {
    
    return this.httpClient.get(
      environment.coreBackendUrl + `/user/getTeammates`,{}
    );
  }

  getSenderList() {
    
    return this.httpClient.get(
      environment.coreBackendUrl + `/user/getAllSender`,{}
    );
  }

  getCampaignList(payload: any) {
    
    return this.httpClient.post(
      environment.coreBackendUrl + `/search/searchCampaign`, 
      payload
    );
  }
}
 