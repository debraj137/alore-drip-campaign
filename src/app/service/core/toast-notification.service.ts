import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToastNotification } from 'src/app/model/toast-notification';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  toastNotificationList = new BehaviorSubject<IToastNotification[]>([]);
  
  constructor(
    private httpClient: HttpClient
  ) { }

  addNotification(title : string, message : string, status : string, timeout ?: number){
    
    let showNotification = true;
    const currentNotification = this.toastNotificationList.value;
    const messageData:IToastNotification = {
      expired : false,
      message : message,
      status : status,
      title: title,
      id : Math.floor((Math.random() * 1000) + 1),
    }
    
    this.toastNotificationList.next([messageData, ...currentNotification])
      
  }


  hardreload() {
    
    return this.httpClient.post(
      `${environment.coreBackendUrl}/version/getVersionHistory` , {}
    );
  }
  
}
