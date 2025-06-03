import { addlabel } from './../../model/objectives';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllobjectives() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/objective/getAllObjective`
    );
  }

  getAllImages() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/user/getAllCoverImages`
    );
  }

  getCampaignEmail(campaignId: string) {
    let params = new HttpParams()
      .set('campaignId', campaignId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/personalizedEmail/getCampaignEmail?${params}`
    );
  }

  addNumberOfEmailTemplate(campaignId: string, emailAmount: number, completionStatus: number) {
    let params = new HttpParams()
      .set('number', emailAmount)
      .set('campaignId', campaignId)
      .set('completionStatus', completionStatus);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaignSetting/addNumberOfEmailTemplate?${params}`
    );
  }

  getObjectSepcificreciepes(objectiveId: string) {
    let params = new HttpParams()
      .set('objectiveId', objectiveId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/objective/getRecipesByObjectiveId?${params}`
    );
  }

  getObjectWithRecipes() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/objective/getObjectiveWithRecipes`
    );
  }

  getCurrentRecipeDetails(recipeId: any) {
    let params = new HttpParams()
      .set('objectiveRecipeId', recipeId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/recipes/getRecipeById?${params}`
    );
  }

  getEmailTemplatesOfTheRecipe(recipeId: any) {
    let params = new HttpParams()
      .set('objectiveRecipeId', recipeId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/recipes/getAllTemplatesOfRecipes?${params}`
    );
  }

  getAllTimeZones() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/timeZone/getAll`
    );
  }

  sendAllIntervals(payload: any, completionStatus: number) {
    let params = new HttpParams()
      .set('completionStatus', completionStatus);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaignSetting/setMailTime?${params}`,
      payload
    );
  }

  ContinueWithTheDefaultSettings(recipeId: any, camapignId: any) {
    let params = new HttpParams()
      .set('objectiveRecipeId', recipeId)
      .set('campaignId', camapignId)

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaign/useObjectiveProperties?${params}`
      // environment.coreBackendUrl + `/campaign/useObjectiveProperties`,payload
    );
  }

  getAllLabels() {
    return this.httpClient.get(
      environment.coreBackendUrl + `/label/getUserLabels`
    );
  }

  getAllLabelsForCampaign(campId: any) {
    return this.httpClient.get(
      environment.coreBackendUrl + `/label/getCampaignLabels?campaignId=` + campId
    )
  }

  addLabel(paylaod: any) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/label/add`, paylaod
    )
  }

  removeLabels(labelId: string) {
    let params = new HttpParams()
      .set('labelId', labelId);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/label/remove?${params}`,
      {}
    );
  }

  sendCustomTimeZone(campId: any, time: any, completionStatus: number) {
    let params = new HttpParams()
      .set('campaignId', campId)
      .set('timeZone', time)
      .set('completionStatus', completionStatus)

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaignSetting/setTimezone?${params}`
    )
  }

  sendVolume(campId: any, volume: any, completionStatus: number) {
    let params = new HttpParams()
      .set('campaignId', campId)
      .set('mails', volume)
      .set('completionStatus', completionStatus);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaignSetting/setVolume?${params}`
    )
  }

  setDays(daysList: any, completionStatus: number) {
    let params = new HttpParams()
      .set('completionStatus', completionStatus);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaignSetting/setDays?${params}`,
      daysList
    )
  }

  setTimeInterval(payload: any, completionStatus: number) {
    let params = new HttpParams()
      .set('completionStatus', completionStatus);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaignSetting/setTimeInterval?${params}`,
      payload
    )
  }
}

