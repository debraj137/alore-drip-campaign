import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IDayData, IPageData, IStepItem, IStepTempData } from 'src/app/model/create-reciepe';
import { IMailSequenceDetail } from 'src/app/model/mail-sequence';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

interface ISettingPopupModal {
  isSingleStep : boolean;
  activeStep : number;
  data? : any;
  campaignId?: string;
  reciepeId?: string;
  submittedData? : IMailSequenceDetail;
  createObjective? : boolean 
}

@Component({
  selector: 'app-setting-popup-modal-new',
  templateUrl: './setting-popup-modal-new.component.html',
  styleUrls: [
    './setting-popup-modal-new.component.scss',
    '../../../assets/style/default-modal-style.scss'
  ]
})
export class SettingPopupModalNewComponent implements OnInit {

  recipeId : string = '';
  campId: string = '';
  stepData : IStepItem[] = [
    {
      title: 'Continue with same settings ?',
      desc: 'Choose if you would like to customise the settings',
      value: 1,
      icon: 'setting_Icon_Popup_Modal'
    },
    {
      title: 'Select a timezone',
      desc: 'Choose the time-zone in which you want to send the mail',
      value: 2,
      icon: 'time_Zone_Icon'
    },
    {
      title: 'The number of mails in the sequence',
      desc: 'It takes a minimum of 5 touch points for anyone to remember you. 🤓',
      value: 3,
      icon: 'number_Mail_Icon'
    },
    {
      title: 'Number of people to reach each day',
      desc: 'Less is more. Keep in mind the daily limits of your ESP',
      value: 4,
      icon: 'hash_Tag_Icon'
    },
    {
      title: 'Which days you want to reach out?',
      desc: 'Not each day is equal. Choose days based on your persona',
      value: 5,
      icon: 'calender_Icon'
    },
    {
      title: 'When do you want to reach out?',
      desc: 'Not each day is equal. Choose days based on your persona',
      value: 6,
      icon: 'calender_Icon'
    },
    {
      title: 'When do you want to start?',
      desc: 'Select a day when you want the campaign to start',
      value: 7,
      icon: 'calender_Icon'
    },
    {
      title: 'Add Labels',
      desc: 'Manage your mailbox better with labels.',
      value: 8,
      icon: 'label_form_Icon'
    },
    {
      title: 'Create or Edit a Label',
      desc: 'Labels help you organise & plan campaigns better',
      value: 9,
      icon: 'label_form_Icon'
    },
    {
      title: 'Integrate Email',
      desc: 'Integrate your email in just a few seconds',
      value: 10,
      icon: 'add_Icon'
    },
    {
      title: 'Add a tag',
      desc: 'Tags help you organise prospects better',
      value: 11,
      icon: 'label_form_Icon'
    },
  ]
  activeStepValue : number = 1;
  startFromStep2 : boolean = false
  activeStep!: IStepItem;
  currentDailyValume: any;
  volumeValue: string = '';
  loader : boolean = true;
  stepTempData : IStepTempData = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISettingPopupModal,
    public dialogRef: MatDialogRef<SettingPopupModalNewComponent>,
    private objectiveService:ObjectiveService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    // setting step 3 data
    this.stepTempData.step3Data = {
      limit: Number(localStorage.getItem('recipeTemplatesLength') || 5),
      value: Number(localStorage.getItem('recipeTemplatesLength') || 5)
    }
    
    // initialize step list
    this.activeStepValue = this.data.activeStep
    this.activeStep = this.stepData[this.data.activeStep - 1]
    this.startFromStep2 = this.data.activeStep == 2

    if (this.data.isSingleStep) {
      switch (this.data.activeStep) {
        case 2:
          this.stepTempData.step2Data = this.data.data
          break;
        case 4:
          this.stepTempData.step4Data = this.data.data
          break;
        case 6:
          this.stepTempData.step6Data = this.data.data
          break;
        case 7:
          this.stepTempData.step7Data = this.data.data
          break;
        case 5:
          let step5Data: any[] = [];
          this.data.data.map((day:any) => {
            switch (day) {
              case 'sundays':
                step5Data.push({
                  index:6,
                  day:"Sundays",
                  opentype:"Lowest Open Rates",
                  icon:"arrow_Bottom_Icon",
                  color:"Red"
                })
                return null
                break;
              case 'mondays':
                step5Data.push( {
                  day:"Mondays",
                  index:0,
                  opentype:"Lower Open Rates",
                  icon:"arrow_Bottom_Right_Icon",
                  color:"Blue"
                })
                return null
                break;
              case 'tuesdays':
                step5Data.push({
                  index:1,
                  day:"Tuesdays",
                  opentype:"Higher Open Rates",
                  icon:"arrow_top_Icon",
                  color:"Green"
                })
                return null
                break;
              case 'wednesdays':
                step5Data.push({
                  index:2,
                  day:"Wednesdays",
                  opentype:"Moderate Open Rates",
                  icon:"arrow_Right_Icon",
                  color:"Pink"
                })
                return null
                break;
              case 'thursdays':
                step5Data.push({
                  index:3,
                  day:"Thursdays",
                  opentype:"Moderate Open Rates",
                  icon:"arrow_Right_Icon",
                  color:"Pink"
                })
                return null
                break;
              case 'fridays':
                step5Data.push({
                  index:4,
                  day:"Fridays",
                  opentype:"Higher Open Rates",
                  icon:"arrow_top_Icon",
                  color:"Green"
                })
                return null
                break;
              case 'saturdays':
                step5Data.push({
                  index:5,
                  day:"Saturdays",
                  opentype:"Moderate Open Rates",
                  icon:"arrow_Right_Icon",
                  color:"Pink"
                })
                return null
                break;
            
              default:
                return null
                break;
            }
          })

          this.stepTempData.step5Data = step5Data;
          break;
      
        default:
          break;
      }
    }

