import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IMailData } from 'src/app/model/mail-sequence';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { ObjectiveService } from 'src/app/service/resource/objective.service';
import { SettingPopupModalNewComponent } from 'src/app/shared/setting-popup-modal-new/setting-popup-modal-new.component';

@Component({
  selector: 'app-objective-detail',
  templateUrl: './objective-detail.component.html',
  styleUrls: ['./objective-detail.component.scss']
})
export class ObjectiveDetailComponent implements OnInit {

  breadcrumbData: any[] = [];
  reciepeId: string = '';
  campaignId: string = '';
  currentRecipeDetails: any;
  mailSequenceData: IMailData[] = [];

  constructor(
    private objectService: ObjectiveService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public campaignService: CampaignService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.reciepeId = this.activatedRoute.snapshot.paramMap.get("id") || '';
    this.campaignId = this.activatedRoute.snapshot.paramMap.get("campaignId") || '';
    if (this.reciepeId && this.reciepeId) {
      this.getCurrentRecipeDetails(this.reciepeId);
      this.getEmailTemplatesOfTheRecipe(this.reciepeId);
    } else {
      this.router.navigateByUrl('')
    }
  }

  getCurrentRecipeDetails(recipeId: any) {
    this.objectService.getCurrentRecipeDetails(recipeId).subscribe((res: any) => {
      this.currentRecipeDetails = res.object;
      this.breadcrumbData = [
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Objectives',
          link: '/objectives/'  + this.campaignId,
        },
        {
          name: res.object.name,
          link: '/objectives/' + this.campaignId + '/recipe-details/' + this.reciepeId
        }
      ];
    });
  }

  getEmailTemplatesOfTheRecipe(recipeId: any) {
    this.objectService.getEmailTemplatesOfTheRecipe(recipeId).subscribe((res: any) => {
      this.mailSequenceData = res.list.map((obj : any) => {
        return {
          ...obj,
          expand: false,
        }
      });
    });
  }

  openSettingDialog() {
    const dialog = this.dialog.open(SettingPopupModalNewComponent, {
      backdropClass: 'backdrop-background',
      data: {
        isSingleStep: false,
        activeStep: 1,
        campaignId : this.campaignId,
      }
    })
  }
}
