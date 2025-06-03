import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CampaignService } from 'src/app/service/resource/campaign.service';

@Component({
  selector: 'app-rename-campaign',
  templateUrl: './rename-campaign.component.html',
  styleUrls: ['./rename-campaign.component.scss']
})
export class RenameCampaignComponent implements OnInit {

  campId: any;
  campaignName: any;


  constructor(
    public dialogRef: MatDialogRef<RenameCampaignComponent>,
    public campaignService : CampaignService
  ) { }

  rename = new FormGroup({
    renameInput: new FormControl('')
  })

  ngOnInit(): void {

    this.campId = localStorage.getItem("clickedCampId")
    this.campaignName  = localStorage.getItem("currentCampaignName")

  }


  click() {
    const value = this.rename.value.renameInput
   

    // const obj = {
    //   "campaignId": this.campId,
    //   "campaignName": value,
    // }

  this.campaignService.renameCampaign(this.campId, value).subscribe((res: any) => {
    // window.location.reload();
    if(res.responseCodeJson.code === 200){
      localStorage.removeItem("currentCampaignName")
      localStorage.removeItem("clickedCampId")

      this.dialogRef.close({
        "campaignName" : value,
      })
    }
    
  })
  

  }
}
