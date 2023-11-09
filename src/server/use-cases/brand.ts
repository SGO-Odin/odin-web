import axios from "axios"
import { IBrands, ICreateBrandsReq, IUpdateBrandsReq } from "../entities/brand"

const createBrands = async (request: ICreateBrandsReq): Promise<IBrands> => {
    const brands: IBrands = {
        name: request.name
    }

    const response = await axios.post(`${process.env.DEVELOPMENT_DOMAIN}api/brand`, brands)

    return response.data
}

const getAllBrands = async (): Promise<IBrands[]> => {
    const response = await axios.get(`${process.env.DEVELOPMENT_DOMAIN}api/brand`)
    const brands: IBrands[] = response.data

    return brands
}

const getById = async (id: number): Promise<IBrands> => {
    const response = await axios.get(`${process.env.DEVELOPMENT_DOMAIN}api/brand/${id}`)
    const brand: IBrands = response.data
    return brand
}

const activateById = async (id: number): Promise<number> => {

    const response = await axios.patch(`${process.env.DEVELOPMENT_DOMAIN}api/brand/${id}/activate`)
    console.log("ATIVEI")
    console.log(response)
    const status: number = response.status
    return status
}

const inactivateById = async (id: number): Promise<number> => {

    const response = await axios.patch(`${process.env.DEVELOPMENT_DOMAIN}api/brand/${id}/inactivate`)
    const status: number = response.status
    return status
}

const updateBrand = async (request: IUpdateBrandsReq): Promise<number> => {
    const { id, name } = request

    const response = await axios.put(`${process.env.DEVELOPMENT_DOMAIN}api/brand/${id}`, { name })
    const status: number = response.status
    return status
}

export const brandsUseCases = {
    createBrands,
    getAllBrands,
    getById,
    inactivateById,
    activateById,
    updateBrand
}