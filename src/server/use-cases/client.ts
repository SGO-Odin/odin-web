import axios from "axios"
import { IClient, ICreateClientReq } from "../entities/client"

const createClient = async (request: ICreateClientReq): Promise<IClient> => {

    const client: IClient = {
        'firstName': request.firstName,
        'lastName': request.lastName,
        'cpf': request.cpf,
        'rg': request.rg,
        'address': request.address,
        'emails': request.emails,
        'phones': request.phones
    }

    const response = await axios.post(`${process.env.DEVELOPMENT_DOMAIN}api/client`, client)

    return response.data
}

const getAllClients = async (): Promise<IClient[]> => {
    const response = await axios.get(`${process.env.DEVELOPMENT_DOMAIN}api/client`)
    const brands: IClient[] = response.data

    return brands
}

const getById = () => { }

const removeById = () => { }

export const clientUseCases = {
    createClient,
    getAllClients,
    getById,
    removeById
}