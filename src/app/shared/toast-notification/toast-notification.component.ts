import { Component, OnInit } from '@angular/core';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit {

  constructor(
    public toastNotification : ToastNotificationService,
  ) { }

  ngOnInit(): void {
  }

}
