export interface OrderHeader {
    orderID: string | number
    accountID: string | number
    confirmation: boolean | false
}

export interface OrderDetails {
    orderDetailID: string | number
    orderID: string | number
    artWorkID: string | number
    dateOfPurchase: Date | string
    price: number
    purchaseConfirmationImage: string
}
