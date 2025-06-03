import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/service/resource/userInfo.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';

@Component({
  selector: 'app-edit-personal-details-dialog',
  templateUrl: './edit-personal-details-dialog.component.html',
  styleUrls: ['./edit-personal-details-dialog.component.scss']
})
export class EditPersonalDetailsDialogComponent implements OnInit {
  

  disabledButton: boolean = false;
  tabLayoutActive: number = 0;
  userId: string = "";
  isUserInfoDataFetched: boolean = false;

  firstName: string = "";
  lastName: string = "";
  companyName: string = "";
  linkedInUrl: string = "";
  twitterUrl: string = "";
  companyUrl: string = "";
  timezone: string = "";
  contactNo: string = "";
  jobTitle: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditPersonalDetailsDialogComponent>,
    private userInfoService: UserInfoService,
    private toastNotification: ToastNotificationService,
  ) { }
  

  ngOnInit(): void {
    this.userInfoService.getUserProfile().subscribe((resp: any)=>{
      if(resp.responseCodeJson.code === 200){
        
        this.firstName = resp.object?.firstName;
        this.lastName = resp.object?.lastName;
        this.companyName = resp.object?.companyName;
        this.linkedInUrl = resp.object?.linkedinURL;
        this.twitterUrl = resp.object?.twitterURL;
        this.companyUrl = resp.object?.companyURL;
        this.contactNo = resp.object.phoneNumber;
        this.timezone = resp.object?.timeZone;
        this.jobTitle = resp.object?.jobTitle

        this.isUserInfoDataFetched = true;

      }
  });
  }

  onTabLayoutClick(index: number): void {
    this.tabLayoutActive = index;
  }

  submitUserDetails(){
      const payload = {
        "companyName": this.companyName,
        "companyUrl": this.companyUrl,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "linkedinUrl": this.linkedInUrl,
        "phoneNumber": this.contactNo,
        "timeZone": this.timezone,
        "twitterUrl": this.twitterUrl,
        "jobTitle": this.jobTitle
      }

      this.userInfoService.updateUserProfile(payload).subscribe((resp:any) => {

        if (resp.responseCodeJson.code === 200) {
      
          this.toastNotification.addNotification(
            'Your information is updated successfully!',
            ``,
            NotificationEnum.SUCCESS
          )
        }

        if (resp.responseCodeJson.code !== 200) {
      
          this.toastNotification.addNotification(
            'Some error occurred!',
            ``,
            NotificationEnum.DANGER
          )
        }

        window.location.reload();

      })
  }



}
