import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { EmailEditorChangeColorComponent } from 'src/app/shared/email-editor/email-editor-change-color/email-editor-change-color.component';
import { EmailEditorCreateLinkComponent } from 'src/app/shared/email-editor/email-editor-create-link/email-editor-create-link.component';
import { EmailEditorUploadFileComponent } from 'src/app/shared/email-editor/email-editor-upload-file/email-editor-upload-file.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailEditorService {

  tickSaveTemplate = new BehaviorSubject<boolean>(false);
  dummyEmailBody : string = '<p><span style="white-space:pre-wrap;">Hi {First Name},</span>&nbsp;</p><p><br></p><p><span style="white-space:pre-wrap;">I am <span class="froala-textbox">Enter Your Name</span> <span style="white-space:pre-wrap;">from</span> <span id="isPasted" style="color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"><span class="froala-textbox">Enter your company name</span>&nbsp;</span> . <span id="isPasted" style="color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"><span class="froala-textbox">Enter your company name</span>&nbsp;</span> is a <span id="isPasted" style="color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"><span class="froala-textbox">Define your company</span>&nbsp;</span> and helps <span id="isPasted" style="color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"><span class="froala-textbox">Value Proposition of your company is one sentence</span>&nbsp;</span>&nbsp;</span></p><p><br></p><p><span style="white-space:pre-wrap;">we do this by <span id="isPasted" style="color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"><span class="froala-textbox">How to you achieve your value proposition</span>&nbsp;</span>&nbsp; that ensures :</span></p><p><br></p><ol><li>&nbsp<span id="isPasted" style="box-sizing: unset; color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); float: none; display: inline !important;"><span class="froala-textbox number">111111111111</span></span></li><li>&nbsp<span id="isPasted" style="box-sizing: unset; color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); float: none; display: inline !important;"><span class="froala-textbox number">12222222222222222</span></span></li><li>&nbsp<span id="isPasted" style="box-sizing: unset; color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); float: none; display: inline !important;"><span id="isPasted" style="box-sizing: unset; color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); float: none; display: inline !important;"><span class="froala-textbox">Result 3</span>&nbsp;</span><span style="color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">&nbsp;</span></span></li></ol><p><span id="isPasted" style="box-sizing: unset; color: rgb(0, 0, 0); font-family: Inter; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.28px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; background-color: rgb(255, 255, 255); float: none; display: inline !important;"><span style="white-space:pre-wrap;">{{firstname}}, if you can connect me to the right person at {{companyAname}}, I am certain that we can give a massive boost to {{companyname}}&#39;s Monthly recurring revenue and make it more predictable.&nbsp;<br>&nbsp;<br>When does it work best for you? I won&#39;t take more than 10 minutes of your time.&nbsp;<br>&nbsp;<br>Best Regards,&nbsp;<br>&nbsp;<br>Jas Arora,</span> <br></span></p>'

  constructor(
    private dialog : MatDialog,
    private httpClient: HttpClient
  ) { }

  createColor(color : string) {
    const payload = {
      textColor: color,
      backgroundColor: color
    }
    return this.httpClient.post(
      `${environment.coreBackendUrl}/color/addColor`,
      payload
    );
  }

  deleteColor(colorId : string) {
    let params = new HttpParams()
      .set('colorSettingsId', colorId);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/color/deleteColor?${params}`,
      {}
    );
  }

  getColorList() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/color/getColor`,
    );
  }

  getPersonalizedFIeld() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/personalized/getAllFields`,
    );
  }

  colorPickerDialog(existingColor : string, title : string) {
    const dialog = this.dialog.open(
      EmailEditorChangeColorComponent,
      {
        hasBackdrop: false,
        data : {
          title : title,
          existingColor
        }
      }
    )
    return dialog
  }

  createLinkDialog(selectedText : string) {
    const dialog = this.dialog.open(
      EmailEditorCreateLinkComponent,
      {
        hasBackdrop: false,
        data  : {
          selectedText : selectedText
        }
      }
    )
    return dialog
  }

  fileUploadDialog(format : string[], type : string, personalizeId : string) {
    const dialog = this.dialog.open(
      EmailEditorUploadFileComponent,
      {
        hasBackdrop: true,
        data : {
          validFormat: format,
          type: type,
          personalizeId: personalizeId
        }
      }
    )
    return dialog
  }

  uploadAttachment(campaignId: string, PersonalizeEmailId: string, file : any) {
    let param = new HttpParams()
      .set("campaignId", campaignId)
      .set("PersonalizeEmailId", PersonalizeEmailId)
    let formData: FormData = new FormData();
      formData.append('file', file, file.name);

    return this.httpClient.post(
      `${environment.coreBackendUrl}/upload/attachment?${param}`,
      formData
    );
  }

  getAttachment(campaignId: string, PersonalizeEmailId: string) {
    let param = new HttpParams()
      .set("campaignId", campaignId)
      .set("PersonalizeEmailId", PersonalizeEmailId)

    return this.httpClient.get(
      `${environment.coreBackendUrl}/upload/getAttachment?${param}`
    );
  }

  removeAttachment(campaignId: string, PersonalizeEmailId: string, fileId: string) {
    let param = new HttpParams()
      .set("campaignId", campaignId)
      .set("PersonalizeEmailId", PersonalizeEmailId)
      .set("fileUploadId", fileId)
    return this.httpClient.get(
      `${environment.coreBackendUrl}/upload/deletedAttachment?${param}`
    );
  }

 

}
