import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { NgChartsModule } from 'ng2-charts';
import {MatChipsModule} from '@angular/material/chips'
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { StepperLayoutComponent } from './layout/stepper-layout/stepper-layout.component';
import { StepperLayoutHeaderComponent } from './layout/stepper-layout-header/stepper-layout-header.component';
import { StepperLayoutLeftbarComponent } from './layout/stepper-layout-leftbar/stepper-layout-leftbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { NotificationsComponent } from './layout/notifications/notifications.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpConfigInterceptor } from './service/interceptor/http-interceptor';
import { CheckLoginComponent } from './auth/check-login/check-login.component';
import { ObjectiveComponent } from './pages/objective/objective.component';

import { CommonDesignFileComponent } from './layout/common-design-file/common-design-file.component';
import { FaqComponent } from './layout/faq/faq.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { ErrorScreenComponent } from './layout/error-screen/error-screen.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CookiesComponent } from './auth/cookies/cookies.component';
import { PolicyComponent } from './auth/policy/policy.component';
import { TermOfServiceComponent } from './auth/term-of-service/term-of-service.component';
import { ChatGptComponent } from './layout/chat-gpt/chat-gpt.component'
import {MatSliderModule} from '@angular/material/slider';
import { PromptsComponent } from './layout/chat-gpt/prompts/prompts.component';
import { HighlightTextDirective } from './shared/highlight-text.directive';


const layoutComponent = [
  AppComponent,
  MainLayoutComponent,
  StepperLayoutComponent,
  StepperLayoutHeaderComponent,
  StepperLayoutLeftbarComponent,
  SidebarComponent,
  HeaderComponent,
  SideMenuComponent,
  SidebarComponent,
  NotificationsComponent,
  ObjectiveComponent,

]

@NgModule({
  declarations: [
    ...layoutComponent,
    LoginComponent,
    CheckLoginComponent,
    CommonDesignFileComponent,
    FaqComponent,
    NotFoundComponent,
    ErrorScreenComponent,
    CookiesComponent,
    PolicyComponent,
    TermOfServiceComponent,
    ChatGptComponent,
    PromptsComponent,
    HighlightTextDirective
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PickerModule,
    EmojiModule,
    NgChartsModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
