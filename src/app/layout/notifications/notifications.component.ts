import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/service/core/layout.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(
    public layoutService : LayoutService
  ) { }

  ngOnInit(): void {
    this.layoutService.notificatioNTrigger.subscribe((data) =>{
      //on executed notification
    })
  }

}
