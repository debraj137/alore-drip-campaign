import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private httpClient: HttpClient
  ) { }
  pageType:number=0;
  getFaqs(screenType:number){
    let params = new HttpParams()

      .set('screenType',screenType)
    return this.httpClient.get(
      `${environment.coreBackendUrl}/faqs/getByType?${params}`
    );
  }
  setPageNumber(pageType:number){
    this.pageType=pageType;
  }


}
export interface FaqStructure{
  answer:String;
  id:number;
  question:String;
  screenType:number;
  expanded?:boolean;
}
