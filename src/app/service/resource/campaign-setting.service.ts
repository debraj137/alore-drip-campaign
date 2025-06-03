import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LayoutService } from '../core/layout.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignSettingService {
  constructor(
    private httpClient: HttpClient,
    private layoutService: LayoutService
  ) {}

  addBlockedEmail(
    email: string,
    blockType: string,
    campaignId : string
  ) {
    let params = new HttpParams()
      .set('emailId', email)
      .set('blockType', blockType) // 1 for this campaign 2 for all campaign
      .set('campaignId', campaignId);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/block/email?${params}`,
      {}
    );
  }

  addBlockedDomain(
    domain: string,
    blockType: string,
    campaignId : string
  ) {
    let params = new HttpParams()
      .set('domainName', domain)
      .set('blockType', blockType) // 1 for this campaign 2 for all campaign
      .set('campaignId', campaignId);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/block/domain?${params}`,
      {}
    );
  }

  getBlockedData(campaignId : string) {
    let params = new HttpParams()
      .set('campaignId', campaignId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/block/getEmailBlocklist?${params}`
    );
  }

  removeBlockedDomain(domain: string) {
    let params = new HttpParams().set('domainName', domain);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/block/removeDomain?${params}`,
      {}
    );
  }

  removeBlockedEmail(email: string) {
    let params = new HttpParams().set('emailId', email);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/block/removeEmail?${params}`,
      {}
    );
  }

  getUserNotificationSettings() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/notification/getUserSettings`
    );
  }

  addNotificationSettings(data: any) {
    return this.httpClient.post(
      environment.coreBackendUrl + '/notification/addSettings',
      {
        updates: data.updates,
        dailyReports: data.dailyReports,
      }
    );
  }

  updateNotificationSettings(data: any, notificationId: string) {
    return this.httpClient.post(
      environment.coreBackendUrl + '/notification/updateSettings',
      {
        notificationId,
        updates: data.updates,
        dailyReports: data.dailyReports,
      }
    );
  }

  addBccEmail(payload: any, campaignId: string) {
    return this.httpClient.post(environment.coreBackendUrl + '/bcc/addEmail', {
      campaignId: campaignId,
      bccEmail: payload.bccEmail,
      forwardEmail: payload.forwardEmail,
    });
  }

  getBccEmail(campaignId: string) {
    let params = new HttpParams().set('campaignId', campaignId);
    return this.httpClient.get(
      environment.coreBackendUrl + `/bcc/getInfoDetails?${params}`
    );
  }

  removeBccEmail(infoId: string) {
    let params = new HttpParams().set('infoId', infoId);
    return this.httpClient.get(
      environment.coreBackendUrl + `/bcc/remove?${params}`
    );
  }

  getIntegrationDetails(campId:any){
    return this.httpClient.get(
      environment.coreBackendUrl + `/social/isIntegrated?campaignId=`+ campId
    )
  }

  getRerport(campaignId: string) {
    let params = new HttpParams()
      .set('campaignId', campaignId);

    return this.httpClient.get(
      environment.coreBackendUrl + `/campReport/getDetailsById?${params}`
    );
  }

  removeReport(reportId: string) {
    let params = new HttpParams()
      .set('reportId', reportId);

    return this.httpClient.get(
      environment.coreBackendUrl + `/campReport/remove?${params}`
    );
  }

  createReport(
    campaignId: string,
    reportType: number,
    email : string
  ) {
    const payload = {
      reportType: reportType.toString(), // 0 = daily || 1 = weekly || 2 = monthly
      campaignId: campaignId,
      recipientEmailId: email,
      day: '',
      time: ''
    }

    return this.httpClient.post(
      environment.coreBackendUrl + `/campReport/addEmail`,
      payload
    );
  }
}
