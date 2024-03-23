export interface GoogleUser {
  email: string,
  email_verified: boolean
  family_name: string
  given_name: string
  locale: string
  name: string
  picture: string
  sub: GLfloat
} // This is the Object google return for us, having all user infomation in their Gmail account

export interface Account {
  accountID:string,
  roleID:string,
  password:string,
  email:string,
  banAccount:boolean
}

export interface Creator {
  creatorID: string | "0",
  accountID: string | "0",
  paypalAccountID: string | number,
  userName: string | "",
  profilePicture: string | "",
  backgroundPicture: string | "",
  firstName: string | "",
  lastName: string | "",
  address: string | "",
  phone: string | "0",
  lastLogDate: string | undefined,
  allowCommission: boolean | false,
  biography: string | "",
  followCount: number | 0,
  email:string,
  vip:boolean
} // This is the Object Creator, having all the infomation.
