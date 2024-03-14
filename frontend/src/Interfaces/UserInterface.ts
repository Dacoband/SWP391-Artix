export interface GoogleUser { 
    email:string
    email_verified:boolean
    family_name:string
    given_name:string
    locale:string
    name:string
    picture:string
    sub:GLfloat
  } // This is the Object google return for us, having all user infomation in their Gmail account
  
  export interface Creator { 
  creatorID: number,
  accountID: number,
  paypalAccountID: number,
  userName: string,
  followerID: number,
  profilePicture: string,
  firstName: string,
  lastName: string,
  address: string,
  phone: number,
  lastLogDate: Date,
  allowCommission: boolean,
  biography: string
  } // This is the Object Creator, having all the infomation.
  