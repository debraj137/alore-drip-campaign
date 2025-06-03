import { ICampaignTagData } from "./tag";

export interface ICreateCampaign {
    emoji: string,
    campaignName: string,
    backgroundColor: string,
    tags: string[],
    campaignBaseId: any,
    parentType?:number,
}

export interface ICampaignItem {
    campaignName: string;
    status: string;
    sender: string;
    totalSent: number;
    openRate: number;
    replyState: number;
    bounceRate: number;
    createDate: Date;
    emailLastSent: Date;
    objective: string;
    campaignArea: string[];
    campaignId ?: string;
    tags: ICampaignTagData[];
}

export interface ICampaignBaseDetail {
    id: number;
    userId: string;
    companyId: string;
    createdDate: number;
    updatedDate: number;
    deleted: number;
    campaignBaseId: string;
    campaignBaseName: string;
    emoji: string;
    color: string;
}

export interface ICampaignBaseItem {
    campaignBase: ICampaignBaseDetail;
    campaignList: ICampaignItem[];
}

export interface ICampaignTabs{
    label: string;
    icon: string;
}
