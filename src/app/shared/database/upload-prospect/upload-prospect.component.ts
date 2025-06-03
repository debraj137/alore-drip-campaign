import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProspectService } from 'src/app/service/resource/prospect.service';

@Component({
  selector: 'app-upload-prospect',
  templateUrl: './upload-prospect.component.html',
  styleUrls: [
    './upload-prospect.component.scss',
    '../../../../assets/style/default-modal-style.scss'
  ],
})
export class UploadProspectComponent implements OnInit {

  resetFile: boolean = false;
  step: number = 1;
  // step1
  step1Model: number = 1;
  // step2
  step2Model: number = 1;
  // step3
  columnList: string[] = [];
  csvId: string = '';
  // step4
  submitButtonCondition: boolean = false;
  step4Model: any = null;
  // step 5
  step5Model: any = null;
  loader: boolean = false;

  stepDescription: string[] = [
    'What would like to do after upload?',
    'How would you like us to Identify existing leads',
    'Upload your CSV or XLS file ',
    'Map Columns to Fields in Lead database',
    'Recommendations',
    ''
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public campaignId: string,
    public dialogRef: MatDialogRef<UploadProspectComponent>,
    private prospectService: ProspectService
  ) { }

  ngOnInit(): void {

  }

  reselectFile() {
    this.prospectService.deleteUploadedCsv(this.csvId)
      .subscribe((resp: any) => {
        if (resp.code === 200) {
          this.columnList = []
          this.csvId = ''
          this.resetFile = true
        }
      })
  }

  fileSelected(event: any) {
    this.columnList = event.columnList
    this.csvId = event.csvId
    this.resetFile = false
  }

  changeStep(stepValue: number) {
    if (this.step === 4 && stepValue >= 1) {
      // prospect will be submitted here
      this.submitProspect()
    } else if (this.step <= 5 || stepValue <= 0) {
      this.step += stepValue
    } else {
      this.processCsv()
    }
  }

  submitProspect() {
    if (!this.loader) {
      this.loader = true;
      let payload : any = {
        campaignId: this.campaignId,
        uploadStrategy: this.uploadStrategyData,
        prospectCheckStrategy: this.prospectCheckStrategyData,
        csvUploadDataId: this.csvId
      }
      Object.keys(this.step4Model).forEach((key) => {
        payload[key.replace(/_/g, '')] = this.step4Model[key]
      });
      this.prospectService.csvMapping(payload).subscribe(
        (resp : any) => {
          if(resp.responseCodeJson.code === 200) {
            this.step5Model = resp.object
            this.step = 5
          }
          this.loader = false
        }
      )
    }
  }

  processCsv() {
    if (!this.loader) {
      this.loader = true;
      let payload : any = {
        campaignId: this.campaignId,
        uploadStrategy: this.uploadStrategyData,
        prospectCheckStrategy: this.prospectCheckStrategyData,
        csvUploadDataId: this.csvId
      }
      Object.keys(this.step4Model).forEach((key) => {
        payload[key.replace(/_/g, '')] = this.step4Model[key]
      });
      this.prospectService.csvProcess(payload).subscribe(
        (resp : any) => {
          if(resp.responseCodeJson.code === 200) {
            this.dialogRef.close('success')
          }
          this.loader = false;
          window.location.reload()
        }
      )
    }
  }

  get prospectCheckStrategyData(): number {
    switch (this.step2Model) {
      case 1:
        return 1
        break;
      case 2:
        return 3
        break;
      case 3:
        return 2
        break;
      case 4:
        return 4
        break;

      default:
        return 0
        break;
    }
  }

  get uploadStrategyData(): number {
    switch (this.step1Model) {
      case 1:
        return 3
        break;
      case 2:
        return 1
        break;
      case 3:
        return 2
        break;
      case 4:
        return 1
        break;

      default:
        return 0
        break;
    }
  }

  get nextButtonCondition(): boolean {
    switch (this.step) {
      case 1:
        return this.step1Model ? false : true
        break;
      case 2:
        return this.step2Model ? false : true
        break;
      case 3:
        return this.columnList?.length && this.csvId ? false : true
        break;
      case 4:
        return !this.submitButtonCondition ? true : false
        break;
      case 5:
        return false
        break;

      default:
        return true
        break;
    }
  }
}
