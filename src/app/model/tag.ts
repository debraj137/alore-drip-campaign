export interface ITagItem {
    Prospects: any[]
    prospects: any[]
    campaigns: any[]
    userId: any
    companyId: any
    borderColor: string
    createdDate: string
    deleted: number
    id: number
    name: string
    sequence: number
    tagId: string
    textColor: string
    updatedDate: string
}


export interface IAddTagPayload {
    userId: string
    tagId : string
    name: string
    borderColor: string
    textColor: string
}

export interface ICampaignTagData {
    tagId: string;
    name: string;
    borderColor?: string;
    textColor: string;
    sequence?: number;
    tagType : number
}