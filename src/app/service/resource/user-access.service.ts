import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShareCampaignPayload, IUpdateUserPermissionPayload,IInviteduser } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserList() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/user/getAllUsers`,
      {}
    );
  }

  getSharedUserList(campaignId : string) {
    let params = new HttpParams()
      .set('campaignId', campaignId);
    
    return this.httpClient.get(
      `${environment.coreBackendUrl}/permission/getUserList?${params}`,
      {}
    );
  }

  shareCampaign(payload : IShareCampaignPayload[], campaignId: string) {
    let params = new HttpParams()
      .set('campaignId', campaignId);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/share/shareCampaignList?${params}`,
      payload
    );
  }

  shareCampaignWithEmail(payload : any) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/shareExternal/giveAccess`,
      payload
    );
  }

  updateUserPermission(payload : IUpdateUserPermissionPayload[]) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/permission/updateList`,
      payload
    );
  }

  removeUser(payload: any[], campaignId: string){
    return this.httpClient.post(
      `${environment.coreBackendUrl}/share/unShareList?campaignId=`+campaignId,
      payload
    );
  }
}
