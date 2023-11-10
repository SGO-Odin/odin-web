import axios from "axios"
import { IClient, ICreateClientReq } from "../entities/client"

const createClient = async (request: ICreateClientReq): Promise<number> => {

    const client: IClient = {
        'firstName': request.firstName,
        'lastName': request.lastName,
        'cpf': request.cpf,
        'rg': request.rg,
        'address': request.address,
        'emails': request.emails,
        'phones': request.phones
    }

    const response = await axios.post(`${process.env.DOMAIN_BACKEND}api/client`, client)

    const status: number = response.status
    return status
}

const getAllClients = async (): Promise<IClient[]> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/client`)
    const client: IClient[] = response.data

    return client
}

const getById = async (id: number): Promise<IClient> => {
    const response = await axios.get(`${process.env.DOMAIN_BACKEND}api/client/${id}`)
    const client: IClient = response.data
    return client
}

const removeById = () => { }

export const clientUseCases = {
    createClient,
    getAllClients,
    getById,
    removeById
}