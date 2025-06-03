import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetFavoriteService } from '../../../../../service/resource/get-favorite.service';
import { Subscription } from 'rxjs';
import { ReplieService } from '../../../../../service/resource/replie.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';

@Component({
  selector: 'app-add-campaign-prospect',
  templateUrl: './add-campaign-prospect.component.html',
  styleUrls: ['./add-campaign-prospect.component.scss']
})
export class AddCampaignProspectComponent implements OnInit {

  selection = new SelectionModel<any>(true, []);
  campaigns : any = [];
  loader: boolean = true;
  selected : any
  constructor(
    public dialogRef: MatDialogRef<AddCampaignProspectComponent>,
    public getFavouriteService: GetFavoriteService,
    private repliesService:ReplieService,
    private notificationService: ToastNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    // console.log(this.data.prospects)

    this.getFavouriteService.getFav().subscribe((resp: any) => {
        if(resp.responseCodeJson.code === 200){
          resp.list.map((obj: any) => {
               obj.campaignList.map((campaign: any) => {
                this.campaigns.push(campaign);
              })
           
          })
          this.loader = false;

        }
    })
  }


  addToCampaign(){
    const payload = {
      "campaignId": this.selected.campaignId,
      "prospectEmails": this.data.prospects
    }
    this.loader = true;
    // console.log(this.selected, this.data.prospects)
    this.repliesService.addProspect(payload).subscribe((resp: any) => {
      if(resp.responseCodeJson.code == 200){
        this.loader = false;
        this.notificationService.addNotification(
          'Prospect has been successfully added',
          'Success',
          NotificationEnum.SUCCESS
          )
          this.dialogRef.close()
      }

      if(resp.responseCodeJson.code == 409){
        this.loader = false;
        this.notificationService.addNotification(
          'Some error occured',
          'Error',
          NotificationEnum.DANGER
          )
          this.dialogRef.close()
      }
    })
  }

}
