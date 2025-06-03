import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileImageDialogComponent } from './add-profile-image-dialog/add-profile-image-dialog.component';
import { EditPersonalDetailsDialogComponent } from './edit-personal-details-dialog/edit-personal-details-dialog.component';
import { IUserInfo } from 'src/app/model/userInfo';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  
  userImageUrl: string = "";
  userName : string = "";
  position: string = "";
  companyName: string = "";
  linkedIn : string = "";
  twitter: string = "";
  companyUrl: string = "";
  phone: string = "";
  timeZone: string = "";
  email: string = ""
  
  @Input() userInfo: IUserInfo = {}

  img: any;

  disabledButton: boolean = false;


  constructor(
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  
  }

  editPersonalDetailsDialog() {
    const dialog = this.dialog.open(EditPersonalDetailsDialogComponent, {
      data: {
     
      },
      backdropClass: 'backdrop-background',
    });
  }

  uploadImageDialog() {
    const dialog = this.dialog.open(AddProfileImageDialogComponent, {
      
      backdropClass: 'backdrop-background',
    });
  }

}
