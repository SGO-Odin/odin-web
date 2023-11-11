import axios from "axios"
import { ICreateSaleReq, ISale } from "../entities/sale"

const createSale = async (request: ICreateSaleReq): Promise<number> => {
    const sale: ICreateSaleReq = {
        clientId: request.clientId,
        serviceOrderId: request.serviceOrderId,
        saleProducts: request.saleProducts,
        salePayments: request.salePayments
    }

    const response = await axios.post(`${process.env.DOMAIN_BACKEND}api/sale`, sale)

    return response.status
}

const getAllSale = async (): Promise<ISale[]> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/sale?page=0&size=1&sort=string`)
    const sale: ISale[] = response.data

    return sale
}

export const saleUseCases = {
    createSale,
    getAllSale
}