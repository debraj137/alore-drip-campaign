import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/service/resource/userInfo.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
@Component({
  selector: 'app-add-profile-image-dialog',
  templateUrl: './add-profile-image-dialog.component.html',
  styleUrls: ['./add-profile-image-dialog.component.scss']
})
export class AddProfileImageDialogComponent implements OnInit {
  
  disabledButton: boolean = false;
  isImageUploaded: boolean = false;
  selectedImage: any;
  img : any;
  fd: any;

 
  constructor(
   
    public dialogRef: MatDialogRef<AddProfileImageDialogComponent>,
    private userInfoService: UserInfoService,
    private toastNotification: ToastNotificationService,
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any){

    this.selectedImage = event.target.files[0];
    this.fd = new FormData();
    this.fd.append('file', this.selectedImage, this.selectedImage.name);
    

    this.img = this.selectedImage;
    this.isImageUploaded = true;
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.img = reader.result; 
    }

    

  }

  uploadImage(){
    
    this.userInfoService.uploadImage(this.fd)
    .subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
      
        this.toastNotification.addNotification(
          'Image successfully uploaded!',
          ``,
          NotificationEnum.SUCCESS
        )
      }
    })
  }


}
