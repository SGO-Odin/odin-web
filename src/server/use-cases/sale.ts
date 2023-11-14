import axios from "axios"
import { ICreateSaleReq, ISale } from "../entities/sale"
import { NextApiRequest } from "next"

const createSale = async (data: ICreateSaleReq, req: NextApiRequest): Promise<number> => {
    const sale: ICreateSaleReq = {
        clientId: data.clientId,
        serviceOrderId: data.serviceOrderId,
        saleProducts: data.saleProducts,
        salePayments: data.salePayments
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/sale`, sale, { headers: { Authorization: req.headers.authorization } })

    return response.status
}

const getAllSale = async (req: NextApiRequest): Promise<ISale[]> => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/sale`, { headers: { Authorization: req.headers.authorization } })
    const sale: ISale[] = response.data

    return sale
}

export const saleUseCases = {
    createSale,
    getAllSale
}