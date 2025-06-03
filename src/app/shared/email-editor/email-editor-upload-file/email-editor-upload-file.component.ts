import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmailEditorService } from 'src/app/service/resource/email-editor.service';
import { EmailEditorChangeColorComponent } from '../email-editor-change-color/email-editor-change-color.component';

@Component({
  selector: 'app-email-editor-upload-file',
  templateUrl: './email-editor-upload-file.component.html',
  styleUrls: [
    './email-editor-upload-file.component.scss',
    '../../../../assets/style/default-modal-style.scss'
  ]
})
export class EmailEditorUploadFileComponent implements OnInit {

  fileType: string = ''
  fileCondition: string = 'selecting';
  selectedFile: any;
  fileName: string = '';
  progressBar: number = 0;
  progress: number[] = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  ];
  isUploadCompleted: boolean = false;
  isFileUploaded: boolean = false;
  campaignId: string = '';
  title: string = ''

  constructor(
    public dialogRef: MatDialogRef<EmailEditorChangeColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: Router,
    private emailEditorService: EmailEditorService
  ) { }

  ngOnInit(): void {
    this.campaignId = this.route.url.split('/')[4]
    if (this.data.type === 'attachment') {
      this.title = 'Insert an attachment'
    } else {
      this.title = 'Insert an image'
    }
  }

  onFileSelected(event: any) {
    this.isFileUploaded = false;

    if(event.fileFormat === "jpeg" || event.fileFormat === "png" || event.fileFormat === "jpg" ){
      this.isFileUploaded = true;
      setTimeout(() => {
        this.dialogRef.close(event.file)
      }, 1500);
    }

    else{
      this.emailEditorService.uploadAttachment(this.campaignId, this.data.personalizeId, event.file)
      .subscribe((resp: any) => {
        if (resp.link) {
          this.isFileUploaded = true;
        
          setTimeout(() => {
            this.dialogRef.close(event.file)
          }, 1500);
        }
      })
    }
    
  }
}
