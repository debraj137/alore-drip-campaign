import { Component, Input, OnInit } from '@angular/core';
import { IToastNotification } from 'src/app/model/toast-notification';

@Component({
  selector: 'app-toast-notification-item',
  templateUrl: './toast-notification-item.component.html',
  styleUrls: ['./toast-notification-item.component.scss']
})
export class ToastNotificationItemComponent implements OnInit {

  @Input() notification!: IToastNotification;
  display: boolean = true

  constructor() { }

  ngOnInit(): void {
    if (this.notification.status === 'danger' || this.notification.status === 'warning') {
      setTimeout(() => {
        this.display = false
      }, 6000)
    }

    else if (this.notification.status === 'info') {
      setTimeout(() => {
        this.display = false
      }, 3000)
    }

    else {
      setTimeout(() => {
        this.display = false
      }, 2000)
    }
  }

}
