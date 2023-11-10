import axios from "axios"
import { ICreateProductReq, IProduct } from "../entities/product"

const createProduct = async (request: ICreateProductReq): Promise<number> => {

    const product: ICreateProductReq = {
        reference: request.reference,
        name: request.name,
        unitType: request.unitType,
        brand: request.brand,
        purveyor: request.purveyor,
        isActive: request.isActive,
        inventoryControl: request.inventoryControl,
        purchaseCost: request.purchaseCost,
        currentSalePrice: request.currentSalePrice,
        currentStock: request.currentStock,
        minStock: request.minStock,
        location: request.location,
    }

    console.log("PRODUCT")
    console.log(product)
    const response = await axios.post(`${process.env.DOMAIN_BACKEND}api/product`, product)

    const status: number = response.status
    return status
}

const getAllProducts = async (): Promise<IProduct[]> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/product`)
    const product: IProduct[] = response.data

    return product
}

const getById = async (id: number): Promise<IProduct> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/client/${id}`)
    const client: IProduct = response.data
    return client
}

const removeById = () => { }

export const productUseCases = {
    createProduct,
    getAllProducts,
    getById,
    removeById
}