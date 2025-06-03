import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchiveServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getArchieve() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/archive/getAllArchiveCampaigns`
    );
  }


  addArchive(campaignId: string) {

    let addArch = new HttpParams()


      .set('campaignId', campaignId)

    return this.httpClient.post(
      `${environment.coreBackendUrl}/archive/addCampaignToArchive?${addArch}`
      , {});
  }

  removeArchive(campaignId: string) {

    let removeArch = new HttpParams()

      .set('campaignId', campaignId)

    return this.httpClient.post(
      `${environment.coreBackendUrl}/archive/remove?${removeArch}`
      , {});
  }
}
