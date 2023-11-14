import axios from "axios"
import { ICreateProductReq, IProduct } from "../entities/product"
import { NextApiRequest } from "next"

const createProduct = async (data: ICreateProductReq, req: NextApiRequest) => {

    const product: ICreateProductReq = {
        reference: data.reference,
        name: data.name,
        unitType: data.unitType,
        brand: data.brand,
        purveyor: data.purveyor,
        isActive: data.isActive,
        inventoryControl: data.inventoryControl,
        purchaseCost: data.purchaseCost,
        currentSalePrice: data.currentSalePrice,
        currentStock: data.currentStock,
        minStock: data.minStock,
        location: data.location,
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/product`, product, { headers: { Authorization: req.headers.authorization } })

    const status: number = response.status
    return status
}

const getAllProducts = async (req: NextApiRequest): Promise<IProduct[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/product`, { headers: { Authorization: req.headers.authorization } })
    const product: IProduct[] = response.data

    return product
}

const getById = async (id: number, req: NextApiRequest): Promise<IProduct> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/product/${id}`, { headers: { Authorization: req.headers.authorization } })
    const client: IProduct = response.data
    return client
}

const inactivateById = async (id: number, req: NextApiRequest): Promise<number> => {

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/product/${id}/inactivate`, null, { headers: { Authorization: req.headers.authorization } })
    const status: number = response.status
    return status
}

export const productUseCases = {
    createProduct,
    getAllProducts,
    getById,
    inactivateById
}