import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() isBase64: boolean = false;
  @Input() isFileUploaded: boolean = false;
  @Output() fileSelected = new EventEmitter<any>();
  @Output() uploadCompleted = new EventEmitter<boolean>();
  @Input() validAttachmentList: string[] = []

  fileType: string = ''
  fileCondition : string = 'selecting';
  selectedFile : any;
  progressBar: number = 0;
  fileName: string = '';
  progress : number[] = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  ]

  constructor(
    private toastNotification: ToastNotificationService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.isFileUploaded) {
      this.setLoading(true)
    }
  }

  onFileChange(event : any){
    const selectedFile = event.target?.files[0]
    const fileName = selectedFile?.name
    const fileFormat = fileName?.split('.')?.slice(-1)[0].toLowerCase()
    if (this.validAttachmentList.includes(fileFormat) && selectedFile.size < 10000000) {
      this.fileName = fileName
      if (this.isBase64) {
        this.convertFile(selectedFile)
      } else {
        this.fileCondition = 'uploading'
        this.progress.forEach((value : number, i : number) => {
          setTimeout(() => {
            if (this.progressBar <= 50) {
              this.progressBar = value
              if(this.progressBar === 50) {
                this.fileSelected.emit({
                  fileFormat: fileFormat,
                  fileName : fileName,
                  file : selectedFile,
                })
              }
            }
          }, (100 * i));
        })
      }
    } else if (selectedFile.size > 10000000) {
      this.toastNotification.addNotification(
        "File size exceed",
        `max file size was 10MB`,
        NotificationEnum.INFO
      )
    } else {
      this.toastNotification.addNotification(
        "File format Invalid",
        `only accept ${this.validAttachmentList} format`,
        NotificationEnum.INFO
      )
    }
  }

  convertFile(
    selectedFile : any,
  ) {

    // convert file to base64
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedFile = event.target.result;
    };
    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    reader.readAsDataURL(selectedFile);

    // uploading process loading
    this.fileCondition = 'uploading'
    this.setLoading(false)
  }

  setLoading(isHalf : boolean) {
    this.progress.forEach((value : number, i : number) => {
      if(isHalf && value >= 60) {
        this.updateProgress(value, i)
      }
      if(!isHalf) {
        this.updateProgress(value, i)
      }
    })
  }

  updateProgress(progress : number, index : number) {
    setTimeout(() => {
      this.progressBar = progress
      if (this.progressBar === 100) {
        // showing success upload
        this.fileCondition = 'success'
        this.uploadCompleted.emit(true)
        if (this.isBase64) {
          setTimeout(() => {
            this.fileSelected.emit({
              fileFormat: this.fileName.split('.')?.slice(-1)[0],
              fileName : this.fileName,
              file : this.selectedFile,
            })
          }, 1000);
        }
      }
    }, (100 * index));
  }

}
