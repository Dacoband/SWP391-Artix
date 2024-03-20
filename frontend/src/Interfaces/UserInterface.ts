export interface GoogleUser { 
    email:string,
    email_verified:boolean
    family_name:string
    given_name:string
    locale:string
    name:string
    picture:string
    sub:GLfloat
  } // This is the Object google return for us, having all user infomation in their Gmail account
  
  export interface Creator { 
  creatorID: string | "0",
  accountID: string | "0",
  paypalAccountID: number | "0",
  userName: string | "",
  profilePicture: string | "",
  backgroundPicture:string | "",
  firstName: string | "",
  lastName: string | "",
  address: string | "",
  phone: number | "0",
  lastLogDate: Date,
  allowCommission: boolean | false,
  biography: string |  ""
  } // This is the Object Creator, having all the infomation.
  