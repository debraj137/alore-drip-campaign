import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/core/common.service';
import { LayoutService } from 'src/app/service/core/layout.service';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

   faqSection: any;
   isUserImagePresent: boolean = false;
   userInitials = "";
   userImage =  "";
   isProfileLoaded: boolean = false;

   userObj = localStorage.getItem('usrCompObj') ?JSON.parse(localStorage.getItem('usrCompObj') || '') : '';
   token = this.userObj.token;




  menuItem: any[] = [
    {
      name: 'Blaze',
      icon: 'send',
      link: 'https://blaze.alore.io/login',
    },
    {
      name: 'Campaign',
      icon: 'document',
      link: 'https://campaign.alore.io/',
    },
    {
      name: 'Database',
      icon: 'folder',
      link: 'https://database.alore.io/',
    },
    {
      name: 'Docs',
      icon: 'mail',
      link: 'https://docs.alore.io/',
    },
    {
      name: 'Table',
      icon: 'search',
      link: 'http://app.alore.io/',
    },
  ];



  constructor(
    public layoutService: LayoutService,
    private commonService: CommonService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    if(this.router.url.toString().includes('objectives')){
      this.layoutService.updateSidebarStatus(true);
    }

    this.commonService.getUserProfileImage().subscribe((resp: any) => {

      if(resp.responseCodeJson.code === 200){
        this.userImage = resp.object.profilePicture;

        if(this.userImage != ""){
            this.isUserImagePresent = true;
        }

        else{
            this.userInitials = resp.object.firstName.charAt(0) + resp.object.lastName.charAt(0);
        }

        this.isProfileLoaded = true;
      }
    })
  }



  getIcon(type: string): string {
    return this.commonService.getIcon(type);
  }

  redirect(menuName: string) {
    switch (menuName) {
      case 'Campaign':
        this.router.navigate(['Campaign']);
        break;

      default:
        break;
    }
  }

  get getNavStatus() {
    let bool: Boolean = this.layoutService.getSidebarStatus;
    return bool;
  }

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {

    })
  }

  userProfile(){
    this.router.navigate(['userProfile'])
  }

  doLogout() {
    const alert = this.layoutService.openAlertDialog(
      'You are attempting to log out of Campaign',
      'Are you sure want to logout ?',
      true,
      'number_Mail_Icon',
      'Log out'
    );
    alert.afterClosed().subscribe((result) => {
      if (result) {
        this.layoutService.doLogout();
      }
    });
  }

  redirectToUrl(url : string) {
    window.location.href = url
  }


  toggleSidebar(){

    if(this.router.url.toString().includes('objectives')){
      this.layoutService.updateSidebarStatus(true);
      return;
    }

    this.layoutService.updateSidebarStatus(!this.getNavStatus);

  }
}
