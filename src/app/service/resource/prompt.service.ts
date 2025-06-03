import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  emailPrompt = new Subject<any>();
  closePrompt = new BehaviorSubject<boolean>(false);
  currentPrompt = new BehaviorSubject<string>('');
  $email = this.emailPrompt.asObservable();
  $close = this.closePrompt.asObservable();
  $prompt = this.currentPrompt.asObservable()


  setEmailBody(body: string) {
    this.emailPrompt.next(body)
  }

  closeChatPrompt(){
    this.closePrompt.next(false)
  }

  setPrompt(prompt: string){
    this.currentPrompt.next(prompt)
  }

  promptConverstation(payload: any) {
    return this.httpClient.post(environment.coreBackendUrl+'/personalizedEmail/generateEmailByAI', payload)
  }

  getPromptTypes(){
    return this.httpClient.get(environment.coreBackendUrl+'/prompt/types')
  }

  getPromptSubTypes(typeId: string){
    return this.httpClient.get(environment.coreBackendUrl+'/prompt/subTypes?typeId='+typeId)
  }

  getExamplePrompt(subTypeId : string){
    return this.httpClient.get(environment.coreBackendUrl+'/prompt/promptExample?subTypeId='+subTypeId )
  }



  
  constructor(
    private httpClient:    HttpClient
  ) { }
}
