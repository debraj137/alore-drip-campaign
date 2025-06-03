import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/core/common.service';
import { LayoutService } from 'src/app/service/core/layout.service';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
    '../../../assets/style/user-list-style.scss',
  ],
})
export class HeaderComponent implements OnInit {
  showSearch: boolean = false;
  userList: any[] = [];
  formControl = this.fb.group({
    search: [null],
  });


  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private treeService: SideMenuTreeService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.setUserList();
  }

  getIcon(type: string): string {
    return this.commonService.getIcon(type);
  }

  getAcronymName(userData: any) {
    const firstName = userData?.firstName?.toUpperCase();
    const lastName = userData?.lastName?.toUpperCase();
    if (firstName && lastName) {
      return firstName[0] + lastName[0];
    } else {
      return '';
    }
  }

  changeUser(user: any) {
    if (user.userId !== this.getActiveUser.userId) {
      this.layoutService.changeUser(user);
    }
  }

  uppercaseFirstLetter(str: string) {
    var firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
  }

  setUserList() {
    if (localStorage.getItem('usrList')) {
      this.userList = JSON.parse(localStorage.getItem('usrList') || '');
    }
  }

  redirectToAccountLoginPage() {
    window.location.href = environment.redirectLoginUrl;
  }

  get getActiveUser() {
    const userObj = localStorage.getItem('usrCompObj')
      ? JSON.parse(localStorage.getItem('usrCompObj') || '')
      : null;
    let usrList: any[] = [];
    if (localStorage.getItem('usrList')) {
      usrList = JSON.parse(localStorage.getItem('usrList') || '');
    }

    const userData = usrList.find(
      (data: any) => data.userId === userObj?.userId
    );
    return userData;
  }

  get getCurrentUrl() {
    return this.router.url.includes('/email/');
  }

  get isNavTreeShow() {
    let bool: Boolean = this.layoutService.getSidebarStatus;
    return bool;
  }

  get allUser() {
    if (this.userList.length >= 1) {
      return this.userList;
    } else {
      return [];
    }
  }

  get headerPaddingLeft() {
    switch (this.isNavTreeShow) {
      case true:
        return !this.getCurrentUrl ? 155 : 105;
        break;

      default:
        return !this.getCurrentUrl ? 445 : 395;
        break;
    }
  }


}

