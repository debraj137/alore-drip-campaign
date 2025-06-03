export class Interval{

    campaignId:string | undefined;
    scheduledDate: string | undefined;
    mailInterval : mailInterval[] = []; 

}
export class mailInterval{
    email1 : string | undefined;
    email2 : string | undefined;
    email3 : string | undefined;
    email4 : string | undefined;
    email5 : string | undefined;
    email6 : string | undefined;
    email7 : string | undefined;
    email8 : string | undefined;
    email9 : string | undefined;
    email10 : string | undefined;
}
export interface objectiveModel{
            "id": number,
            "userId": string,
            "companyId": string,
            "createdDate": string,
            "updatedDate": string,
            "deleted": number,
            "objectiveId": string,
            "type": number,
            "name": string
}

export interface objectivesSettingsDays {
    days: string;   
    index: number;
}
export interface objectSettingsLabels{
    label: string;   
    index: number;
    color: string;
}
export interface addlabel {
    labelId : string
    campaignId : string
    label : label[]
}
export interface label{
    labelColor : string
    labelName : string
    
    labelId : string
}
export interface settingDays{
    campaignId : string
    days : any[]
}