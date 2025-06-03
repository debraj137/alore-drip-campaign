import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup } from '@angular/forms';
import { SignatureService } from 'src/app/service/core/signature.service';

import { CommonService } from 'src/app/service/core/common.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { AddProfileImageDialogComponent } from 'src/app/pages/user-profile/user-info/add-profile-image-dialog/add-profile-image-dialog.component';


@Component({
  selector: 'app-mail-signature-dialog',
  templateUrl: './mail-signature-dialog.component.html',
  styleUrls: ['./mail-signature-dialog.component.scss']
})
export class MailSignatureDialogComponent implements OnInit {
 
  disabledButton: boolean = false;
  isLoaded: boolean = false;
  userImage = "";
  currentSignatureIndex !: number;
  defaultImage = "https://alorecdn.blob.core.windows.net/crmdata/avtar.png"
  signature0 = "<!DOCTYPE html><html><head> <link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet'></head><style type='text/css'> body{background-color: gray;}/*Dont insert these proprties */ *{box-sizing: border-box;}/*Dont insert these proprties */ .signature-card{margin-bottom: 50px;}/*Dont insert these proprties */ .signature-card{max-width: 550px; height: 244px; border-radius: 5px; border: 1px solid rgba(24, 24, 24, 0.1); filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08)) drop-shadow(0px 4px 12px rgba(24, 24, 24, 0.08)); border-radius: 5px; background-color: #fff; position: relative; font-family: 'Inter';}.signature-card h6, .signature-card p{margin: 0px; padding: 0px;}.signature_inner{display: flex; flex-direction: column; justify-content: center; align-items: flex-start; height: 100%; text-align: left;}/* .text-center{text-align: center;}*/ .dot-divider-horizontal{border: 2px dashed rgba(24, 24, 24, 0.2); width: 296px; margin: 14px auto 16px auto;}.dot-divider-verticle{height: 168.03px; border: 2px dashed rgba(24, 24, 24, 0.2);}.avtar-box{height: 48px; width: 48px; margin: 0 auto; border-radius: 18px;}.avtar-box img{width: 100%; height: 100%; object-fit: cover;}.signature_inner h6{font-style: normal; font-weight: 700; font-size: 18px; line-height: 28px; text-align: center; color: #181818; text-transform: capitalize;}.signature_inner p{font-style: normal; font-weight: 400; font-size: 14px; line-height: 24px; text-align: center; color: #474A57; text-transform: capitalize;}/*bagde style*/ .recommended-badge{background: #1BD2A4; height: 23px; width: 113px; display: flex; align-items: center; gap: 5px; border-radius: 5px; justify-content: center; padding: 4px 5px; position: absolute; right: 20px; top: 20px;}.recommended-badge p{font-family: 'Inter'; font-style: normal; font-weight: 600; font-size: 10px; line-height: 116%; color: #FFFFFF;}.avtar-card{display: flex; align-items: center; gap: 25px;}.avtar-card .content{display: flex; flex-direction: column; align-items: flex-start;}.avtar-card.whole-content{gap: 21.5px !important;}.mb-8{margin-bottom: 8px !important;}</style><body> <div class='signature-card'> <div class='signature_inner'> <h6>{{name}}</h6> <p>{{title}}</p><p>{{email}} | {{phone}}</p></div></div></body></html>" 
  signature1 = "<!DOCTYPE html><html><head><link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet'></head><style type='text/css'>body{background-color:gray}*{box-sizing:border-box}.signature-card{margin-bottom:50px}.signature-card{max-width:550px;height:244px;border-radius:5px;border:1px solid rgba(24,24,24,.1);filter:drop-shadow(0 4px 12px rgba(0, 0, 0, .08)) drop-shadow(0 4px 12px rgba(24, 24, 24, .08));border-radius:5px;background-color:#fff;position:relative;font-family:Inter}.signature-card h6,.signature-card p{margin:0;padding:0}.signature_inner{padding:45px;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%}.dot-divider-horizontal{border:2px dashed rgba(24,24,24,.2);width:296px;margin:14px auto 16px auto}.dot-divider-verticle{height:168.03px;border:2px dashed rgba(24,24,24,.2)}.avtar-box{height:48px;width:48px;margin:0 auto;border-radius:18px}.avtar-box img{width:100%;height:100%;object-fit:cover}.signature_inner h6{font-style:normal;font-weight:700;font-size:18px;line-height:28px;text-align:center;color:#181818;text-transform:capitalize}.signature_inner p{font-style:normal;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57;text-transform:capitalize}.recommended-badge{background:#1bd2a4;height:23px;width:113px;display:flex;align-items:center;gap:5px;border-radius:5px;justify-content:center;padding:4px 5px;position:absolute;right:20px;top:20px}.recommended-badge p{font-family:Inter;font-style:normal;font-weight:600;font-size:10px;line-height:116%;color:#fff}.avtar-card{display:flex;align-items:center;gap:25px}.avtar-card .content{display:flex;flex-direction:column;align-items:flex-start}.avtar-card.whole-content{gap:21.5px!important}.mb-8{margin-bottom:8px!important}hr.new2{border-top:1px dashed #000;width:200px}</style><body><div class='signature-card'><div class='signature_inner'><div class='avtar-card whole-content'><div class='avtar-box'><img src='{{image}}' alt='avtar'></div><div class='dot-divider-verticle'></div><div class='content'><h6>{{name}}</h6><p class='mb-8'>{{title}}</p><p>{{email}}</p><p>{{phone}}</p><p>{{companyName}}</p></div></div></div></div></body></html>"
  signature2 = "<!DOCTYPE html><html><head><link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet'></head><style type='text/css'>body{background-color:gray}*{box-sizing:border-box}.signature-card{margin-bottom:50px}.signature-card{max-width:550px;height:244px;border-radius:5px;border:1px solid rgba(24,24,24,.1);filter:drop-shadow(0 4px 12px rgba(0, 0, 0, .08)) drop-shadow(0 4px 12px rgba(24, 24, 24, .08));border-radius:5px;background-color:#fff;position:relative;font-family:Inter}.signature-card h6,.signature-card p{margin:0;padding:0}.signature_inner{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;height:100%}.text-center{text-align:center}.dot-divider-horizontal{border:2px dashed rgba(24,24,24,.2);width:296px;margin:14px auto 16px 0}.dot-divider-verticle{height:168.03px;border:2px dashed rgba(24,24,24,.2)}.avtar-box{height:48px;width:48px;border-radius:18px}.avtar-box img{width:100%;height:100%;object-fit:cover}.signature_inner h6{font-style:normal;font-weight:700;font-size:18px;line-height:28px;text-align:center;color:#181818;text-transform:capitalize}.signature_inner p{font-style:normal;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57;text-transform:capitalize}.recommended-badge{background:#1bd2a4;height:23px;width:113px;display:flex;align-items:center;gap:5px;border-radius:5px;justify-content:center;padding:4px 5px;position:absolute;right:20px;top:20px}.recommended-badge p{font-family:Inter;font-style:normal;font-weight:600;font-size:10px;line-height:116%;color:#fff}.avtar-card{display:flex;align-items:center;gap:25px}.avtar-card .content{display:flex;flex-direction:column;align-items:flex-start}.avtar-card.whole-content{gap:21.5px!important}.mb-8{margin-bottom:8px!important}</style><body><div class='signature-card'><div class='signature_inner'><div class='avtar-box'><img src='{{image}}' alt='avtar'></div><div class='dot-divider-horizontal'></div><h6>{{name}}</h6><p>{{title}} at {{companyName}}</p><p>{{email}} | {{phone}}</p></div></div></body></html>"
  signature3 = "<!DOCTYPE html><html><head> <link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet'></head><style type='text/css'> body{background-color: gray;}/*Dont insert these proprties */ *{box-sizing: border-box;}/*Dont insert these proprties */ .signature-card{margin-bottom: 50px;}/*Dont insert these proprties */ .signature-card{max-width: 550px; height: 244px; border-radius: 5px; border: 1px solid rgba(24, 24, 24, 0.1); filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08)) drop-shadow(0px 4px 12px rgba(24, 24, 24, 0.08)); border-radius: 5px; background-color: #fff; position: relative; font-family: 'Inter';}.signature-card h6, .signature-card p{margin: 0px; padding: 0px;}.signature_inner{display: flex; flex-direction: column; justify-content: center; align-items: flex-start; height: 100%;}.text-center{text-align: center;}.dot-divider-horizontal{border: 2px dashed rgba(24, 24, 24, 0.2); width: 296px; margin: 14px auto 16px 0;}.dot-divider-verticle{height: 168.03px; border: 2px dashed rgba(24, 24, 24, 0.2);}.avtar-box{height: 48px; width: 48px; /* margin: 0 auto; */ border-radius: 18px;}.avtar-box img{width: 100%; height: 100%; object-fit: cover;}.signature_inner h6{font-style: normal; font-weight: 700; font-size: 18px; line-height: 28px; text-align: center; color: #181818; text-transform: capitalize;}.signature_inner p{font-style: normal; font-weight: 400; font-size: 14px; line-height: 24px; text-align: center; color: #474A57; text-transform: capitalize;}/*bagde style*/ .recommended-badge{background: #1BD2A4; height: 23px; width: 113px; display: flex; align-items: center; gap: 5px; border-radius: 5px; justify-content: center; padding: 4px 5px; position: absolute; right: 20px; top: 20px;}.recommended-badge p{font-family: 'Inter'; font-style: normal; font-weight: 600; font-size: 10px; line-height: 116%; color: #FFFFFF;}.avtar-card{display: flex; align-items: center; gap: 25px;}.avtar-card .content{display: flex; flex-direction: column; align-items: flex-start;}.avtar-card.whole-content{gap: 21.5px !important;}.mb-8{margin-bottom: 8px !important;}</style><body> <div class='signature-card'> <div class='signature_inner'> <h6>{{name}}</h6> <p>{{title}} at {{companyName}}</p><p>{{email}} | {{phone}}</p><div class='dot-divider-horizontal'></div><div class='avtar-box'> <img src='{{image}}' alt='avtar'> </div></div></div></body></html>"


