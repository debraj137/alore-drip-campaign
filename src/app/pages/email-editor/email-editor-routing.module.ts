import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingChangesGuard } from 'src/app/service/core/leave-route-confirmation';
import { EmailEditorPageComponent } from './email-editor-page/email-editor-page.component';

const routes: Routes = [
    {
      path:'',
      component: EmailEditorPageComponent,
      canDeactivate: [PendingChangesGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailRoutingModule {}
