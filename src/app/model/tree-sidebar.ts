export interface campaignList {
  bounceRate: 0
  campaignId: string;
  campaignName: string;
  createdDate: any;
  lastSentDate: any;
  objectiveId: any;
  openRate: number;
  ownerId: any;
  percent: number;
  replyRate: number;
  senderId: any;
  status: number;
  tags: string[];
  totalMailSent: number;
  unsubscribeRate: number;
  templateId:number;
  childrens:any[];
}
export interface IHomeSideBar{
  name: string;
  data?: any;
  level: number;
  emoji?: string;
  loader ?: false;
  childrens: IHomeSideBar[];

}
export interface IBaseList{
  baseName: string,
  baseId : string,
  campaignList : any[],
  emoji: string
}

