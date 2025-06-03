export interface IEmailEditorToolbox {
    paragraph : string[]
    text : string[]
    aligment : string[]
    bullet : string[]
    attachment : string[]
    others : string[]
}

export interface IEmailEditorToolboxItem {
    icon : string;
    action : string;
}

export interface IAtttachmentData {
    file : string;
    fileName : string;
    fileFormat : string;
}


export interface ICreateLink {
    url : string;
    text : string;
}
export interface ISpamScore {
  Score: number;
  Details:ISpamScoreDetail;
}
export interface ISpamScoreDetail {
  isContentSpam:string;
  langMatch:string;
  countryMatch:string;
  numberOfSpamWords:number;
  spamWords:string[];
  ipblocked:string;
  contentTooShort:string
}
