import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ICampaignItem, ICreateCampaign } from 'src/app/model/campaign';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  settingBadge: Number = 0;
  activityBadge: Number = 0;
  currentCamapignList: any[] = [];
  clikedRecipe: boolean = false;
  recipeCampId: any;
  integratedEmail: boolean = false;
  baseIdForRecipe: any;
  parentDetail: number = 0;

  constructor(
    private httpClient: HttpClient,

  ) { }

  ngOnInit(){
    

  }


  setParentDetail(parentDetail: number) {
    this.parentDetail = parentDetail;
  }


  createCampaign(payload: ICreateCampaign) {
    let params = new HttpParams()
      .set('campaignBaseName', payload.campaignName)
      .set('emoji', payload.emoji)
      .set('color', payload.backgroundColor)
      .set('type', (payload.parentType === undefined || payload.parentType === null) ? 1 : payload.parentType)
    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaignBase/addCampaignBase?${params}`,
      {}
    );
  }
  deleteCampaign(campId: any) {
    let params = new HttpParams().set('campaignId', campId)
    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaign/deleteCampaign?${params}`, {}
    );
  }

  deleteMultipleCampaigns(campaignIdArray: any){
    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaign/deleteAllCampaign`, campaignIdArray
    );
  }
  
  getAllBaseCampaigns(page: number) {
    return this.httpClient.get(
      environment.coreBackendUrl + `/workBase/getCampaignsWithPaging?page=`+page
    );
  }


  getAllBaseCampaignsList() {
    
    return this.httpClient.get(
      environment.coreBackendUrl + `/workBase/getAllWorkBases`,{}
    );
  }

  getAllBaseCampaignsListDetail() {
    
    return this.httpClient.get(
      environment.coreBackendUrl + `/workBase/getAllWorkBaseList`,{}
    );
  }




  changeUpdate(campaignId: string) {
    let par = new HttpParams()
      .set('campaignId', campaignId)
    return this.httpClient.post(
      environment.coreBackendUrl + `/campaignSetting/update?${par}`, {}
    );
  }
  changeReport(campaignId: string) {
    let par = new HttpParams()
      .set('campaignId', campaignId)
    return this.httpClient.post(
      environment.coreBackendUrl + `/campaignSetting/dailyReport?${par}`, {}
    );
  }
  getActivityBadgeCount(campId: string) {
    let params = new HttpParams().set('campaignId', campId)
    return this.httpClient.get(
      environment.coreBackendUrl + `/activity/getNotViewedActivities?${params}`
    );
  }
  createNewCampaignInBase(payload: ICreateCampaign) {
    return this.httpClient.post(
      environment.coreBackendUrl + `/campaign/addCampaign`, payload
    );
  }

  getBaseSpecificCampaignList(baseId: string, flag: number) {
    let par = new HttpParams()
      .set("campaignBaseId", baseId)
      .set("flag", flag)
    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaignBase/getAllCampaignsOfBase?${par}`
    );
  }
  
  getCampaignList() {
    return this.httpClient.get(
      environment.coreBackendUrl + `/user/getAllCampaign`
    );
  }
  getCurrentBaseDetails(baseId: string) {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaignBase/getBaseDetails?campaignBaseId=${baseId}`
    );
  }
  getCurrentCampaignDetails(campaignId: string) {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaign/getCampaignDetails?campaignId=${campaignId}`
    );
  }
  getCampaignMailSequence(campaignId: any) {
    return this.httpClient.get(
      environment.coreBackendUrl + `/personalizedEmail/getCampaignEmail?campaignId=` + campaignId
    )
  }
  getCurrentCampaignSettings(campaignId: any) {
    return this.httpClient.get(
      environment.coreBackendUrl + `/campaignSetting/getCampaignSetting?campaignId=` + campaignId
    )
  }
  addToFavourite(campId: any) {
    return this.httpClient.post(
      environment.coreBackendUrl + `/favourite/addToFav?campaignId=` + campId, {}
    )
  }
  checkFavourite(campId: any) {
    // let params = new HttpParams().set('campaignId',campId)
    return this.httpClient.get(
      environment.coreBackendUrl + `/favourite/getFavDetails?campaignId=` + campId
    )
  }
  removeFav(campId: any) {
    return this.httpClient.post(
      environment.coreBackendUrl + `/favourite/remove?campaignId=` + campId, {}
    )
  }
  deleteBase(baseId: any) {
    return this.httpClient.post(
      environment.coreBackendUrl + `/campaignBase/deleteCampaignBase?campaignBaseId=` + baseId, {}
    )
  }

  getCampaignBaseDetail(baseCampaignId: string) {
    const campaignList = this.getBaseSpecificCampaignList(baseCampaignId, this.parentDetail === 0 ? 0 : 1)
    const baseCampaignDetail = this.getCurrentBaseDetails(baseCampaignId)
    return forkJoin({
      baseCampaignDetail,
      campaignList
    });
  }

  addTemplate(baseCampaignId: string) {
    const campaignList = this.getBaseSpecificCampaignList(baseCampaignId, this.parentDetail === 0 ? 0 : 1)
    const baseCampaignDetail = this.getCurrentBaseDetails(baseCampaignId)
    return forkJoin({
      baseCampaignDetail,
      campaignList
    });
  }
  
  createMailSequence(campaignId: string, sequence: number) {
    const payload = {
      campaignId: campaignId,
      mailInterval: 2,
      sequence: sequence,
      textColor: 'black',
      backgroundColor: 'white'
    }
    return this.httpClient.post(
      environment.coreBackendUrl + `/personalizedEmail/savePersonalizedEmail`,
      payload
    )
  }
  activityBadgeCount(campaignId: string) {
    this.getActivityBadgeCount(campaignId).subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
        this.activityBadge = res.object;
      } else {
        this.activityBadge = 0;
      }
    })
  }

  getCampaignStatus(campaignId: string, status: boolean) {
    let campaignStatus = new HttpParams()
      .set('campaignId', campaignId)
      .set('status', status)

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaign/updateStatus?${campaignStatus}`
    );
  }

  restartCampaign(campaignId: string) {
    let campaignStatus = new HttpParams()
      .set('campaignId ', campaignId)

    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaign/restartCampaign?${campaignStatus}`, {}
    );
  }

  addToWorkBase(campaignId: string) {
    let campaignStatus = new HttpParams()
      .set('campaignBaseId', campaignId)

    return this.httpClient.post(
      `${environment.coreBackendUrl}/workBase/addToWorkBase?${campaignStatus}`, {}
    );
  }

  updateBaseCampaign(color: string, baseId: string, name: string, emoji: string) {
    let campaignStatus = new HttpParams()
      .set('color', color)
      .set('campaignBaseId', baseId)
      .set('campaignBaseName', name)
      .set('emoji', emoji)

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaignBase/updateCampaignBase?${campaignStatus}`
    );
  }

  restoreCampaign(campaignId: string) {
    let param = new HttpParams()
      .set('campaignId', campaignId)

    return this.httpClient.post(
      `${environment.coreBackendUrl}/trash/restoreCampaign?${param}`, {}
    );
  }

  getBadgeCounter(campaignId: string) {
    let param = new HttpParams()
      .set('campaignId', campaignId)

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaignSetting/getCampaignSettingCount?${param}`
    );
  }

  checkCampaignName(campaignBaseId: string, campaignName: string) {
    let param = new HttpParams()
      .set('campaignName', campaignName)
      .set('campaignBaseId', campaignBaseId)

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaign/check?${param}`
    );
  }

  duplicateCampaign(campaignId: string, baseId: string) {

    return this.httpClient.post(
      environment.coreBackendUrl + "/campaign/duplicateCampaign?campaignId="+campaignId+"&campaignBaseId="+baseId,
      {}
      
    );
  }


  renameCampaign(campId: any, data : any) {

    let param = new HttpParams()
    .set('campaignId', campId)
    .set('campaignName', data)

    return this.httpClient.get(
      environment.coreBackendUrl + `/campaign/updateCampaignName?${param}`
    )
  }

  getNextMailCountdown(campId: string){
    return this.httpClient.get(`${environment.coreBackendUrl}/campaign/getNextSendingTime?campaignId=`+campId)
  }
  

  getUnreadReplie(campId: any) {
    let param = new HttpParams()
    .set('campaignId', campId)
    return this.httpClient.get(
      environment.coreBackendUrl + `/reply/getUnreadCount?${param}`
    )
  }

  changeCampaignStatus(campaignId: string, type: number){
    return this.httpClient.post(`${environment.coreBackendUrl}/campaign/markCompleted?campaignId=${campaignId}&status=${type}`, {})

  }


}
