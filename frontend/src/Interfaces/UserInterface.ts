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
  creatorID: number | 0,
  accountID: number | 0,
  paypalAccountID: number | 0,
  userName: string | "",
  profilePicture: string | "",
  backgroundPicture:string | "",
  firstName: string | "",
  lastName: string | "",
  address: string | "",
  phone: number | 0,
  lastLogDate: Date,
  allowCommission: boolean | false,
  biography: string |  "",
    followCount: number | 0,
  } // This is the Object Creator, having all the infomation.
  