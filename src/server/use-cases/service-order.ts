import axios from "axios"
import { ICreateServiceOrderReq, ICreateServiceOrderRes, IServiceOrder } from "../entities/service-order"

const createServiceOrder = async (request: ICreateServiceOrderReq): Promise<IServiceOrder> => {

    const serviceOrder: ICreateServiceOrderReq = {
        'client': request.client,
        'number': request.number,
        'discountValue': request.discountValue,
        'additionalValue': request.additionalValue,
        'products': request.products,
        'prescription': {
            'expirationDate': request.prescription.expirationDate,
            'additional': request.prescription.additional,
            'visionProblems': request.prescription.visionProblems
        }
    }

    const response = await axios.post(`${process.env.DOMAIN_BACKEND}api/service-order`, serviceOrder)

    return response.data
}

const getAllServiceOrder = async (id?: number): Promise<ICreateServiceOrderRes[]> => {
    let response;

    if (id) {
        response = await axios.get(`${process.env.DOMAIN_BACKEND}api/service-order?clientId=${id}`)
    } else {
        response = await axios.get(`${process.env.DOMAIN_BACKEND}api/service-order`)
    }

    const serviceOrder: ICreateServiceOrderRes[] = response.data
    return serviceOrder

}

const getById = async (id: number): Promise<IServiceOrder> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/service-order/${id}`)
    const serviceOrder: IServiceOrder = response.data

    return serviceOrder
}

// const removeById = () => { }

export const serviceOrderUseCases = {
    createServiceOrder,
    getAllServiceOrder,
    getById,
    // removeById
}