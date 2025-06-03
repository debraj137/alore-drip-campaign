import 'froala-editor/js/plugins.pkgd.min.js';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { CommonCssComponent } from '../layout/common-css/common-css.component';
import { CampaignItemDetailComponent } from './campaign-item-detail/campaign-item-detail.component';
import { CampaignItemTabsAnalyticsComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-analytics/campaign-item-tabs-analytics.component';
import { CampaignItemTabsMailSequenceComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-mail-sequence/campaign-item-tabs-mail-sequence.component';
import { CampaignItemTabsDatabaseComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-database/campaign-item-tabs-database.component';
import { CampaignItemTabsActivityComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-activity/campaign-item-tabs-activity.component';
import { CampaignItemTabsSettingsComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/campaign-item-tabs-settings.component';
import { CampaignItemTabsAnalyticsTableComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-analytics/campaign-item-tabs-analytics-table/campaign-item-tabs-analytics-table.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { MailDetailTableComponent } from './mail-detail/mail-detail-table/mail-detail-table.component';
import { AddBlockedMailComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/blocked-email/add-blocked-mail/add-blocked-mail.component';
import { AddBlockedDomainComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/blocked-domain/add-blocked-domain/add-blocked-domain.component';
import { IntegrationPageComponent } from './campaign-item-detail/integration-page/integration-page.component';
import { CampaignIntegrationComponentComponent } from './campaign-item-detail/integration-page/campaign-integration-component/campaign-integration-component.component';
import { VerifyEmailComponent } from './campaign-item-detail/integration-page/verify-email/verify-email.component';
import { AddBccModalComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/bcc/add-bcc-modal/add-bcc-modal.component';
import { ListBlockedDomainComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/blocked-domain/list-blocked-domain/list-blocked-domain.component';
import { ListBlockedEmailComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/blocked-email/list-blocked-email/list-blocked-email.component';
import { ListBccComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/bcc/list-bcc/list-bcc.component';
import { EmailNotificationSettingComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/email-notification-setting/email-notification-setting.component';
import { ListDailyReportComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/daily-report/list-daily-report/list-daily-report.component';
import { AddDailyReportComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/daily-report/add-daily-report/add-daily-report.component';
import { AddWeeklyReportComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/weekly-report/add-weekly-report/add-weekly-report.component';
import { ListWeeklyReportComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/weekly-report/list-weekly-report/list-weekly-report.component';
import { BaseCampaignListComponent } from './base-campaign-list/base-campaign-list.component';
import { BaseCampaignDetailComponent } from './base-campaign-detail/base-campaign-detail.component';
import { ObjectiveDetailComponent } from './objective-detail/objective-detail.component';
import { MyFavComponent } from './my-fav/my-fav.component';
import { EmptyStateMsgComponent } from './empty-state-msg/empty-state-msg.component';
import { SharedByMeComponent } from './shared-by-me/shared-by-me.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import { MyCampaignBaseComponent } from './my-campaign-base/my-campaign-base.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { ProfileComponent } from './profile/profile.component';
import { IntegrationCheckFlowComponent } from './integration-check/integration-check-flow/integration-check-flow.component';
import { RenameCampaignComponent } from './rename-campaign/rename-campaign.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserInfoComponent } from './user-profile/user-info/user-info.component';
import { EditPersonalDetailsDialogComponent } from './user-profile/user-info/edit-personal-details-dialog/edit-personal-details-dialog.component';
import { PersonalFieldComponent } from './user-profile/user-info/edit-personal-details-dialog/personal-field/personal-field.component';
import { CompanyFieldComponent } from './user-profile/user-info/edit-personal-details-dialog/company-field/company-field.component';
import { SocialFieldComponent } from './user-profile/user-info/edit-personal-details-dialog/social-field/social-field.component';
import { TimezoneFieldComponent } from './user-profile/user-info/edit-personal-details-dialog/timezone-field/timezone-field.component';
import { ContactFieldComponent } from './user-profile/user-info/edit-personal-details-dialog/contact-field/contact-field.component';
import { UserSecurityComponent } from './user-profile/user-security/user-security.component';
import { UserActivityComponent } from './user-profile/user-activity/user-activity.component';
import { ChangePasswordDialogComponent } from './user-profile/user-security/change-password-dialog/change-password-dialog.component';
import { AddProfileImageDialogComponent } from './user-profile/user-info/add-profile-image-dialog/add-profile-image-dialog.component';
import { MailSentConfirmationDialogComponent } from './user-profile/user-security/change-password-dialog/mail-sent-confirmation-dialog/mail-sent-confirmation-dialog.component';
import { MailSignatureDialogComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/email-notification-setting/mail-signature-dialog/mail-signature-dialog.component';
import { CampaignItemTabsRepliesComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-replies/campaign-item-tabs-replies.component';

import { DeleteAccountDialogComponent } from './user-profile/delete-account-dialog/delete-account-dialog.component';
import { RepliesThreadComponent } from './campaign-item-detail/campaign-item-tabs/replies-thread/replies-thread.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SearchPipe } from './searchTeammates.pipe';
import { AddLabelComponent } from './campaign-item-detail/campaign-item-tabs/replies-thread/add-label/add-label.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { SearchCampaignComponent } from './search-campaign/search-campaign.component';
import { DatePickerSearchFilterComponent } from './search-campaign/date-picker-search-filter/date-picker-search-filter.component';

import { CampaignDbRefreshPopupComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-database/campaign-db-refresh-popup/campaign-db-refresh-popup.component';
import { CountdownComponent } from './campaign-item-detail/countdown/countdown.component';
import { ProviderGraphComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-analytics/provider-graph/provider-graph.component';
import { CreateBySearchPipe } from './search-campaign/Pipes/create-by-search.pipe';
import { SendBySearchPipe } from './search-campaign/Pipes/send-by-search.pipe';
import { AddProspectComponent } from './campaign-item-detail/campaign-item-tabs/replies-thread/add-prospect/add-prospect.component';
import { AddCampaignProspectComponent } from './campaign-item-detail/campaign-item-tabs/replies-thread/add-campaign-prospect/add-campaign-prospect.component';
import { AddProspectDatabaseComponent } from './campaign-item-detail/campaign-item-tabs/campaign-item-tabs-database/add-prospect-database/add-prospect-database.component';




@NgModule({
  declarations: [
    CommonCssComponent,
    CampaignItemDetailComponent,
    CampaignItemTabsAnalyticsComponent,
    CampaignItemTabsMailSequenceComponent,
    CampaignItemTabsDatabaseComponent,
    CampaignItemTabsActivityComponent,
    CampaignItemTabsSettingsComponent,
    CampaignItemTabsAnalyticsTableComponent,
    MailDetailComponent,
    MailDetailTableComponent,
    AddBlockedMailComponent,
    AddBlockedDomainComponent,
    IntegrationPageComponent,
    CampaignIntegrationComponentComponent,
    VerifyEmailComponent,
    AddBccModalComponent,
    ListBlockedDomainComponent,
    ListBlockedEmailComponent,
    ListBccComponent,
    EmailNotificationSettingComponent,
    ListDailyReportComponent,
    AddDailyReportComponent,
    AddWeeklyReportComponent,
    ListWeeklyReportComponent,
    BaseCampaignListComponent,
    BaseCampaignDetailComponent,
    ObjectiveDetailComponent,
    MyFavComponent,
    EmptyStateMsgComponent,
    SharedByMeComponent,
    SharedWithMeComponent,
    MyCampaignBaseComponent,
    ArchiveComponent,
    TrashComponent,
    ProfileComponent,
    IntegrationCheckFlowComponent,
    RenameCampaignComponent,
    UserProfileComponent,
    UserInfoComponent,
    EditPersonalDetailsDialogComponent,
    PersonalFieldComponent,
    CompanyFieldComponent,
    SocialFieldComponent,
    TimezoneFieldComponent,
    ContactFieldComponent,
    UserSecurityComponent,
    UserActivityComponent,
    ChangePasswordDialogComponent,
    AddProfileImageDialogComponent,
    MailSentConfirmationDialogComponent,
    MailSignatureDialogComponent,
    CampaignItemTabsRepliesComponent,
    RepliesThreadComponent,
    DeleteAccountDialogComponent,
    SearchPipe,
    AddLabelComponent,
    UnsubscribeComponent,
    SearchCampaignComponent,
    DatePickerSearchFilterComponent,
    CampaignDbRefreshPopupComponent,
    CountdownComponent,
    ProviderGraphComponent,
    CreateBySearchPipe,
    SendBySearchPipe,
    AddProspectComponent,
    AddCampaignProspectComponent,
    AddProspectDatabaseComponent
    
    
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PickerModule,
    EmojiModule,
    MatSlideToggleModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [UserInfoComponent],
  exports:[]
})
export class PagesModule { }
