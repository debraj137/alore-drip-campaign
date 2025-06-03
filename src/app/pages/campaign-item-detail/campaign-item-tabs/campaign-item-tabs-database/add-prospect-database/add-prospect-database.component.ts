import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProspectService } from '../../../../../service/resource/prospect.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';

@Component({
  selector: 'app-add-prospect-database',
  templateUrl: './add-prospect-database.component.html',
  styleUrls: ['./add-prospect-database.component.scss']
})
export class AddProspectDatabaseComponent implements OnInit {

  prospectForm: FormGroup = new FormGroup({
    email : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    phone : new FormControl(),
    workPhone : new FormControl(),
    address : new FormControl(),
    city : new FormControl(),
    state : new FormControl(),
    title : new FormControl(),
    company : new FormControl(),
    companyDomain : new FormControl(),
    country : new FormControl(),
    linkedin : new FormControl(),
    photo : new FormControl(),
    qualification : new FormControl(),
    industry : new FormControl(),
    tags : new FormControl(),
    verify : new FormControl(),
    companySize : new FormControl(),
    status : new FormControl(),
    aloreId : new FormControl(),
    provider : new FormControl(),

  })
  
  constructor(
    public dialogRef: MatDialogRef<AddProspectDatabaseComponent>,
    public prospectService: ProspectService,
    public toastNotification: ToastNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  
  addProspect(){

    const payload = {
      
        "prospectId": this.data.prospectId,
        "email": this.prospectForm.get('email')?.value,
        "firstName": this.prospectForm.get('firstName')?.value,
        "lastName": this.prospectForm.get('lastName')?.value,
        "phone": this.prospectForm.get('phone')?.value,
        "workPhone": this.prospectForm.get('workPhone')?.value,
        "address": this.prospectForm.get('address')?.value,
        "city": this.prospectForm.get('city')?.value,
        "state": this.prospectForm.get('state')?.value,
        "title": this.prospectForm.get('title')?.value,
        "company": this.prospectForm.get('company')?.value,
        "companyDomain": this.prospectForm.get('companyDomain')?.value,
        "country": this.prospectForm.get('country')?.value,
        "qualification": this.prospectForm.get('qualification')?.value,
        "industry": this.prospectForm.get('industry')?.value,
        "linkedinUrl": this.prospectForm.get('linkedin')?.value,
        "tag": this.prospectForm.get('tags')?.value,
        "profilePhoto": this.prospectForm.get('photo')?.value,
        "campaignId": this.data.campaignId
      }

    this.prospectService.addNewProspect(payload).subscribe((resp: any) => {
      this.dialogRef.close();

      if (resp.responseCodeJson.code == 200) {
      
        this.toastNotification.addNotification(
          'Prospect added successfully',
          `Success`,
          NotificationEnum.SUCCESS
        )
        this.dialogRef.close(payload)
       
      }

      if (resp.responseCodeJson.code == 409) {
      
        this.toastNotification.addNotification(
          'Some error occured',
          `Error`,
          NotificationEnum.DANGER
        )
       
      }
    })
    
    
  }

}
