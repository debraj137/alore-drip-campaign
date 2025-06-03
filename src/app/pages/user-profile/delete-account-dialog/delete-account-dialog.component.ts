import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { deleteAccountService } from 'src/app/service/resource/delete-account.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {
  
  disabledButton: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    public deleteAccountService: deleteAccountService
  ) { }

  ngOnInit(): void {
  }

  removeAccount(){
    this.deleteAccountService.deleteAccount();
  }

}
