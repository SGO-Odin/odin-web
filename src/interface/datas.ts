export interface IBrands {
    _id: number
    brands: string
    isActive: boolean
}

export interface ISupplier {
    _id: number
    companyName: string
    businessName: string
    isLaboratory: boolean
    zipCode: string
    address: string
    district: string
    numberAddress: string
    complement: string
    city: string
}

export interface IProduct {
    _id: number
    cost: string
    selling: string
    stockMin: string
    stockCurrent: string
    location: string
    reference: string
    nameProduct: string
    unit: string
    brands: number
    supplier: number
    isActive: boolean
    isStockControl: boolean
    isService: boolean
}