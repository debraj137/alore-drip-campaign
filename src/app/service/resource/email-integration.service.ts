import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailIntegrationService {
  campaignId = new BehaviorSubject<string>('');
  currentCampaignIdSaved:string = '';
  constructor(
    private httpClient: HttpClient
  ) { }

  getIntegrationStatus(campaignId:any){
    return this.httpClient.get(
      environment.coreBackendUrl + `/social/isIntegrated?campaignId=`+ campaignId
    );
  }
  getIntegrationUrl(campaignId : string, url : string) {
    let params = new HttpParams()
      .set('campaignId', campaignId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/social/${url}?${params}`,
    );
  }

  verifyIntegration(code : string, campaignId : any, baseId: string) {
    
    let params = new HttpParams()
      .set('code', code)
      .set('campaignId', campaignId)
      .set('campaignBaseId', baseId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/social/getAccessToken?${params}`,
    );
  }

  removeIntegration(campaignId : string) {
    let params = new HttpParams()
      .set('campaignId', campaignId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/social/removeIntegration?${params}`,
    );
  }

  getBaseId(campaignId: string){
    return this.httpClient.get(`${environment.coreBackendUrl}/social/integrationDetails?campaignId=`+campaignId)
  }

  vesselIntegration(){
    return this.httpClient.post(`${environment.coreBackendUrl}/vessel/linkTokenForUser`, {
    })
  }

  vesselTokenExchange(token: string){
    let publicToken = ""+token

    return this.httpClient.get(`http://camp-test.alore.io:8080/vessel/exchangeToken?publicToken=${publicToken}`)
  }
}
