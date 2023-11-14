import axios from "axios"
import { IBrands } from "../entities/brand"
import { IncomingHttpHeaders } from "http"
import { NextApiRequest } from "next"

const createBrands = async (req: NextApiRequest): Promise<number> => {

    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand`, req.body, { headers: req.headers })
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

// const activateById = async (id: number, header: IncomingHttpHeaders): Promise<number> => {
//     const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand/${id}/activate`, { headers: header })
//     const status: number = response.status
//     return status
// }

const inactivateById = async (req: NextApiRequest): Promise<number> => {

    const { id } = req.query

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand/${id}/inactivate`, null, { headers: req.headers })

    return response.status
}

const updateBrand = async (req: NextApiRequest): Promise<number> => {
    const { id, name } = req.body

    const brands: IBrands = {
        name: name
    }

    const response = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/brand/${id}`, brands, { headers: req.headers })

    return response.status
}

export const brandsUseCases = {
    createBrands,
    getAllBrands,
    getById,
    inactivateById,
    // activateById,
    updateBrand
}