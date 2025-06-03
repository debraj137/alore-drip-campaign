import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  recomendation = new BehaviorSubject<any>([[]]);
  emailBody = new BehaviorSubject<string>('');
  emailSubject = new BehaviorSubject<number>(0);

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getScore(content: string, subjectLength: number, campaignId: string) {
    var div = document.createElement("div")
    div.innerHTML = content.replace(/&nbsp/g, ' ')
    const innerText = div.textContent || div.innerText || ""
    let bodyLength : number = 0
    if (innerText) {
      let splittedBody = innerText.split(' ')
      bodyLength = splittedBody.length
    }

    let params = new HttpParams()
    .set('contentLength', bodyLength)
    .set('subjectLength', subjectLength)
    .set('campaignId', campaignId);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/spam/getScore?${params}`,
      {content : innerText}
    );
  }
}
