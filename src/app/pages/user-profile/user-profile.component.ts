import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/service/resource/userInfo.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  breadcrumbData: any[]=[];
  disabledButton: boolean = false;
  tabLayoutActive: number = 0;
  activityList: [] = [];
  userInfo: {} = {};
  email: string = "";
  isActivityLoaded: boolean = false;
  isUserInfoLoaded: boolean = false;
  lastPasswordChangeDate: string = "";
  
  constructor(
    private userInfoService: UserInfoService,
    private dialog: MatDialog,
    
  ) { }

  

  ngOnInit(): void {

    this.breadcrumbData = [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Profile',
        link: '/userProfile'
      },
    ];

    this.getActivityData();
    this.getUserProfile();
  }

  onTabLayoutClick(index: number): void {
    this.tabLayoutActive = index;
  }

  getActivityData() {
    
    this.userInfoService.getUserActivity().subscribe(
      (resp: any) => {
       
        if (resp.responseCodeJson.code === 200) {
          this.activityList = resp.list;

          resp.list.every((element: any) => {
              if(element.activityType == 2 || element.activityType == 3){
                this.lastPasswordChangeDate = element.activityDate;
                return false;
              }
              return true;
          });  
          this.isActivityLoaded = true;
        }    
      }
    )
  }

  getUserProfile(){
    this.userInfoService.getUserProfile().subscribe((resp: any)=>{
      if(resp.responseCodeJson.code === 200){
        
        this.userInfo = {
        "userName" : resp.object?.firstName+" "+resp.object?.lastName,
        "position" :  resp.object?.jobTitle,
        "companyName": resp.object?.companyName,
        "linkedIn": resp.object?.linkedinURL,
        "twitter": resp.object?.twitterURL,
        "companyUrl": resp.object?.companyURL,
        "phone": resp.object?.phoneNumber,
        "timeZone": resp.object?.timeZone,
        "userImageUrl": resp.object?.profilePicture,
        
        }

        this.email= resp.object?.emailId,
        this.isUserInfoLoaded = true;

      }
    });
  }

  removeProfile(){
    const dialog = this.dialog.open(DeleteAccountDialogComponent, {
      
      backdropClass: 'backdrop-background',
    });
  }

  


}
