import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHomeSideBar } from 'src/app/model/tree-sidebar';

@Injectable({
  providedIn: 'root'
})
export class SideMenuTreeService {
  tickSideMenu = new BehaviorSubject<boolean>(false);
  campaignLoader = new BehaviorSubject<string>('');
  tree = new BehaviorSubject<Array<any>>([]);
  currentTemplateList = new BehaviorSubject<Array<any>>([]);
  currentSelectedEmail = new BehaviorSubject<any>(null);
  refreshEmailEditor = new BehaviorSubject<any>(null);
  activeEmailSidebar = new BehaviorSubject<any>(null);
  mailChanged = new BehaviorSubject<any>(null);
  firstLoad: boolean = true;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  addTree(data: any) {
    const currentValue = this.tree.value
    this.tree.next([...currentValue, data])
  }

  get getRootLink() : any {
    const activeTree = this.activeCampaign
    let rootLink: any = null
    Object.keys(activeTree).forEach((value: string) => {
      if (activeTree[value].level === 30) {
        switch (activeTree[value].name) {
          
          case 'My Campaign base':
            rootLink = {
              name: activeTree[value].name,
              link: 'myCampaignBase',
            }
            break;
          case 'Shared by me':
            rootLink = {
              name: activeTree[value].name,
              link: 'sharedByMe',
            }
            break;
          case 'Shared with me':
            rootLink = {
              name: activeTree[value].name,
              link: 'sharedWithMe',
            }
            break;
          case 'My Favorite':
            rootLink = {
              name: activeTree[value].name,
              link: 'fav',
            }
            break;
          case 'Work Campaign Base':
            rootLink = {
              name: activeTree[value].name,
              link: '',
            }
            break;

          default:
            rootLink = ''
            break;
        }
      }
    })
    return rootLink
  }

  changeActiveTree(treeItem: any) {
    let activeCampaign = JSON.parse(localStorage.getItem('activeCampaign') || '{}')
    if (treeItem.level === 30) {
      activeCampaign = {}
    }
    const campaignItem = {
      name: treeItem.name,
      level: treeItem.level,
      id: treeItem.id
    }
    activeCampaign['level_' + treeItem.level] = campaignItem
    localStorage.setItem('activeCampaign', JSON.stringify(activeCampaign));

    if(treeItem.level === 30)
    localStorage.setItem('currentActiveFolder', JSON.stringify(treeItem.name))

  }

  treeMapping(resetTree: boolean, treeData: any, childOnly: boolean = false) {
    if (resetTree) {
      this.resetTree();
    }
    treeData.forEach((data: any, index: any) => {
      if (data.campaignId > 104 && !childOnly) {
        this.addTree({
          ...data,
          addButton: true,
          children: []
        });
      } else if (childOnly) {
        this.addTree({ ...data });
      } else {
        this.addTree({
          ...data,
          children: []
        });
      }
    });

    const activeCampaign = treeData.filter((data: any) => {
      return data.campaignId === this?.activeCampaign().id
    })
    if (!this.activeCampaign().id || activeCampaign.length <= 0) {
      this.changeActiveTree(this.tree.value[0])
    }
  }

  get activeCampaign() {
    if (localStorage.getItem('activeCampaign')) {
      const data = JSON.parse(localStorage.getItem('activeCampaign') || '{}');
      // const data = JSON.parse('{}');
      return data;
      
    } else {
      return ''
    }
  }

  resetTree() {
    this.tree.next([])
  }


}
