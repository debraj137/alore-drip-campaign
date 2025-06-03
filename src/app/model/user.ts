import { SharePermissionEnum } from "./enum/share-permission-enum";

export interface IUserList {
    id: number;
    userId: string;
    companyId: string;
    createdDate: number;
    updatedDate: number;
    emailId ?: string;
    deleted: number;
    firstName: string;
    lastName: string;
    userName: string;
    userEmailId: string;
    companyName: string;
    userPhoto: string;
    companyDomain: string;
    blocked: number;
    sourceId?: any;
    designation: string;
    phone: string;
    address: string;
    prospectStatus: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    verified: number;
    verifyDate?: any;
    isUserSelected?: boolean;
    sharedWithMeList: any[];
    sharedEmailWithMeList: any[];
    primaryEmail ?: string;
}

export interface IShareCampaignPayload{
    sharedWithId: string;
    role: SharePermissionEnum
}

export interface IUpdateUserPermissionPayload{
    sharedWithId: string;
    role: SharePermissionEnum
}

export interface IRemoveUserPayload{
    userId: string;
    campaignId: string;
}

export interface IInviteduser {
    userId ?: string;
    companyId ?: string;
    permissionId ?: string;
    role : string;
    campaignId ?: string;
    firstName ?: string;
    lastName ?: any;
    emailId: string;
    isUserSelected ?: boolean;
}
export class UserAccount {
  userId: string | undefined;
  companyId: string | undefined;
}

export interface allUserIntregation {
    accessToken: string;
    campaignId: string;
    companyId: string;
    emailId: string;
    id: string;
    provider: string;
    userId: string;
    userName: string;
}