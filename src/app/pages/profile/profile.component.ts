import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { LayoutService } from 'src/app/service/core/layout.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { UserProfileService } from 'src/app/service/resource/user-profile.service';
// import { ICampaignUserDetails, UserAccount } from 'src/app/model/campaign';
import { ThisReceiver } from '@angular/compiler';
import { IUserList, UserAccount } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { UserDetails } from 'src/app/model/user-comp-obj';
import { Console } from 'console';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedCampaignLoader: string = '';
  campaignId: string = '';
  userDetails: any;
  // userId: string = '';
  userConfig: IUserList[] = [];
  userAccountList: any;
  // companyId:  string = '';

  dataSource: string = "95";
  userListData: any;
  list: any;
  userFinalData: any[] = [];
  userNewList: any;
  particularUserId: any;


  constructor(
    private router: Router,
    public campaignService: CampaignService,
    public layoutService: LayoutService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    public userData: UserProfileService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  // openProfileInfo: boolean = false;

  listsOfProfile: any[] = [
    { name: 'Vikas Jha', email: 'vikas@alore.io', shName: 'VJ' },
    { name: 'Kamlesh Samrit', email: 'Kamlesh@alore.io', shName: 'KS' },
    { name: 'Chandan Maharana', email: 'chandan@alore.io', shName: 'CM' },
    { name: 'Naman Yadav', email: 'naman@alore.io', shName: 'NY' },
    { name: 'Paras Wanjari', email: 'paras@alore.io', shName: 'PW' },
  ];


  ngOnInit(): void {
    // let userObj = localStorage.getItem('usrCompObj') ?JSON.parse(localStorage.getItem('usrCompObj') || '') : '';
    // console.log(userObj)
    this.getUser();

    this.getUserListData();
  }

  getUser() {
    this.userData.getUserProfile().subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
        this.userDetails = res.object;
        // console.log(this.userDetails)
        return this.userDetails;
      }

    })
  }



  getUserListData() {

    this.list = localStorage.getItem('userAccountLists') ? JSON.parse(localStorage.getItem('userAccountLists') || '') : '';;
    var updatedList = this.list.forEach((data: any) => {

      var final: UserDetails = {
        companyId: data.companyId,
        userId: data.userId
      }
      this.userFinalData.push(final);
    })
    this.userData.getUserList(this.userFinalData).subscribe((resp: any) => {
      // console.log(list)
      if (resp.responseCodeJson.code === 200) {
        this.userListData = resp.list;

        this.checkPresentUser();

      }
    })

  }

  checkPresentUser() {

    // let allUserList = localStorage.getItem('userAccountLists') ? JSON.parse(localStorage.getItem('userAccountLists') || '') : '';
    let currentUser = localStorage.getItem('usrCompObj') ? JSON.parse(localStorage.getItem('usrCompObj') || '') : '';

    this.userListData.forEach((obj: any) => {
      if (obj.userId == currentUser.userId) {
        // const count = allUserList.indexOf(obj);
        // console.log(count);
        this.userListData = this.userListData.filter((obje: any) => {
          return obje.userId !== obj.userId
        });
        // console.log(this.userListData);
      }
    })
  }



  doLogout() {


    this.layoutService.saveLogOutActivity().subscribe((resp: any) => {

      if(resp.responseCodeJson.code === 200){
        localStorage.clear();
        this.layoutService.doLogout();
      window.location.reload();
      }
    });

    // const alert = this.layoutService.openAlertDialog(
    //   'You are attempting to log out of Campaign',
    //   'Are you sure want to logout ?',
    //   true,
    //   'number_Mail_Icon',
    //   'Log out'
    // );
    // alert.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.layoutService.doLogout();
    //     this.dialogRef.close();
    //   }
    // });
  }

  signIn() {
    const signUpLink: string = 'https://auth.alore.io/?returnto=campaign.alore.io'
    this.document.location.href = signUpLink
  }

  emptyUserData() {
    this.layoutService.saveLogOutActivity().subscribe((resp: any) => {
      if(resp.responseCodeJson.code === 200){
        localStorage.clear();
        this.router.navigateByUrl('login')
        this.dialogRef.close();
      }
    });

  }


  getPresentUserData(index: number) {
    this.list.forEach((obj: any) => {
      if (obj.userId == this.userListData[index].userId) {
        localStorage.setItem('usrCompObj', JSON.stringify(obj));
        window.location.reload();
      }

    });

    this.checkPresentUser();
  }

  signOutSpecificUser(specificId: any) {
    let localUserList = localStorage.getItem('userAccountLists') ? JSON.parse(localStorage.getItem('userAccountLists') || '') : '';
    let payload: UserDetails[] = [];
    let tempUserAccountList: any[] = []
    localUserList.forEach((obj: any, i: number) => {
      if (obj.userId !== specificId) {
        tempUserAccountList.push(obj)
        payload.push( {
          userId: obj.userId,
          companyId: obj.companyId
        })
      }
    })
    this.userListData = this.userListData.filter((obj : any) => {
      return obj.userId !== specificId
    })
    localStorage.setItem('userAccountLists' ,JSON.stringify(tempUserAccountList))

    // this.userData.getUserList(payload).subscribe((resp: any) => {
    //   if (resp.responseCodeJson.code === 200) {
    //     this.userListData = resp.list;
    //   }
    // })

    // for(let i=0; i<localUserList.length; i++) {
    //   if(localUserList[i].userId == specificId) {






    // }


    // var eachUser = localUserList.forEach((userIn: any) => {
    //   console.log(userIn)
    //   console.log(userIn.userId)
    //   if(userIn.userId == specificId) {
    //     this.particularUserId = userIn.userId
    //   }

    //   console.log(this.particularUserId)
    // })

    // console.log(this.particularUserId)
    // // console.log(user.userId)
    // // console.log(localUserList.Object.userId)
    // if (this.particularUserId == specificId) {
    //   // console.log("im in")
    //   for (var i = 0; i < this.userListData.length; i++) {
    //     var obj = this.userListData[i];
    //     // console.log(obj)

    //     if (specificId.indexOf(obj.userId) !== -1) {
    //       this.userListData.splice(i, 1);
    //       i--;
    //     }
    //   }

    //   for (var i = 0; i < localUserList.length; i++) {

    //     var obje = localUserList[i];
    //     console.log(obje)
    //     console.log(obje.userId)
    //     if (specificId.indexOf(obj.userId) !== -1) {
    //       console.log(localUserList)
    //       localUserList.splice(i, 1);
    //       console.log(localUserList)

    //       localStorage.setItem('userAccountLists', JSON.stringify(localUserList));
    //       // console.log(localUserList)
    //       // console.log(x)
    //       i--;
    //     }
    //   }



    // }


    // console.log(this.userListData)
    // // this.userNewList = this.list.splice(index,1);
    // console.log(this.userNewList)
  }

  redirectToUserProfile() {
    this.dialogRef.close();
    this.router.navigate(['/userProfile']);

  }
}

// signOutSpecificUser(index: number) {
//   console.log(this.list)
//   this.list.splice(index,1);
//   console.log(this.list)
//   localStorage.setItem('userAccountLists', JSON.stringify(this.list));
//   let x = localStorage.getItem('userAccountLists') ? JSON.parse(localStorage.getItem('userAccountLists') || '') : '';
//   var updatedList = x.forEach((data: any) => {

//     var final: UserDetails =  {
//       companyId: data.companyId,
//       userId: data.userId
//     }
//   })

//   this.userData.getUserList(x).subscribe((resp: any) => {
//     // console.log(list)
//     if (resp.responseCodeJson.code === 200) {
//       this.userListData = resp.list;
//       console.log(this.userListData)
//       this.checkPresentUser();

//     }
//   })
// }
// }


// (click)="signOutSpecificUser(i)"