  signature: FormGroup = new FormGroup({
    name : new FormControl(''),
    title : new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    company: new FormControl(''),
    website: new FormControl(''),
   
    
  })

  constructor(
    public dialogRef: MatDialogRef<MailSignatureDialogComponent>,
    public signatureService: SignatureService,
    public commonService: CommonService,
    private dialog: MatDialog,
    private toastNotification: ToastNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.currentSignatureIndex = this.data.priority;

    this.signatureService.getUserProfileImage().subscribe((resp: any) => {
      if(resp.responseCodeJson.code === 200)
      this.userImage = resp.object.profilePicture;
    });

    this.signatureService.currentSignatureIndex.subscribe((data: any) => {
      this.currentSignatureIndex = data.no;
    })

    this.signatureService.getSignature().subscribe((resp: any) => {
      if(resp.responseCodeJson.code === 200 || resp.responseCodeJson.code === 409){
        
        this.signature.get('name')?.setValue(resp?.object?.name || '') ;
        this.signature.get('title')?.setValue(resp?.object?.title || '');
        this.signature.get('email')?.setValue(resp?.object?.emailId || '');
        this.signature.get('phone')?.setValue(resp?.object?.phoneNumber || '');
        this.signature.get('company')?.setValue(resp?.object?.companyName || '');
        this.signature.get('website')?.setValue(resp?.object?.companyUrl || '');

        this.isLoaded = true;

      }

      else{
        if (resp.responseCodeJson.code !== 200) {
      
          this.toastNotification.addNotification(
            resp.responseCodeJson.message,
            ``,
            NotificationEnum.DANGER
          )
        }
      }
    });
     
    
  }

