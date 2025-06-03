import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCompObj, UserDetails, userLocal } from 'src/app/model/user-comp-obj';
import { AuthService } from 'src/app/service/resource/auth.service';
import { UserProfileService } from 'src/app/service/resource/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.scss']
})
export class CheckLoginComponent implements OnInit {
  userlist: any[] = [];
  currentUserDetails: any;
  tokens: any;
  loader: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const tokenParam = this.route.snapshot.queryParamMap.get('token');
    this.verifyUser(tokenParam || '')
    localStorage.setItem('campAnalytics', JSON.stringify([]));
  }

  verifyUser(token: string) {
    if (localStorage.getItem("userAccountLists")) {
      this.userlist = JSON.parse(localStorage.getItem("userAccountLists")!);
      this.userlist = [...new Set(this.userlist)];
    } else {
      this.userlist = [];
    }

    this.authService.validateUser(token).subscribe((resp) => {
  
      if (resp.object.userId && resp.object.companyId) {
        const usrCompObj: UserCompObj = {
          companyId: resp.object.companyId,
          userId: resp.object.userId,
          token: token
        }


        const userCompTemp: userLocal = {
          companyId: resp.object.companyId,
          userId: resp.object.userId,
          token: token
        }
        // this.userlist.push(usrCompObj);
        if (this.userlist.length == 0) {
          this.userlist.push(userCompTemp); 
          this.userlist = [...new Set(this.userlist)];
        } else {
          this.userlist.forEach((obj: any) => {
            if (obj.userId == userCompTemp.userId) {
              this.userlist = [...new Set(this.userlist)];
            } else {
              this.userlist.push(userCompTemp);
              // this.userlist = [...new Set(this.userlist)];
              this.userlist = [...new Set(this.userlist)];
         
            }
          });
        }

        this.setUserList();

        let userList = localStorage.getItem('userAccountLists') ? JSON.parse(localStorage.getItem('userAccountLists') || '') : '';
       
        localStorage.setItem('usrCompObj', JSON.stringify(usrCompObj));
        
        setTimeout(() => {
          this.loader = false;
          this.router.navigateByUrl('');
        }, 2000);
      }

      else {
        this.redirectToLogin('User not verified')
      }
    })
  }
  setUserList(){
    localStorage.setItem('userAccountLists', JSON.stringify(this.userlist));
  }
  removeDuplicates(arr:any) {
    return arr.filter((item:any,
        index:any) => arr.indexOf(item) === index);

}

  redirectToLogin(message: string) {
    localStorage.removeItem('usrCompObj');
    this.router.navigateByUrl(environment.loginPageUrl);
  }

}
