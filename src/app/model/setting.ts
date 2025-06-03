export interface IBlockedItem {
    blockType: number
    blockedBy: string
    blockedDate: string
    blocklistId: any
    campaignId: string
    companyId: any
    createdDate: string
    deleted: number
    domainName: string
    emailId: any
    id: number
    isBlocked: number
    updatedDate: string
    userId: null
}

export interface IreportItem{
    id: number;
    userId?: any;
    companyId?: any;
    createdDate: number;
    updatedDate: number;
    deleted: number;
    reportId: string;
    reportType: number;
    campaignId: string;
    recipientEmailId: string;
    day: string;
    time: string;
}
export interface IcsvFileDetail{
  id: number,
  userId?: string;
  companyId?: string;
  createdDate: number;
  updatedDate: number;
  deleted: number;
  csvUploadDataId: string,
  filePath: string,
  fileName: string,
  extension: string,
  campaignId: string
}
