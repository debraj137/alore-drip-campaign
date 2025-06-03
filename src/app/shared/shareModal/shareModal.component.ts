import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { map, Observable, startWith } from "rxjs";
import { NotificationEnum } from "src/app/model/enum/notification-enum";
import { SharePermissionEnum } from "src/app/model/enum/share-permission-enum";
import { IInviteduser, IUserList, IRemoveUserPayload } from "src/app/model/user";
import { ToastNotificationService } from "src/app/service/core/toast-notification.service";
import { UserAccessService } from "src/app/service/resource/user-access.service";
import { campaignList } from '../../model/tree-sidebar';
import { filter } from 'rxjs/operators';

interface shareModalData {
  baseCampaignId: string;
  campaignId: string;
}

@Component({
  selector: 'app-share-modal',
  templateUrl: './shareModal.component.html',
  styleUrls: [
    './shareModal.component.scss',
    '../../../assets/style/default-modal-style.scss',
    '../../../assets/style/form-field.scss'
  ]
})

export class shareModalComponent implements OnInit {

  searchUser = new FormControl('');
  filteredUser!: Observable<IUserList[]>;
  userList: IUserList[] = [];
  invitedUserList: IInviteduser[] = [];
  deSelectUserList: any[] = [];
  unSelectCampaignId: string = "";
  shareAccess = [
    {
      label: 'Owner',
      value: 1
    },
    {
      label: 'Editor',
      value: 2
    },
    {
      label: 'Viewer',
      value: 3
    },
  ]
  mailSelectionVisibility: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: shareModalData,
    public dialogRef: MatDialogRef<shareModalComponent>,
    private userService: UserAccessService,
    private toastNotification: ToastNotificationService
  ) {
  }

  ngOnInit(): void {
    this.getUserList()
    this.getSharedUserList()

    this.searchUser.valueChanges.subscribe((value: string) => {
      const splittedValue = value.split('.')
      if (
        value.includes('@') &&
        splittedValue[0]?.length > 2 &&
        splittedValue[1]?.length >= 2 &&
        splittedValue.length >= 2 &&
        !splittedValue[1].includes(',') &&
        !splittedValue[0].includes(',')
      ) {
        this.mailSelectionVisibility = true
      } else {
        this.mailSelectionVisibility = false
      }
    })
  }

  inviteUserByEmail() {

    let email = this.searchUser.value
    let userObj = localStorage.getItem('usrCompObj') ? JSON.parse(localStorage.getItem('usrCompObj') || '') : '';


    this.invitedUserList.push({
      role: SharePermissionEnum.VIEWER,
      emailId: this.searchUser.value
    })

    
    const payload = {
      campaignBaseId: this.data.baseCampaignId,
      campaignId: this.data.campaignId,
      userId: userObj.userId,
      companyId: userObj.companyId,
      link: `https://campaign.alore.io/campaign-Details/${this.data.baseCampaignId}/campaign-item-detail/${this.data.campaignId}`,
      guestEmail: email

    }

    this.userService.shareCampaignWithEmail(payload)
      .subscribe((resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          this.getSharedUserList()
        }
      })

    this.searchUser.setValue('');
    this.getUserList();

  }

  inviteUser(userData: IUserList) {
    const isUserAlreadyExist = this.invitedUserList.filter((data: IInviteduser) => {
      return data.emailId === userData.emailId
    })

    if (!isUserAlreadyExist.length) {
      const payload = [{
        sharedWithId: userData.userId,
        role: SharePermissionEnum.VIEWER
      }]

      this.userService.shareCampaign(payload, this.data.campaignId)
        .subscribe((resp: any) => {
          if (resp.responseCodeJson.code === 200) {
            this.getSharedUserList()
          }
        })
    }
    this.searchUser.setValue('')
  }

  getSharedUserList() {
    this.userService.getSharedUserList(this.data.campaignId).subscribe(
      (resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          resp.list.forEach((obj: IInviteduser) => {
            const isUserAlreadyExist = this.invitedUserList.filter((data: IInviteduser) => {
              return data.emailId === obj.emailId
            })
            if (!isUserAlreadyExist?.length) {
              this.invitedUserList.push({
                ...obj,
                role: obj.role.toString(),
                isUserSelected: true
              })
            }
          })
        }
      }
    )
  }

  getUserList() {
    this.userService.getUserList().subscribe(
      (resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          this.userList = resp.list;
         
        }
        this.filteredUser = this.searchUser.valueChanges.pipe(
          startWith(''),
          map(state =>
            (state ? this.filterUser(state) : this.userList.slice())
          ),
        );
      }
    )
  }

  updateUserPermission() {
    const payload: any = this.invitedUserList.map((obj: IInviteduser) => {
      return {
        permissionId: obj.permissionId,
        role: obj.role
      }
    })
    this.userService.updateUserPermission(payload).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.dialogRef.close('success')
        this.toastNotification.addNotification(
          'Success',
          'User access have been updated',
          NotificationEnum.SUCCESS
        )
      }
    })
  }

  getUserLabel(userLabel: string) {
    if (userLabel.trim()) {
      return userLabel.substring(0, 2)
    } else {
      return ''
    }
  }

  isUserExist(userData: IUserList) {
    const checkUser = this.invitedUserList.filter((obj: IInviteduser) => {
      return obj.userId === userData.userId
    })
    if (checkUser.length >= 1) {
      return true
    } else {
      return false
    }
  }

  filterUser(value: string): IUserList[] {
    const filterValue = value.toLowerCase();

    return this.userList.filter(user =>
      user.userEmailId.toLowerCase().includes(filterValue)
    );
  }

  selectValue(userData: any) {

    

    if (userData.isUserSelected) {
      this.deSelectUserList.push(userData.emailId);
    }

    else {
      this.deSelectUserList = this.deSelectUserList.filter((user) => {
        return user.emailId != userData.emailId
      })
    }

  }

  sendDeselectedUserList() {

    if (this.deSelectUserList.length > 0)
      this.userService.removeUser(this.deSelectUserList, this.data.campaignId).subscribe((resp) => { });

  }


  getRoleLabel(label: string) {
    switch (label.toString()) {
      case SharePermissionEnum.OWNER:
        return 'Owner'
        break;
      case SharePermissionEnum.EDITOR:
        return 'Editor'
        break;
      case SharePermissionEnum.VIEWER:
        return 'Viewer'
        break;

      default:
        return ''
        break;
    }
  }

}