import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingChangesGuard } from 'src/app/service/core/leave-route-confirmation';
import { EmailEditorComponent } from './email-editor-page/email-editor/email-editor.component';
import { EmailEditorPageComponent } from './email-editor-page/email-editor-page.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailRoutingModule } from './email-editor-routing.module';
import { CampaignItemTabsSettingsComponent } from '../campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/campaign-item-tabs-settings.component';

@NgModule({
  declarations: [
    EmailEditorComponent,
    EmailEditorPageComponent,
    
  ],
  imports: [
    CommonModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    EmojiModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EmailRoutingModule,
  ],
  
  providers: [
    PendingChangesGuard,
    CampaignItemTabsSettingsComponent
  ]
})
export class EmailEditorModule { }
