import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddTagPayload } from 'src/app/model/tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  removeTags(tagId : string) {
    let params = new HttpParams()
      .set('tagId', tagId);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/tags/deleteTag?${params}`,
      {}
    );
  }

  addTags(payload : IAddTagPayload[], campaignId?: string) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/tags/addTagList?campaignId=`+campaignId,
      payload
    );
  }

  addTagsToCampaign(tags : string[], campaignId : string) {
    const payload = {
      tags,
      campaignId
    }
    return this.httpClient.post(
      `${environment.coreBackendUrl}/campaign/addTagsForCampaign`,
      payload
    );
  }

  getTagList(campaignId: string) {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/tags/getTagSequence?campaignId=`+campaignId,
    );
  }

  
}
