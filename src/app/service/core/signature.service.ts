import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  private signatureIndex = new Subject<any>();
  currentSignatureIndex = this.signatureIndex.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  changeSignatureIndex(i : any){
    this.signatureIndex.next(i)
  }

  getSignature() {

    return this.httpClient.get(
      `${environment.coreBackendUrl}/signature/getUserSignature`
    );
  }

  sendSignture(payload: any) {
    
      
    return this.httpClient.post(
      `${environment.coreBackendUrl}/signature/add`, payload
    );
  }

  getUserProfileImage(){

    let token = JSON.parse(localStorage.getItem('usrCompObj') || '{}')?.token;
    const customHeader = {
        headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' +
        token,
    )};

    return this.httpClient.get("https://auth.alore.io:9090/user/getUserImage", )
  }
}
