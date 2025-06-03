// other module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

// material module
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';

// component
import { AlertComponent } from './alert/alert.component';
import { TreeSidebarComponent } from './tree-sidebar/tree-sidebar.component';
import { CreateNewCampaignBaseComponent } from './create-new-campaign-base/create-new-campaign-base.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ObjectiveModalComponent } from './objective-modal/objective-modal.component';
import { ObjectiveCardComponent } from './objective-card/objective-card.component';
import { shareModalComponent } from './shareModal/shareModal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { VolumeChartComponent } from './chart/volume-chart/volume-chart.component';
import { OpenRatesComponent } from './chart/open-rates/open-rates.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DailyLinksClickComponent } from './chart/daily-links-click/daily-links-click.component';
import { DailyOpenRatesComponent } from './chart/daily-open-rates/daily-open-rates.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { GraphLoaderComponent } from './graph-loader/graph-loader.component';
import { CreateTagsComponent } from './create-tags/create-tags.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EmailEditorChangeColorComponent } from './email-editor/email-editor-change-color/email-editor-change-color.component';
import { EmailEditorUploadFileComponent } from './email-editor/email-editor-upload-file/email-editor-upload-file.component';
import { EmailEditorCreateLinkComponent } from './email-editor/email-editor-create-link/email-editor-create-link.component';
import { DashboardLoadingComponent } from './dashboard-loading/dashboard-loading.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { Page1Component } from './setting-popup-modal-new/page1/page1.component';
import { Page2Component } from './setting-popup-modal-new/page2/page2.component';
import { SettingPopupModalNewComponent } from './setting-popup-modal-new/setting-popup-modal-new.component';
import { Page3Component } from './setting-popup-modal-new/page3/page3.component';
import { Page4Component } from './setting-popup-modal-new/page4/page4.component';
import { Page5Component } from './setting-popup-modal-new/page5/page5.component';
import { Page6Component } from './setting-popup-modal-new/page6/page6.component';
import { Page7Component } from './setting-popup-modal-new/page7/page7.component';
import { Page8Component } from './setting-popup-modal-new/page8/page8.component';
import { Page9Component } from './setting-popup-modal-new/page9/page9.component';
import { Page10Component } from './setting-popup-modal-new/page10/page10.component';
import { ClickOutsideDirective } from './click_outside.directive';
import { EmailIntegrationComponent } from './email-integration/email-integration.component';
import { HideTableColumnComponent } from './table/hide-table-column/hide-table-column.component';
import { MailSequenceExpansionPanelComponent } from './mail-sequence-expansion-panel/mail-sequence-expansion-panel.component';
import { MailSequenceDetailComponent } from './mail-sequence-detail/mail-sequence-detail.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { ProgressChartComponent } from './chart/progress-chart/progress-chart.component';
import { EmailEditorSpamScoreComponent } from './email-editor/email-editor-spam-score/email-editor-spam-score.component';
import { EmailEditorSidebarComponent } from './email-editor/email-editor-sidebar/email-editor-sidebar.component';
import { EmailEditorHelpTextComponent } from './email-editor/email-editor-help-text/email-editor-help-text.component';
import { EmailEditorRecomendationsComponent } from './email-editor/email-editor-recomendations/email-editor-recomendations.component';
import { UploadProspectComponent } from './database/upload-prospect/upload-prospect.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { Prospect1Component } from './database/upload-prospect/prospect1/prospect1.component';
import { Prospect2Component } from './database/upload-prospect/prospect2/prospect2.component';
import { Prospect3Component } from './database/upload-prospect/prospect3/prospect3.component';
import { Prospect4Component } from './database/upload-prospect/prospect4/prospect4.component';
import { Prospect5Component } from './database/upload-prospect/prospect5/prospect5.component';
import { AlertEditorScreenComponent } from './alert-editor-screen/alert-editor-screen.component';
import { Prospect6Component } from './database/upload-prospect/prospect6/prospect6.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ToastNotificationItemComponent } from './toast-notification/toast-notification-item/toast-notification-item.component';
import { AgGridEmailFieldComponent } from './ag-grid-custom-field/ag-grid-email-field/ag-grid-email-field.component';
import { AgGridTagsFieldComponent } from './ag-grid-custom-field/ag-grid-tags-field/ag-grid-tags-field.component';
import { AgGridHeaderFieldComponent } from './ag-grid-custom-field/ag-grid-header-field/ag-grid-header-field.component';
import { AgGridProspectFieldComponent } from './ag-grid-custom-field/ag-grid-prospect-field/ag-grid-prospect-field.component';
import { SuccessComponent } from './success/success.component'
import { AgGridTagComponent } from './ag-grid-custom-field/ag-grid-tag/ag-grid-tag.component'
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DatePickerSnoozeComponent } from './date-picker-snooze/date-picker-snooze.component';
import { Page11Component } from './setting-popup-modal-new/page11/page11.component';
import { CustomTagComponent } from './create-tags/custom-tag/custom-tag.component';
import { AutoFocusDirective } from './auto-focus.directive';
import { PaginationLoaderComponent } from './pagination-loader/pagination-loader.component';
import { ProviderChartComponent } from './chart/provider-chart/provider-chart.component';
import { ProviderOpenRateChartComponent } from './chart/provider-open-rate-chart/provider-open-rate-chart.component';
import { CustomHighlightComponent } from './custom-highlight/custom-highlight.component';