  submitSignature(){
      
      let signature = "";
      let name = this.signature.get('name')?.value;
      let title = this.signature.get('title')?.value;
      let email = this.signature.get('email')?.value;
      let phone = this.signature.get('phone')?.value;
      let company = this.signature.get('company')?.value;
      let website = this.signature.get('website')?.value;
    

      switch(this.currentSignatureIndex){
        case(0):
          signature = this.signature0;
          break;

        case(1):
          signature = this.signature1;
          break; 
          
        case(2):
          signature = this.signature2;
          break;

        case(3):
          signature = this.signature3;
          break;
        
      }

      

      if(this.userImage == "")
        this.userImage = this.defaultImage

      signature = signature.replace("{{name}}", name || '-' );
      signature = signature.replace("{{title}}", title || '-');
      signature = signature.replace("{{email}}", email || '-');
      signature = signature.replace("{{phone}}", phone || '-');
      signature = signature.replace("{{image}}", this.userImage || '-');

      signature = signature.replace("{{companyName}}", company || '-');
      signature = signature.replace("{{website}}", website || '-');

      const obj = {
        "name": name,
        "title": title,
        "email": email,
        "phone": phone,
        "companyName": company,
        "companyUrl": website,
        "signature": signature
      }
      
      
      this.signatureService.sendSignture(obj).subscribe((resp: any) => {
        if (resp.responseCodeJson.code === 200) {
      
          this.toastNotification.addNotification(
            'Your information is updated successfully!',
            ``,
            NotificationEnum.SUCCESS
          )
        }

        if (resp.responseCodeJson.code !== 200) {
      
          this.toastNotification.addNotification(
            resp.responseCodeJson.message,
            ``,
            NotificationEnum.DANGER
          )
        }
      })
  }

  uploadImageDialog(){
    const dialog = this.dialog.open(AddProfileImageDialogComponent, {
      
      backdropClass: 'backdrop-background'
      
    });
  }

}
