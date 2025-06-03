import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetOpenRate } from 'src/app/model/analytics';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly coreBackendBaseURL = environment.coreBackendUrl;
  private readonly headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT' });
  constructor(private httpClient: HttpClient) {}

  getOpenRates(payload: IGetOpenRate) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/analytics/getOpenRate`,
      payload
    );
  }

  getDailyVolume(payload: IGetOpenRate) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/analytics/getMails`,
      payload
    );
  }

  getPersonalizedEmailDayWish(payload: any): Observable<any> {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/analytics/getPersonalizedEmailDayWish`,
      payload
    );
  }

  getPersonalizedEmailDailyOpenRate(payload: any): Observable<any> {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/analytics/getPersonalizedEmailDailyOpenRate`,
      payload
    );
  }

  getClickedData(payload: any): Observable<any> {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/analytics/getClickedData`,
      payload
    );
  }
  getPersonalizedEmailReport(campignId:string){
    return this.httpClient.post(
      this.coreBackendBaseURL + '/analytics/getPersonalizedEmailReport'+'?campaignId='+ campignId,
      {}
    ).toPromise();
  }

  getProviderReplyRates(api: string, payload: any){
    return this.httpClient.post(
      `${environment.coreBackendUrl}/providerAnalytics/` + api,
      payload
      
    )
  }

  getProviderOpenRates(api: string, payload: any){
    return this.httpClient.post(
      `${environment.coreBackendUrl}/providerAnalytics/`+api,
      payload
      
    )
  }

}