let otherModule = [
  AgGridModule,
]


let materialModule = [
  MatSidenavModule,
  MatTreeModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSliderModule,
  MatButtonModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTooltipModule,
  DragDropModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatRadioModule,
  MatBadgeModule,
  MatTableModule,
  MatChipsModule,
  MatIconModule,
  MatMomentDateModule
];

let component = [
  TreeSidebarComponent,
  AlertComponent,
  VolumeChartComponent,
  OpenRatesComponent,
  DailyLinksClickComponent,
  DailyOpenRatesComponent,
  BreadcrumbComponent,
  CreateTagsComponent,
  EmailEditorChangeColorComponent,
  EmailEditorUploadFileComponent,
  EmailEditorCreateLinkComponent,
  DashboardLoadingComponent,
  DatePickerComponent,
  Page1Component,
  Page2Component,
  Page3Component,
  Page4Component,
  Page5Component,
  Page6Component,
  Page7Component,
  Page8Component,
  Page9Component,
  Page10Component,
  SettingPopupModalNewComponent,
  ClickOutsideDirective,
  EmailIntegrationComponent,
  HideTableColumnComponent,
  MailSequenceExpansionPanelComponent,
  MailSequenceDetailComponent,
  ToastNotificationComponent,
  ProgressChartComponent,
  EmailEditorSpamScoreComponent,
  EmailEditorSidebarComponent,
  EmailEditorHelpTextComponent,
  EmailEditorRecomendationsComponent,
  UploadProspectComponent,
  FileUploaderComponent,
  Prospect1Component,
  Prospect2Component,
  Prospect3Component,
  Prospect4Component,
  Prospect5Component,
  GraphLoaderComponent,
  AlertEditorScreenComponent,
  AgGridEmailFieldComponent,
  AgGridTagsFieldComponent,
  AgGridHeaderFieldComponent,
  PaginationLoaderComponent,
  AutoFocusDirective,
];

@NgModule({
  declarations: [
    ...component,
    CreateNewCampaignBaseComponent,
    ObjectiveModalComponent,
    shareModalComponent,
    ObjectiveCardComponent,
    DeleteModalComponent,
    DateRangePickerComponent,
    HideTableColumnComponent,
    Prospect6Component,
    ToastNotificationItemComponent,
    AgGridProspectFieldComponent,
    SuccessComponent,
    AgGridTagComponent,
    DatePickerSnoozeComponent,
    Page11Component,
    CustomTagComponent,
    PaginationLoaderComponent,
    ProviderChartComponent,
    ProviderOpenRateChartComponent,
    CustomHighlightComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmojiModule,
    NgChartsModule,
    PickerModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ...otherModule,
    ...materialModule,
    

  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  exports: [...materialModule, ...component, ...otherModule, ProviderChartComponent, ProviderOpenRateChartComponent],
})
export class SharedModule {}
