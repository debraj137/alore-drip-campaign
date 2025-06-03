import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  
  isLoaded: boolean = false;
  @Input() activityItem: any[] = [];
  campId: any = '';
  shortName: string = '';
  subShortName: string = '';
  scrollData: boolean = false;



  constructor(
   
  ) { }

  ngOnInit(): void {
  
  }

  getActivity(activity: number): any {
    switch (activity) {
      case 0:
        return {
          style: 'success',
          icon: '#login',
          title: 'Logged in successfully'
        }
        break;

      case 1:
        return {
          style: 'danger',
          icon: '#logout',
          title: 'Logged out from device'
        }
        break;

        case 2:
          return {
            style: 'success',
            icon: '#success',
            title: 'Password Updated'
          }
          break;

        case 3:
          return {
            style: 'success',
            icon: '#success',
            title: 'Password Created'
          }
          break;

      default:
        return {
          style: '',
          icon: '',
          title: ''
        }
        break;
    }
  }

 

  getTime(dateString: string) {
    const date = new Date(dateString)
    return this.verifyNumberDigit(date.getHours()) + ':' + this.verifyNumberDigit(date.getMinutes())
  }

  verifyNumberDigit(num: number) {
    if (num <= 9) {
      return '0' + num
    } else {
      return num
    }
  }

  onScroll(){
    this.scrollData = true;
  }

}
