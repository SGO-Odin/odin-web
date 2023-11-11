import { IProduct } from "./product"

export interface IServiceOrder {
    id?: number
    client: number,
    number: number,
    discountValue: number,
    additionalValue: number,
    products: IProductServiceOrder[],
    prescription: IPrescription
}

export interface ICreateServiceOrderReq {
    client: number,
    number: number,
    discountValue: number,
    additionalValue: number,
    products: IProductServiceOrder[],
    prescription: IPrescription
}

export interface IProductServiceOrder {
    productId: number,
    quantity: number
}

export interface IVisionProblems {
    type: 'NEAR' | 'FAR',
    positionOfEyes: 'LEFT' | 'RIGHT',
    spherical: number,
    cylinder: number,
    axis: number,
    npd: number,
    height: number
}

export interface IPrescription {
    id?: number,
    createdOn?: string,
    client?: number
    expirationDate: string,
    additional: number,
    visionProblems: IVisionProblems[]
}


export interface ICreateServiceOrderRes {
    id: number,
    client: number,
    discountValue: number,
    additionalValue: number,
    amountTotal: number,
    products: [
        {
            salePrice: number,
            quantity: number,
            product: IProduct
        }
    ],
    prescription: IPrescription,
    closedOn?: null,
    canceledOn?: null,
    createdOn?: string,
    updatedOn?: string,
    status: string
}