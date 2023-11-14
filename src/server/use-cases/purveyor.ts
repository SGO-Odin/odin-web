import axios from "axios"
import { ICreatePurveyorReq, IPurveyor } from "../entities/purveyor"
import { NextApiRequest } from "next"

const createPurveyor = async (data: ICreatePurveyorReq, req: NextApiRequest): Promise<IPurveyor> => {

    const purveyor: ICreatePurveyorReq = {
        'tradingName': data.tradingName,
        'companyName': data.companyName,
        "isLaboratory": data.isLaboratory,
        'address': data.address,
        'emails': data.emails,
        'phones': data.phones
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/purveyor`, purveyor, { headers: { Authorization: req.headers.authorization } })

    return response.data
}

const getAllPurveyors = async (req: NextApiRequest): Promise<IPurveyor[]> => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/purveyor`, { headers: req.headers })

    const purveyor: IPurveyor[] = response.data

    return purveyor
}

const getById = async (id: number, req: NextApiRequest): Promise<IPurveyor> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/purveyor/${id}`, { headers: req.headers })
    const purveyor: IPurveyor = response.data
    return purveyor
}

const inactivateById = async (id: number, req: NextApiRequest): Promise<number> => {

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/purveyor/${id}/inactivate`, null, { headers: req.headers })
    const status: number = response.status
    return status
}

export const purveyorUseCases = {
    createPurveyor,
    getAllPurveyors,
    getById,
    inactivateById
}