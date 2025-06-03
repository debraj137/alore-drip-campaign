export interface IPageData {
    page: number;
    data: any
}

export interface IStepTempData {
    step1Data?: number;
    step2Data?: string;
    step3Data?: IPage3Data;
    step4Data?: number;
    step5Data?: any[];
    step6Data?: IPage6Data;
    step7Data?: any;
    step8Data?: any;
    step9Data?: any;
}

export interface IPage6Data {
    days: IDayData[],
    sameDay: boolean,
    sameDayData?: IDayData,
}

export interface IPage3Data {
    value?: number;
    limit?: number;
    templateData?: IEmailTemplateData[]
}

export interface IPage5Data {
    color: string;
    day: string;
    icon: string;
    index: number
    opentype: string
}

export interface IEmailTemplateData{
    addedcount: any
    backgroundColor: any
    body: string
    campaignId: any
    campaignstartflag: any
    companyId: string
    createdDate: number
    deleted: number
    emailpriorityflag: any
    filtertag: any
    firstmailsend: any
    id: number
    lastaddedtoqueuedatetime: any
    lastsentdate: any
    mailInterval: number
    noofdays: any
    personalizedEmailId: string
    sequence: number
    shareDetail: any
    subject: string
    textColor: any
    timestamp: any
    timezone: any
    total: any
    updatedDate: number
    userId: string
}

export interface IStepItem {
    title: string;
    desc: string;
    value: number;
    icon: string;
}

export interface IDayData {
  dayData : IPage5Data;
  startTime : string;
  endTime : string;
  recomendedTIme : string;
}

export interface myDaysWithTime{
    dayData : string;
  startTime : string;
  endTime : string;
}
