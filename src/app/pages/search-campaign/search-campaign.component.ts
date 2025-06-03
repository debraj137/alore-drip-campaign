import { Component, Directive, ElementRef, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SearchCampaignService } from 'src/app/service/resource/search-campaign.service';
import { DatePickerSearchFilterComponent } from './date-picker-search-filter/date-picker-search-filter.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-search-campaign',
  templateUrl: './search-campaign.component.html',
  styleUrls: ['./search-campaign.component.scss']
})

// @Directive({
//   selector: '[focus]'
// })

export class SearchCampaignComponent implements OnInit {

  // @Input() focus: boolean;

  successValue: boolean = false;
  errorValue: boolean = false;
  disabledButton: boolean = false;
  changeSearchInputStyle: boolean = false;

  focus: boolean = false;

  todayDate = new Date();
  searchInputValue: string = '';
  teamspacelist: any;
  getCreatedList: any;
  getAllCampaignList: any;
  selectedTeamspace: string = '';
  selectedCreatedBy: string = '';
  selectedCreatedByValue: string = '';
  selectedSender: string = '';
  teamspaceIndex: number = 0;
  searchLength: number = 0;
  selectedDateValue: string = '';
  senderDisableState: boolean = true;
  getSenderData: any;

  loader: Boolean = false;
  getSenderListData: any;
  startDate: string = ''
  endDate: string = ''

  searchCamp: FormControl = new FormControl('');
  createdByValue: FormControl = new FormControl('');
  senderByValue: FormControl = new FormControl('')


  constructor(
    public dialogRef: MatDialogRef<SearchCampaignComponent>,
    public search: SearchCampaignService,
    public router: Router,
  ) { }

  ngOnInit(): void {


    this.searchCamp.valueChanges.subscribe((resp) => {
      this.searchInputValue = resp;

      if (this.searchInputValue.length >= 0) {
        this.changeSearchInputStyle = true;

      } else if (this.searchInputValue.length == 0) {
        this.changeSearchInputStyle = false;
      }
      // this.disabledButton = true;
      this.getCampaignList();

    })

    this.createdByValue.valueChanges.subscribe((resp) => {
      this.selectedCreatedByValue = resp;
    })

    this.senderByValue.valueChanges.subscribe((resp) => {
      this.selectedSender = resp;
    })


    this.getTeamSpace();
    this.getCreatedByList();
    this.getSenderList();
  }



  // checkIfCreatedByPresent(items: any): boolean {

  //   let fullName = items.firstName.toLowerCase() + items.lastName.toLowerCase();

  //   if (fullName.length == 0)
  //     return false;

  //   if (this.selectedCreatedByValue === "")
  //     return true;

  //   let senderValue = this.selectedCreatedByValue.toLowerCase();

  //   if (this.selectedCreatedByValue.length >= 1) {
  //     if (!fullName.includes(senderValue))
  //       return false;

  //     else
  //       return true;
  //   }

  //   return false;
  // }

  checkIfEmailPresent(items: any): boolean {

    if (items.userEmailId == null || items.userEmailId == '')
      return false;

    if (this.selectedSender === "")
      return true;

    let email = items.userEmailId.toLowerCase()
    let senderValue = this.selectedSender.toLowerCase();

    if (this.selectedSender.length >= 1) {
      if (email.includes(senderValue))
        return true;

      else
        return false;
    }

    return false;
  }


  selectTeamspace(i: any) {



    if (this.searchInputValue.length > 3) {
      this.teamspaceIndex = i;
      this.selectedTeamspace = this.teamspacelist[i];
      this.getCampaignList();
    } else {
      this.teamspaceIndex = i;
      this.selectedTeamspace = this.teamspacelist[i];
    }
  }



  selectCreatedBy(item: any) {

    if (item.firstName !== 'No user found') {
      if (this.searchInputValue.length > 3) {
        this.selectedCreatedByValue = `${item.firstName} ${item.lastName}`;
        this.selectedCreatedBy = item.userId;
        this.getCampaignList();
      } else {
        this.selectedCreatedByValue = `${item.firstName} ${item.lastName}`;
        this.selectedCreatedBy = item.userId;
      }
    }


  }


  selectSender(item: any) {

    if (item.userEmailId !== 'No user found') {
      this.selectedSender = item.userEmailId;
      this.getCampaignList()
    }
  }

  receivedDate(event: any) {

    if (event.start == null || event.end == null) {
      this.startDate = "";
      this.endDate = "";
      this.selectedDateValue = ""
    }


    else {
      let startDate = new Date(event.start);
      let endDate = new Date(event.end);

      let isoStartDate = startDate.toLocaleDateString().slice(0, 10);
      let isoEndDate = endDate.toLocaleDateString().slice(0, 10);

      this.selectedDateValue = isoStartDate + " - " + isoEndDate

      this.startDate = startDate.toISOString().slice(0, 10) + " 00:00:00";
      this.endDate = endDate.toISOString().slice(0, 10) + " 23:59:59";
    }

    this.getSearchList()
  }



  getDateInString(date: any) {
    this.todayDate = new Date(date);
    return (this.todayDate.getDate() + ' ' + this.todayDate.toLocaleString('default', { month: 'long' }) + ", " + this.todayDate.getFullYear());
  }

  redirectToCampaign(i: any) {
    let item = this.getAllCampaignList[i];
    let baseCampaignId = item.campaignBaseId;
    let campaignId = item.campaignId;

    this.router.navigate(["campaign-Details/" + baseCampaignId + "/campaign-item-detail/" + campaignId]);
    this.dialogRef.close();
    setTimeout(() => {
      window.location.reload();
      this.dialogRef.close();
    }, 500)

  }

  clearCreatedByValue() {
    this.selectedCreatedBy = '';
    this.selectedCreatedByValue = '';
    this.getCampaignList();
  }
  clearSenderValue() {
    this.selectedSender = '';
    this.getCampaignList();
  }
  clearDateValue() {
    this.selectedDateValue = '';
    this.startDate = "";
    this.endDate = "";

    this.getCampaignList();
  }


  getTeamSpace() {
    this.search.getTeamSpaceList().subscribe((resp: any) => {
      this.teamspacelist = resp.list;
      // console.log(this.teamspacelist)
    })
  }

  getSenderList() {

    this.search.getSenderList().subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.getSenderListData = resp.list;

      }
    });
  }


  getCreatedByList() {
    this.search.getCreatedByList().subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.getCreatedList = resp.list;
        this.getSenderData = resp.list.userEmailId;
        this.getCampaignList();
      }

    })
  }

  getCampaignList() {
    if (this.searchInputValue.length > 3) {
      this.disabledButton = true;
      this.getSearchList()

    } else {
      // this.searchCamp.setValue("");
      // this.getSearchList()
      this.disabledButton = false;
    }

  }



  getSearchList() {
    let obj = {
      createdBy: this.selectedCreatedBy,
      sender: this.selectedSender,
      campaignName: this.searchInputValue,
      teamSpace: this.teamspaceIndex,
      startDate: this.startDate,
      endDate: this.endDate
    }

    this.search.getCampaignList(obj).subscribe((resp: any) => {
      this.loader = true;
      if (resp.responseCodeJson.code === 200) {
        this.getAllCampaignList = resp.list;
        this.searchLength = resp.list.length;
        this.loader = false;
      }
    });
  }


}
