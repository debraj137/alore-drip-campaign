import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyCampaignBaseService {


  constructor(private httpClient: HttpClient,) { }

  getCampaignBase() {
    return this.httpClient.get(
      environment.coreBackendUrl + `/user/getAllBaseCampaign`
    );
  }

  getAllPersonalCampaignLists(){
    return this.httpClient.get(
      environment.coreBackendUrl + `/user/getMyCampaignBases `,{}
    );
  }


}
