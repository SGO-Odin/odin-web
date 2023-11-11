import axios from "axios"
import { ICreatePurveyorReq, IPurveyor } from "../entities/purveyor"

const createPurveyor = async (request: ICreatePurveyorReq): Promise<IPurveyor> => {

    const purveyor: ICreatePurveyorReq = {
        'tradingName': request.tradingName,
        'companyName': request.companyName,
        "isLaboratory": request.isLaboratory,
        'address': request.address,
        'emails': request.emails,
        'phones': request.phones
    }

    const response = await axios.post(`${process.env.DOMAIN_BACKEND}api/purveyor`, purveyor)

    return response.data
}

const getAllPurveyors = async (): Promise<IPurveyor[]> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/purveyor`)
    const purveyor: IPurveyor[] = response.data

    return purveyor
}

const getById = async (id: number): Promise<IPurveyor> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/purveyor/${id}`)
    const purveyor: IPurveyor = response.data
    return purveyor
}

const inactivateById = async (id: number): Promise<number> => {

    const response = await axios.patch(`${process.env.DOMAIN_BACKEND}api/purveyor/${id}/inactivate`)
    const status: number = response.status
    return status
}

export const purveyorUseCases = {
    createPurveyor,
    getAllPurveyors,
    getById,
    inactivateById
}