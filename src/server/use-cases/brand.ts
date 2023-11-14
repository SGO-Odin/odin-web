import axios from "axios"
import { IBrands, IUpdateBrandsReq } from "../entities/brand"
import { IncomingHttpHeaders } from "http"
import { NextApiRequest } from "next"

const createBrands = async (req: NextApiRequest): Promise<number> => {
    const brands: IBrands = {
        name: req.body
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand`, brands, { headers: req.headers })

    return response.status
}

const getAllBrands = async (header: IncomingHttpHeaders): Promise<IBrands[]> => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand`, { headers: header })
    const brands: IBrands[] = response.data

    return brands
}

const getById = async (id: number, header: IncomingHttpHeaders): Promise<IBrands> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand/${id}`, { headers: header })
    const brand: IBrands = response.data
    return brand
}

const activateById = async (id: number, header: IncomingHttpHeaders): Promise<number> => {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand/${id}/activate`, { headers: header })
    const status: number = response.status
    return status
}

const inactivateById = async (id: number, header: IncomingHttpHeaders): Promise<number> => {

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand/${id}/inactivate`, { headers: header })
    const status: number = response.status
    return status
}

const updateBrand = async (request: IUpdateBrandsReq, header: IncomingHttpHeaders): Promise<number> => {
    const { id, name } = request

    const response = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand/${id}`, { headers: { 'Authorization': header.authorization }, data: name })
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