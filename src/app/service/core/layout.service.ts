import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { UserCompObj } from 'src/app/model/user-comp-obj';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { SideMenuTreeService } from './side-menu-tree.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidebar = new BehaviorSubject<Boolean>(true);
  campaignAccess = new BehaviorSubject<string>('');
  notificatioNTrigger = new BehaviorSubject<boolean>(true);
  databaseBadge = new BehaviorSubject<number>(0);
  templateList = new BehaviorSubject<any[]>([]);
  databaseHeader = new BehaviorSubject<any[]>([]);
  databaseHeaderOrigin = new BehaviorSubject<any[]>([]);
  tickCampaignDetail = new BehaviorSubject<boolean>(true);

  constructor(
    private dialog: MatDialog,
    private treeService: SideMenuTreeService,
    public router: Router,
    private httpClient: HttpClient
  ) { }

  updateSidebarStatus(sidebarStatus: boolean) {
    if (this.router.url.toString().includes('objectives'))
      localStorage.setItem('sidebar', JSON.stringify(true));

    else
      localStorage.setItem('sidebar', JSON.stringify(sidebarStatus));
  }

  get getSidebarStatus(): boolean {
    if (localStorage.getItem('sidebar')) {
      return JSON.parse(localStorage.getItem('sidebar') || '{}')
    } else {
      return false
    }
  }

  openAlertDialog(
    subHeading: string,
    message: string,
    isMandatory: boolean,
    img: string,
    title?: string,
  ) {
    return this.dialog.open(AlertComponent, {
      data: {
        message: message,
        isMandatory: isMandatory,
        subHeading: subHeading,
        img: img,
        title: title,
      },
      panelClass: 'alert-dialog',
      backdropClass: 'backdrop-background'
    });
  }

  changeUser(userData: any) {
    const usrCompObj = {
      companyId: userData.companyId,
      token: userData.token,
      userId: userData.userId,
    }
    localStorage.setItem('usrCompObj', JSON.stringify(usrCompObj));
    this.treeService.tickSideMenu.next(true)
    const userName = this.uppercaseFirstLetter(userData.firstName) + ' ' + this.uppercaseFirstLetter(userData.lastName)
  }

  saveLogOutActivity() {
    let token = JSON.parse(localStorage.getItem('usrCompObj') || '{}')?.token;
    const customHeader = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' +
        token,
      )
    };

    return this.httpClient.post('https://auth.alore.io:9090/activity/save', {}, customHeader)
  }

  doLogout(redirectToHome: boolean = false) {
    // dont remove this code, its disabled temporaly
    // const usrCompObj = JSON.parse(localStorage.getItem('usrCompObj') || '');
    // let usrList = JSON.parse(localStorage.getItem('usrList') || '');
    // usrList = usrList.filter((data:any) =>
    //   data.userid !== usrCompObj.userid
    // )
    // localStorage.setItem('usrList',  JSON.stringify(usrList));
    // if(usrList.length >= 1){
    //   this.changeUser(usrList[0])
    //   if (redirectToHome) {
    //     this.router.navigate([''])
    //   }
    // } else {
    //   localStorage.clear();
    //   this.router.navigate([''])
    // }
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

  uppercaseFirstLetter(str: string) {
    var firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
  }

  get usrCompObj(): UserCompObj {
    return JSON.parse(localStorage.getItem('usrCompObj') || '{}')
  }
}
