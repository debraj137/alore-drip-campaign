
export interface IMailSequenceDetail {
  campaignSettingId: string;
  timeZone: string;
  dailyMails: number;
  dailyInterval: number;
  mondayStartTime: string;
  mondayEndTime: string;
  tuesdayStartTime: string;
  tuesdayEndTime: string;
  wednesdayStartTime: string;
  wednesdayEndTime: string;
  thursdayStartTime: string;
  thursdayEndTime: string;
  fridayStartTime: string;
  fridayEndTime: string;
  saturdayStartTime: string;
  saturdayEndTime: string;
  sundayStartTime: string;
  sundayEndTime: string;
  noOfProspect: number;
  timeSetting: any[];
  completionStatus: number;
  numberOfEmailSequence: number;
  dailyMailSent?: number
}

export interface IMailData {
  id: number;
  userId: string;
  companyId: string;
  createdDate: number;
  updatedDate: number;
  deleted: number;
  personalizedEmailId: string;
  subject: string;
  body: string;
  campaignId: string;
  campaignName: string;
  timestamp?: any;
  sequence: number;
  total?: any;
  mailInterval: number;
  timezone?: any;
  emailpriorityflag?: any;
  filtertag?: any;
  noofdays?: any;
  lastsentdate?: any;
  campaignstartflag?: any;
  firstmailsend?: any;
  addedcount?: any;
  lastaddedtoqueuedatetime?: any;
  textColor: string;
  backgroundColor: string;
  shareDetail?: any;
  expand?: boolean;
}
