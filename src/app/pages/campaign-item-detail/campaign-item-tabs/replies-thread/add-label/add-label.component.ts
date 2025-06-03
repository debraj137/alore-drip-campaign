import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplieService } from 'src/app/service/resource/replie.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { RepliesThreadComponent } from '../replies-thread.component';
import { Console } from 'console';


@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {

  color: string = '';
  num: number = 0;
  arrowPosition: boolean = false;
  disabledState: boolean = false;
  labelListData: any[] = [];
  duplicate: boolean = false;
  data: any;
  labelNameList: any[] = [];


  labelName: any;
  colorSelections: string[] = [
    '#EEEEEE', '#CCCCCC', '#ACACAC', '#666666', '#444444',
    '#83CC8B', '#61C76C', '#20C933', '#00B514', '#338A17',
    '#AFB5FF', '#8E96FF', '#6B76FF', '#3140FF', '#0013FF',
    '#FFB598', '#FF9E79', '#FF7844', '#FF4700', '#C53700',
    '#FF9FF2', '#FE67E9', '#F638DC', '#FF00DC', '#D600B8',
    '#FFE3AF', '#FFD68C', '#FFC55C', '#FDB22B', '#E89500',
    '#FFB3C8', '#FF8CAD', '#FF4E81', '#FF0049', '#DA0240',
    '#C2F5E9', '#72DDC3', '#20D9D2', '#7BC8C3', '#06A09B',
    '#D0F0FD', '#77D1F3', '#18BFFF', '#4083AC', '#0B76B7',
    '#CFDFFF', '#9CC7FF', '#2D7FF9', '#0067FF', '#0054D1'
  ]

  // label = new FormGroup({
  //   labelInput: new FormControl('')
  // })

  labelInput: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public messageId: any,
    public dialogRef: MatDialogRef<AddLabelComponent>,
    public replieService: ReplieService,
    private toastNotification: ToastNotificationService,
    // public replie: RepliesThreadComponent
  ) { }

  ngOnInit(): void {
    this.getLabelList();
    this.color = this.colorSelections[Math.floor((Math.random() * 40) + 1)]


  

    this.labelInput.valueChanges.subscribe((resp: any) => {
      // console.log(resp)
      this.disabledState = true;
      for (const item of this.labelNameList) {
        if (item === resp) {
          this.duplicate = true;
          // console.log(item)
          break;
        } else {
          this.duplicate = false;
          // console.log(item)
        }
      }
    })

  }


  getLabelList() {
    this.replieService.getLabelList(this.messageId.messageId).subscribe((resp: any) => {
      this.labelListData = resp.list;
      // console.log(this.labelNameList);
      this.labelListData.forEach((e: any) => {
        this.labelNameList.push(e.labelName);
      });

      // console.log(this.labelNameList)
    })



    // for (const item of this.labelListData) {
    //   console.log(item)

    // }

    // for(let i=0; i < this.labelListData.length; i++) {
    //   let listName = this.labelListData[i].labelName;
    //   this.data.push(listName);
    // }
    // console.log(this.data);
  }

  addlabel() {

    let labelName = this.labelInput.value;
    // console.log(labelName)
    let labelColor = this.color;
    // console.log(labelColor)

    this.replieService.addLabel(labelName, labelColor).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {

        // console.log(resp)

        this.toastNotification.addNotification(
          resp.responseCodeJson.message,
          '',
          NotificationEnum.SUCCESS
        );

        this.dialogRef.close();
      } else if (resp.responseCodeJson.code === 409) {
        this.toastNotification.addNotification(
          resp.responseCodeJson.message,
          '',
          NotificationEnum.WARNING
        );
      }
    })
  }
}
