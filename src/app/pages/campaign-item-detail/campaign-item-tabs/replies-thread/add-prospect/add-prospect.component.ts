import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCampaignProspectComponent } from '../add-campaign-prospect/add-campaign-prospect.component';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss']
})
export class AddProspectComponent implements OnInit {

  mails : string[] = []

  selection = new SelectionModel<any>(true, []);
  constructor(
    public dialogRef: MatDialogRef<AddProspectComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
   this.mails.push(this.data.replyFrom);
   this.mails = this.mails.concat(this.data.cc)
   this.mails = this.mails.concat(this.data.bcc)

   console.log(this.mails)

   
    
  }

  forwardToCampaignSelection(){
    this.dialogRef.close()
    this.dialog.open(AddCampaignProspectComponent, {
      data : {
        prospects : this.selection.selected
      }
    })
   
  }

}
