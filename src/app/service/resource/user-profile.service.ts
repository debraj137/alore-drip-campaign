
import { HttpClient, HttpParams } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { allUserIntregation, IUserList, UserAccount } from 'src/app/model/user';
import { UserDetails } from 'src/app/model/user-comp-obj';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {


    
  constructor(
    private httpClient: HttpClient
  ) { }

  


  getUserProfile() {

    return this.httpClient.get(
      `${environment.coreBackendUrl}/user/getUserDetails`

    );
  }

  getUserList(payload: UserDetails[]) {
    return this.httpClient.post(
      environment.coreBackendUrl + '/user/getUserList',  payload
    );
  }


  getIntegrationUser(baseId: StringMap) {

    return this.httpClient.get(
      environment.coreBackendUrl + `/label/allIntegratedUsers?campaignBaseId=${baseId}`

    );
  }

  addAllIntegration(payload: allUserIntregation) {

    return this.httpClient.post(
      environment.coreBackendUrl + '/label/addIntegration',
      payload
    );
  }

}
