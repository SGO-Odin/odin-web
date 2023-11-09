export interface IBrands {
    id?: number
    name: string
    createdOn?: string
    updatedOn?: string
    isActive?: boolean
}

export interface ICreateBrandsReq {
    name: string
}

export interface IUpdateBrandsReq {
    id: number
    name: string
}