import { HttpClient, HttpParams,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplieService {



  constructor(
    private httpClient: HttpClient
  ) {

  }

  replyDetails(messageId: string){
    let param = new HttpParams()
      .set('messageId', messageId)

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/getReplyDetails?${param}`, {}
    );
  }
  

  getAllMails(campaignId: string) {
    
    let par = new HttpParams()
      .set('campaignId', campaignId)

    return this.httpClient.get(
      environment.coreBackendUrl + `/reply/getReplies?${par}`, {}
    );
  }

  getThread(campaignId: string, threadId: string) {
    
    let par = new HttpParams()
      .set('campaignId', campaignId)
      .set('threadId',threadId)

    return this.httpClient.get(
      environment.coreBackendUrl + `/reply/getThreadReplies?${par}`, {}
    );
  }


  getTeammatesList() {
    
    return this.httpClient.get(
      environment.coreBackendUrl + `/user/getTeammates`
    );
  }

  getMailCount(messageId: string) {
    let param = new HttpParams()
    .set('messageId', messageId)

  return this.httpClient.post(
    environment.coreBackendUrl + `/reply/markSnooze?${param}`, {}
  );
  }
  
  markMailAsSnooze(messageId: string, status: boolean, snoozeDate: any){
    let param = new HttpParams()
      .set('messageId', messageId)
      .set('status', status)
      .set('snoozeDate', snoozeDate)

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/markSnooze?${param}`, {}
    );
  }

  markMailUnSnooze(messageId: string){
    let param = new HttpParams()
      .set('messageId', messageId)

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/markUnSnooze?${param}`, {}
    );
  }



  markMailAsUnread(messageId: string, status: boolean){
    let param = new HttpParams()
      .set('messageId', messageId)
      .set('status', status)

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/markReadUnread?${param}`, {}
    );
  }

  markAsImportant(messageId: string, status: boolean){
    let param = new HttpParams()
      .set('messageId', messageId)
      .set('status', status)

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/markImportant?${param}`, {}
    );
  }

  markAsDelete(messageId: string){
    let param = new HttpParams()
      .set('messageId', messageId)
      
    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/markDelete?${param}`, {}
    );

  }

  markAsArchive(messageId: string, status: boolean){
    let param = new HttpParams()
      .set('messageId', messageId)
      .set('status', status)

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/markArchive?${param}`, {}
    );
  }

  multiSelect(payload:any, type: any, status: any ) {
    let param = new HttpParams()
      .set('type', type)
      .set('status', status)

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/updateReplyList?${param}`, 
      payload
    );
  }

  forwardMail(payload: any){

    return this.httpClient.post(
    environment.coreBackendUrl + "/reply/mailForward",
    payload
    )
  }

  replyToMail(payload: any){
    return this.httpClient.post(
      environment.coreBackendUrl + "/reply/singleReply",
      payload
      )
  }

  replyAllToMail(payload: any){
    return this.httpClient.post(
      environment.coreBackendUrl + "/reply/multipleReply",
      payload
      )
  }


  addLabel(labelName: string, labelColor: string){

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/addLabel`, 
      {
        labelName,
        labelColor
      }
    );
  }

  getLabelList(messageId: any){

    let param = new HttpParams()
      .set('messageId', messageId)

    return this.httpClient.get(
      environment.coreBackendUrl + `/reply/getUserLabel?${param}`, {}
    );
  }

  applyLabel(payload: any) {

    return this.httpClient.post(
      environment.coreBackendUrl + `/reply/assignLabel`, 
     
      payload
     
    );
  }

  addProspect(payload: any) {

    return this.httpClient.post(
      environment.coreBackendUrl + `/prospect/addProspectsToCampaign`, 
     
      payload
     
    );
  }

}
