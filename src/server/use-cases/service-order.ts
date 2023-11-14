import axios from "axios"
import { ICreateServiceOrderReq, ICreateServiceOrderRes, IServiceOrder } from "../entities/service-order"
import { NextApiRequest } from "next"

const createServiceOrder = async (data: ICreateServiceOrderReq, req: NextApiRequest): Promise<IServiceOrder> => {

    const serviceOrder: ICreateServiceOrderReq = {
        'client': data.client,
        'number': data.number,
        'discountValue': data.discountValue,
        'additionalValue': data.additionalValue,
        'products': data.products,
        'prescription': {
            'expirationDate': data.prescription.expirationDate,
            'additional': data.prescription.additional,
            'visionProblems': data.prescription.visionProblems
        },
        payments: data.payments
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/service-order`, serviceOrder, { headers: { Authorization: req.headers.authorization } })

    return response.data
}

const getAllServiceOrder = async (req: NextApiRequest, id?: number): Promise<ICreateServiceOrderRes[]> => {
    let response;

    if (id) {
        response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/service-order?clientId=${id}`, { headers: { Authorization: req.headers.authorization } })
    } else {
        response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/service-order`, { headers: { Authorization: req.headers.authorization } })
    }

    const serviceOrder: ICreateServiceOrderRes[] = response.data
    return serviceOrder

}

const getById = async (id: number, req: NextApiRequest): Promise<IServiceOrder> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/service-order/${id}`, { headers: { Authorization: req.headers.authorization } })
    const serviceOrder: IServiceOrder = response.data

    return serviceOrder
}

const inactivateById = async (id: number, req: NextApiRequest): Promise<number> => {

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/service-order/${id}/close`, null, { headers: { Authorization: req.headers.authorization } })
    const status: number = response.status
    return status
}

export const serviceOrderUseCases = {
    createServiceOrder,
    getAllServiceOrder,
    getById,
    inactivateById
}