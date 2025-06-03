import { Chart } from 'chart.js';
import { Component, forwardRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { shareModalComponent } from 'src/app/shared/shareModal/shareModal.component';

@Component({
  selector: 'common-css',
  templateUrl: './common-css.component.html',
  styleUrls: ['./common-css.component.css'],
})
export class CommonCssComponent implements OnInit {
  selectedValueOption: any = "";
  constructor(private dialog: MatDialog) {}

  accesslist: any[] = [
    {
      type: 'Owner',
      desc: 'Settings delete & edit',
      image: './assets/user-plus.svg',
    },
    {
      type: 'Editor',
      desc: 'Manage settings & share',
      image: './assets/edit.svg',
    },
    {
      type: 'Viewer',
      desc: 'Comment and view',
      image: './assets/image-3.svg',
    },
  ];

  ngOnInit(): void {}
  colorList = [
    '#D4DAB4',
    '#FDC296',
    '#CC89EA',
    '#F693BF',
    '#D2FC8C',
    '#00FFDD',
    '#FE6A00',
    '#9CC69E',
    '#9BDFE0',
    '#A98DFE',
    '#f48c3',
    '#00EF55',
    '#FFBE00',
    '#DAFF01',
    '#b3b97',
    '#8EEFE8',
    '#91EAFA',
    '#005EFE',
    '#FFD900',
    '#0099FF',
    '#F4D885',
    '#8BE1C6',
    '#DF8E8D',
    '#FE2B00',
    '#1EFF00',
    '#00FF89',
  ];
  racipeList = [
    'Recipe 1 - AIDA Framework For sales and bussiness',
    'Recipe 2',
    'Recipe 3',
    'Recipe 4',
    'Recipe 5',
    'Recipe 6',
    'Recipe 7',
    'Recipe 8',
    'Recipe 9',
    'Recipe 10',
    'Recipe 11',
    'Recipe 12',
    'Recipe 13',
    'Recipe 14',
    'Recipe 15',
  ];

  listsOfProfile:any[] =[
    { name:'Vikas Jha', email:'vikas@alore.io',shName:'VJ' },
    { name:'Kamlesh Samrit', email:'Kamlesh@alore.io',shName:'KS' },
    { name:'Chandan Maharana', email:'chandan@alore.io',shName:'CM' },
    { name:'Naman Yadav', email:'naman@alore.io',shName:'NY' },
    { name:'Paras Wanjari', email:'paras@alore.io',shName:'PW' },
  ];
  title = 'css-library';
  toggle: boolean = false;
  disabledButton: boolean = false;
  radioLarge: boolean = false;
  radioMedium: boolean = false;
  radioSmall: boolean = false;
  shareButton: boolean = false;
  clickedBox: boolean | undefined;
  disableChecked = true;
  triggerDropDown: boolean = false;
  openProfileInfo: boolean = false;
  neutral = false;
  disabled = false;
  // labelPosition: 'before' | 'after' = 'after';
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  // disabled = false;
  value: string = '';
  value2: string = '';
  successValue: boolean = false;
  errorValue: boolean = false;
  tabLayoutActive: number = 0;
  tabLayoutActiveIcon: number = 0;
  tabLayoutActiveNumber: number = 0;
  tabLayoutActiveIconNumber: number = 0;
  chooseYourPlanType1: number = 1;
  chooseYourPlanType2: number = 1;
  chooseYourPlanType3: number = 1;
  tree1expanded = false;
  tree2expanded = false;
  treeSelected = 0;

  disableAll() {
    this.disabledButton = !this.disabledButton;
  }
  addEmoji(event: any) {
    console.log(event);
  }

  radioBoxLarge(): void {
    this.radioLarge = !this.radioLarge;
    console.log('radioLarge');
  }
  radioBoxMedium(): void {
    this.radioMedium = !this.radioMedium;
    console.log('radioMedium');
  }
  radioBoxSmall(): void {
    this.radioSmall = !this.radioSmall;
    console.log('radioSmall');
  }

  shareButtonOpen(): void {
    // this.shareButton = true;
    this.dialog.open(shareModalComponent, {
      backdropClass: 'backdrop-background',
      panelClass: 'objective-layout',
    });
  }

  getvalue() {
    this.value = this.value.trim();
    if (this.value == 'naman') {
      this.errorValue = true;
      this.successValue = false;
    } else if (this.value == 'chandan') {
      this.successValue = true;
      this.errorValue = false;
    } else {
      this.successValue = false;
      this.errorValue = false;
    }
  }

  onTabLayoutClick(index: number): void {
    this.tabLayoutActive = index;
  }

  onTabLayoutClickIcon(index: number): void {
    this.tabLayoutActiveIcon = index;
  }

  onTabLayoutClickNumber(index: number): void {
    this.tabLayoutActiveNumber = index;
  }

  onTabLayoutClickIconNumber(index: number): void {
    this.tabLayoutActiveIconNumber = index;
  }

  onItemPlanClick(num: number, type = 1): void {
    if (type === 1) {
      this.chooseYourPlanType1 = num;
    }

    if (type === 2) {
      this.chooseYourPlanType2 = num;
    }

    if (type === 3) {
      this.chooseYourPlanType3 = num;
    }
  }

  onChangeTreeActive(num: number) {
    this.treeSelected = num;
    if (num === 1) {
      this.tree1expanded = !this.tree1expanded;
    }

    if (num === 2) {
      this.tree2expanded = !this.tree2expanded;
    }
  }

  optionClickValue(i:any):void{
    this.selectedValueOption = this.accesslist[i].type;
    // console.log(this.accesslist[i].type);
  }
}
