import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/core/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  getIcon(type: string): string {
    return this.commonService.getIcon(type);
  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }
}
