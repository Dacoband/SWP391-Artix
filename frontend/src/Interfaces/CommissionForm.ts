export interface ICommissionForm {
    commissionFormID: number|0,
    commissionID: number|0,
    receiverID: string|number,
    requestorID: string|number,
    description: string|""
    accept: boolean|null,
    progress: number|0,
}
export interface IExtraCommissionForm{
    commissionFormID: number|0,
    commissionID: number|0,
    receiverID: string|number,
    requestorID: string|number,
    description: string|""
    accept: boolean|null,
    progress: number|0,
    requestorEmail: string,
    requestorPhone: string,
    requestorUserName: string,
}

export interface ICommissionID {
    commissionID: string|number,
   
}