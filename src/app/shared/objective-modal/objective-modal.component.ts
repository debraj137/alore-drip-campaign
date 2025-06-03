import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-objective-modal',
  templateUrl: './objective-modal.component.html',
  styleUrls: ['./objective-modal.component.scss'],
})
export class ObjectiveModalComponent implements OnInit {
  programs = [
    { name: 'Lead Generation' },
    { name: 'Link building' },
    { name: 'Generate Referral' },
    { name: 'Promoting content' },
    { name: 'Getting on podcasts' },
    { name: 'Guest post opportunities' },
    { name: 'Re-targeting old leads' },
    { name: 'Press release' },
    { name: 'Invitation to webinar' },
    { name: 'Onboaring mail' },
    { name: 'Chasing a prospect' },
  ];

  articles = [
    { name: 'Recipe 1- AIDA Framework' },
    { name: 'Recipe 2- AIDA Framework' },
    { name: 'Recipe 3- AIDA Framework' },
    { name: 'Recipe 4- AIDA Framework' },
    { name: 'Recipe 5- AIDA Framework' },
    { name: 'Recipe 6- AIDA Framework' },
  ];

  contents = [
    {
      title: 'Lead Generation',
      articles: this.articles,
    },
    {
      title: 'Link building',
      articles: this.articles,
    },
  ];

  constructor(
    private dialogRef: MatDialogRef<ObjectiveModalComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  getIcon(type: string): string {
    return `${environment.assetIcons}/icon-${type}.svg`;
  }

  onWorkspaceClick(): void {
  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  deleteCampaign(): void {
    this.dialog.open(DeleteModalComponent, {
      backdropClass: 'backdrop-background',
    });
  }
}
