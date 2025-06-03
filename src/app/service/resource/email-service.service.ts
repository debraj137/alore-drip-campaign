import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  updatePersonalizedEmail(req:any){
    return this.httpClient.post(
      environment.coreBackendUrl + `/personalizedEmail/updatePersonalizedEmail`,req
    );
  }

  deletePersonalizedEmail(payload : any){
    let params = new HttpParams()
      .set('personalizedEmailId', payload.templateId)
      .set('campaignId', payload.campaignId)

    return this.httpClient.get(
      environment.coreBackendUrl + `/personalizedEmail/delete?${params}`
    );
  }

  sendMail(personalizedEmailId: string, campaignId: string ){
    
    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaign/testMail?campaignId=${campaignId}&personalizedEmailId=${personalizedEmailId}`,{}
    )
  }
}
