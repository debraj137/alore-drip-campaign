import { HttpClient, HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { databaseAttribute } from 'src/app/model/databaseAttribute';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCampaignProspect(campaignId: string, page?: number) {
    let params = new HttpParams()
      .set('campaignId', campaignId)
      .set('page', page || 0);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/campaign/getCampaignProspects?${params}`
    );
  }

  uploadCSV(file: any, campaignId: string) {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    let par = new HttpParams()
      .set("campaignId", campaignId)

    return this.httpClient.post(
      `${environment.coreBackendUrl}/prospect/uploadDataFromCsv?${par}`,
      formData
    );
  }

  getSuggestion(csvId: string) {
    let params = new HttpParams()
      .set('csvUploadDataId', csvId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/csvMapping/getSuggestion?${params}`
    );
  }

  deleteUploadedCsv(csvId: string) {
    let params = new HttpParams()
      .set('csvUploadDataId', csvId);

    return this.httpClient.get(
      `${environment.coreBackendUrl}/csvMapping/deleteCsv?${params}`
    );
  }

  csvMapping(payload: any) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/csvMapping/addColumn`,
      payload
    );
  }

  csvProcess(payload: any) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/csvMapping/processCsv`,
      payload
    );
  }

  // getProspectAttribute() {
  //   return this.httpClient.get(
  //     `${environment.coreBackendUrl}/prospect/getAllAttributes`
  //   );
  // }
  
  getProspectAttribute(campaignId: string) {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/prospect/getAllDatabaseAttributes?campaignId=`+campaignId
    );
  }

  getProspectDatabaseAttribute() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/prospect/getAllAttributes `
    );
  }

  updateProspect(payload: databaseAttribute, campaignId ?: any) {

    return this.httpClient.post(
      `${environment.coreBackendUrl}/prospect/update?campaignId=`+campaignId,
       payload
    );
  }

  addNewProspect(payload : any){
    return this.httpClient.post(
      `${environment.coreBackendUrl}/prospect/addNewProspect`,
       payload
    );
  }

  getCsvFile(campaignId: string) {
    let per = new HttpParams()
      .set("campaignId", campaignId)
    return this.httpClient.get(
      `${environment.coreBackendUrl}/csvMapping/getCurrentCsv?${per}`
    );
  }

  getFilteredProspect(payload: any) {
    return this.httpClient.post(
      `${environment.coreBackendUrl}/prospect/getFilteredProspect`,
      payload
    );
  }

  getCsvPreview(csvId : string) {
    let per = new HttpParams()
      .set("csvUploadDataId", csvId)
    return this.httpClient.get(
      `${environment.coreBackendUrl}/csvEdit/getData?${per}`
    );
  }

  uploadCsvPreview(data : any[], csvId: string) {
    let param = new HttpParams()
      .set("csvUploadDataId", csvId)

    return this.httpClient.post(
      `${environment.coreBackendUrl}/csvEdit/storeData?${param}`,
      {
        data: data
      }
    )
  }
}
