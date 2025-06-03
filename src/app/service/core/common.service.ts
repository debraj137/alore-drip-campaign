import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor( private httpClient:HttpClient) {}

  // Function to get icon, prevent typo path
  getIcon(type: string): string {
    return `${environment.assetIcons}/icon-${type}.svg`;
  }

  setNumOrdering(num: number): string {
    if (+num === 1) {
      return 'st';
    }

    if (+num === 2) {
      return 'nd';
    }

    if (+num === 3) {
      return 'rd';
    }

    return 'th';
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
