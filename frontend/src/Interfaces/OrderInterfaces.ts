export interface OrderHeader {
    orderID: string
    sellerID: string | undefined
    buyerID:string | undefined
    confirmation: boolean | false
}

export interface OrderHeaderExtended {
    orderID: string | undefined
    sellerID: string | undefined
    buyerID:string | undefined
    confirmation: boolean | false
    accountID:string
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
    buyerName: string,
    sellerName: string,
    artworkName: string,
}