    // checking is there temporary data that user have been submitted previously
    if (this.data.submittedData) {
      const tempData = this.data.submittedData
      this.stepTempData = {
        step1Data: 2,
        step2Data: tempData.timeZone,
        step3Data: {
          value: tempData.numberOfEmailSequence,
        },
        step4Data: tempData.dailyMails,
        step5Data:  tempData.timeSetting.map((obj : any) => {
          switch (obj.day) {
            case 'sundays':
              return {
                index:6,
                day:"Sundays",
                opentype:"Lowest Open Rates",
                icon:"arrow_Bottom_Icon",
                color:"Red"
              }
              break;
            case 'mondays':
              return {
                day:"Mondays",
                index:0,
                opentype:"Lower Open Rates",
                icon:"arrow_Bottom_Right_Icon",
                color:"Blue"
              }
              break;
            case 'tuesdays':
              return {
                index:1,
                day:"Tuesdays",
                opentype:"Higher Open Rates",
                icon:"arrow_top_Icon",
                color:"Green"
              }
              break;
            case 'wednesdays':
              return {
                index:2,
                day:"Wednesdays",
                opentype:"Moderate Open Rates",
                icon:"arrow_Right_Icon",
                color:"Pink"
              }
              break;
            case 'thursdays':
              return {
                index:3,
                day:"Thursdays",
                opentype:"Moderate Open Rates",
                icon:"arrow_Right_Icon",
                color:"Pink"
              }
              break;
            case 'fridays':
              return {
                index:4,
                day:"Fridays",
                opentype:"Higher Open Rates",
                icon:"arrow_top_Icon",
                color:"Green"
              }
              
              break;
            case 'saturdays':
              return {
                index:5,
                day:"Saturdays",
                opentype:"Moderate Open Rates",
                icon:"arrow_Right_Icon",
                color:"Pink"
              }
              break;
          
            default:
              return null
              break;
          }
        }),
        step6Data: {
          days : tempData.timeSetting,
          sameDay : false, // this data was hardcoded
        },
        // step7Data: [],
      }
    }
  }

  ngOnInit(): void {
    this.campId = this.data.campaignId || ''
    this.recipeId = this.router.url.split('/')[4]
    
    if (this.recipeId && !this.data.isSingleStep && this.router.url.includes('objectives')) {
      this.getCurrentRecipeDetails(this.recipeId);
    } else {
      this.loader = false
    }
  }

  getCurrentRecipeDetails(recipeId:any){
    this.loader = true
    this.objectiveService.getCurrentRecipeDetails(recipeId).subscribe(
      (res:any)=>{
        this.stepTempData.step4Data = res.object.dailyMailSent;
        this.volumeValue = this.currentDailyValume;
        this.loader = false
      }
    );
  }

  onPageChanged(data : IPageData) {
  
    const page = data.page - 1;
    
    if (data.page === 0) {
      this.redirectToCampaignDetail(this.campId)
    } 

    else if (page <= this.stepData.length) {
      if (page >= this.activeStepValue) {
        switch (page) {
          case 1:
            this.stepTempData.step1Data = data?.data
            break;
          case 2:
            this.stepTempData.step2Data = data?.data
            break;
          case 3:
            this.stepTempData.step3Data = data?.data
            break;
          case 4:
            this.stepTempData.step4Data = data?.data
            break;
          case 5:
            this.stepTempData.step5Data = data?.data
            break;
          case 6:
            this.stepTempData.step6Data = data?.data
            break;
          case 7:
            this.stepTempData.step7Data = data?.data
            break;
          case 8:
            this.stepTempData.step8Data = data?.data
            break;
          case 9:
            this.stepTempData.step9Data = data?.data
            break;
        
          default:
            break;
        }
      }
      this.activeStepValue = data.page
      this.activeStep = this.stepData[page]

    } else {
      this.activeStepValue = data.page
      this.dialogRef.close()
    }
  }

  redirectToCampaignDetail(campaignId : string) {
    if (!this.data.isSingleStep) {
      const baseCampaignId = this.router.url.split('/')[2]
      this.router.navigateByUrl('campaign-Details/'+ baseCampaignId +'/campaign-item-detail/' + campaignId)
    }
    this.dialogRef.close('success')
  }
}
