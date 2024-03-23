export interface ICommissionForm {
    commissionFormID: number|0,
    commissionID: number|0,
    receiverID: string|number,
    requestorID: string|number,
    description: string|""
    accept: boolean|null,
    progress: 0,
}

export interface ICommissionID {
    commissionID: string|number,
   
}