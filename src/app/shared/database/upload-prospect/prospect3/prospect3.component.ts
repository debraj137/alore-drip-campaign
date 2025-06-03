import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProspectService } from 'src/app/service/resource/prospect.service';

@Component({
  selector: 'app-prospect3',
  templateUrl: './prospect3.component.html',
  styleUrls: ['./prospect3.component.scss']
})
export class Prospect3Component implements OnInit {

  isUploadCompleted: boolean = false;
  progressBar: number = 0;
  isFileUploaded: boolean = false;
  fileInputvisibility: boolean = true;
  isFirstrowAsDataType: boolean = true;
  @Output() fileSelected = new EventEmitter<any>();
  @Input() resetInput: boolean = false;
  @Input() isFileEmpty: boolean = false;
  @Input() campaignId:string="";
  constructor(
    private prospectService: ProspectService
  ) { }

  ngOnInit(): void {
    if(!this.isFileEmpty) {
      this.isFileUploaded = true
    }
  }

  ngOnChanges() {
    if(this.resetInput) {
      this.fileInputvisibility = false
      this.isFileUploaded = false
      setTimeout(() => {
        this.fileInputvisibility = true
      }, 10);
    }
  }

  onFileSelected(event  : any) {
    this.isFileUploaded = false;
    this.prospectService.uploadCSV(event.file,this.campaignId).subscribe((resp : any) => {
      if (resp.responseCodeJson.code === 200 && resp?.list?.length) {
        this.isFileUploaded = true
        setTimeout(() => {
          this.fileSelected.emit({
            csvId : resp.object.csvUploadDataId,
            columnList: resp.list
          })
        }, 1000);
      }
    })
  }

}
