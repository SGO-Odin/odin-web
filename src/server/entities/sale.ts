import { IProductCommon } from "./commons"

export interface ISale {
    id?: number
    clientId: number,
    serviceOrderId: number,
    saleProducts: IProductCommon[],
    salePayments: IPayments[]
}

export interface IPayments {
    payment: IPaymentSale
}

export interface IPaymentSale {
    type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX'
    amount: number
    quantityInstallments: string
}

export interface ICreateSaleReq {
    clientId: number,
    serviceOrderId: number,
    saleProducts: IProductCommon[],
    salePayments: IPayments[]
}