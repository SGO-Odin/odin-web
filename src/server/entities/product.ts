export interface IProduct {
    id?: number,
    name: string,
    reference: string,
    location: string,
    active: true,
    createdOn: string,
    updatedOn: string,
    toStockControl: boolean,
    purveyor: number,
    purchaseCost: number,
    currentSalePrice: number,
    currentStock: number,
    minStock: number,
    unit: 'PIECE' | 'PAIR' | 'KIT' | 'BOTTLE',
    brands: number
}

export interface ICreateProductReq {
    reference: string
    name: string
    unitType: 'PIECE' | 'PAIR' | 'KIT' | 'BOTTLE'
    brand: number
    purveyor: number
    isActive: boolean
    inventoryControl: boolean
    purchaseCost: number
    currentSalePrice: number
    currentStock: number
    minStock: number
    location: string
}