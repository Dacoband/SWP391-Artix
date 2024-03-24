export interface OrderHeader {
    orderID: string | undefined
    creatorID: string | undefined
    confirmation: boolean | false
}

export interface OrderDetails {
    orderDetailID: string | undefined
    orderID: string | undefined
    artWorkID: string | undefined
    dateOfPurchase: Date | string | undefined
    price: number | undefined
    purchaseConfirmationImage: string | undefined | null
}
