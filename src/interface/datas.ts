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