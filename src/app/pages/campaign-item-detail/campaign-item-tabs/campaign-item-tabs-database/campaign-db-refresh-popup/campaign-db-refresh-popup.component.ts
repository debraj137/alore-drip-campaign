import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-db-refresh-popup',
  templateUrl: './campaign-db-refresh-popup.component.html',
  styleUrls: ['./campaign-db-refresh-popup.component.scss']
})
export class CampaignDbRefreshPopupComponent implements OnInit {

  disabledButton: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CampaignDbRefreshPopupComponent>,
  ) { }

  ngOnInit(): void {
  }

  refreshPage(){
    window.location.reload()
  }

}
