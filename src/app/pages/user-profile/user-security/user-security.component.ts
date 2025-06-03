import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss']
})

export class UserSecurityComponent implements OnInit {
  
  disabledButton: boolean = false;
  @Input() email : string = "";
  @Input() lastPasswordChangeDate: string = "";

  constructor(
    private dialog: MatDialog,
   
  ) { }

  ngOnInit(): void {

  }

  changePasswordDialog(){
    const dialog = this.dialog.open(ChangePasswordDialogComponent, {
      data: {
          email : this.email
      },
      backdropClass: 'backdrop-background',
    });
    
    

  }

  getPasswordChangeTimeStatus(){
    let date = new Date(this.lastPasswordChangeDate);
    let todayDate = new Date();
    let calc = new Date(todayDate.getTime() - date.getTime());

    let calcFormatTmp: string = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();

    //Convert to an array and store
    let calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(Number(calcFormat[0])) - 1);
    const months_passed = Number(Math.abs(Number(calcFormat[1])) - 1);
    const years_passed = Number(Math.abs(Number(calcFormat[2])) - 1970);

    //Set up custom text
    const yrsTxt = ["year", "years"];
    const mnthsTxt = ["month", "months"];
    const daysTxt = ["day", "days"];

    //display result with custom text
    const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ?
            months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
            days_passed + ' ' + daysTxt[1] : '');

    //return the result
    return {
        "result": result.trim()
    }

  }
}
