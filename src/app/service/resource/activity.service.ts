import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LayoutService } from '../core/layout.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private httpClient: HttpClient,
    private layoutService: LayoutService
  ) { }

  getActivityList (campId:any, pageNo: number) {
    let params = new HttpParams()
      // .set('campaignId', this.layoutService.usrCompObj.companyid);
      .set('campaignId', campId)
      .set('page', pageNo)
      

    return this.httpClient.get(
      `${environment.coreBackendUrl}/activity/getByCampaignId?${params}`
    );
  }
}
