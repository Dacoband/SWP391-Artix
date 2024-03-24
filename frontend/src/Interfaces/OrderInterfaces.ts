export interface OrderHeader {
    orderID: string | undefined
    creatorID: string | undefined
    confirmation: boolean | false
}

export interface OrderDetails {
    orderDetailID: string
    orderID: string
    artWorkID: string | undefined
    dateOfPurchase: Date | string | undefined
    price: number | undefined
    purchaseConfirmationImage: string | null
}

export interface OrderDetailsExtended {
    orderDetailID: string
    orderID: string
    artWorkID: string | undefined
    dateOfPurchase: Date | string | undefined
    price: number | undefined
    purchaseConfirmationImage: string | null
    creatorUsername: string,
    creatorFirstName: string,
    artworkName: string,
}
