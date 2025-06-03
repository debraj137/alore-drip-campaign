import { CommonCssComponent } from '../layout/common-css/common-css.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { CampaignItemDetailComponent } from './campaign-item-detail/campaign-item-detail.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { ObjectiveComponent } from './objective/objective.component';
import { VerifyEmailComponent } from './campaign-item-detail/integration-page/verify-email/verify-email.component';
import { BaseCampaignListComponent } from './base-campaign-list/base-campaign-list.component';
import { ObjectiveDetailComponent } from './objective-detail/objective-detail.component';
import { MyFavComponent } from './my-fav/my-fav.component';
import { SharedByMeComponent } from './shared-by-me/shared-by-me.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import { MyCampaignBaseComponent } from './my-campaign-base/my-campaign-base.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { CommonDesignFileComponent } from '../layout/common-design-file/common-design-file.component';
import { IntegrationCheckFlowComponent } from './integration-check/integration-check-flow/integration-check-flow.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RepliesThreadComponent } from './campaign-item-detail/campaign-item-tabs/replies-thread/replies-thread.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: BaseCampaignListComponent,
      },
      {
        path: 'campaign-Details/:baseid',
        component: BaseCampaignListComponent,
      },
      {
        path:'fav',
        component: MyFavComponent
      },
      {
        path:'sharedWithMe',
        component: SharedWithMeComponent
      },
      {
        path:'sharedByMe',
        component: SharedByMeComponent
      },
      {
        path:'myCampaignBase',
        component: MyCampaignBaseComponent
      },
      {
        path:'archive',
        component: ArchiveComponent
      },
      {
        path:'trash',
        component: TrashComponent
      },
      {
        path: 'initial',
        component: IntegrationCheckFlowComponent
      },
      {
        path: 'campaign-Details/:baseid/campaign-item-detail/:campaignId',
        component: CampaignItemDetailComponent,
      },
      {
        path: 'campaign-Details/:baseid/campaign-item-detail/:campaignId/mail-detail/:emailName/Mail-Id/:mailId',
        component: MailDetailComponent,
      },
      {
        path: 'objectives/:campaignId',
        component: ObjectiveComponent,
      },
      {
        path:'objectives/:campaignId/recipe-details/:id',
        component: ObjectiveDetailComponent
      },
      {
        path:'campaign-Details/:baseid/campaign-item-detail/:campaignId/email-editor/:i',
        loadChildren: () =>
        import('./email-editor/email-editor.module').then((m) => m.EmailEditorModule),
      },
      {
        path:'userProfile',
        component: UserProfileComponent
      },
      {
        path:'campaign-Details/:baseid/campaign-item-detail/:campaignId/replie-thread/:i',
        component: RepliesThreadComponent
      }
      
    ],
  },
  {
    path: 'verify-code',
    component: VerifyEmailComponent
  },
  {
    path: 'common',
    component: CommonCssComponent,
  },
  {
    path: "common-design",
    component: CommonDesignFileComponent,
  },
  {
      path: 'unsubscribe',
      component: UnsubscribeComponent
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
