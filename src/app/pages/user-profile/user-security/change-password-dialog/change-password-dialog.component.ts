import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/service/resource/userInfo.service';
import { MailSentConfirmationDialogComponent } from './mail-sent-confirmation-dialog/mail-sent-confirmation-dialog.component';
import { ToastNotificationService } from '../../../../service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  
  disabledButton: boolean = false;
  userId: string = "";
  @Input() email: string = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private userInfoService: UserInfoService,
    private ToastNotification: ToastNotificationService
    
  ) { }

  ngOnInit(): void {
    this.email = this.data.email;
  }

  onPasswordReset(){
    this.userInfoService.forgotPassword(this.email).subscribe((resp: any) =>{

      if(resp.responseCodeJson.code === 200){
        const dialog = this.dialog.open(MailSentConfirmationDialogComponent, {
          data: {
            email : this.email
          },
          backdropClass: 'backdrop-background',
        });
        this.dialogRef.close();
      }

      if(resp.responseCodeJson.code === 409){
        this.dialogRef.close()
        this.ToastNotification.addNotification(
          'Password cannot be reset',
          'This email has been integrated via Social Media',
          NotificationEnum.DANGER
        )
      }
    });
    
    
    
  }

  }

 

  


