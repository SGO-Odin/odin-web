import axios from "axios"
import { IClient, ICreateClientReq } from "../entities/client"
import type { NextApiRequest } from 'next'

const createClient = async (data: IClient, request: NextApiRequest): Promise<number> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/client`, data, { headers: { Authorization: request.headers.authorization } })

    const status: number = response.status
    return status
}

const getAllClients = async (request: NextApiRequest): Promise<IClient[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/client`, { headers: { Authorization: request.headers.authorization } })
    const client: IClient[] = response.data

    return client
}

const getById = async (id: number, request: NextApiRequest): Promise<IClient> => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/client/${id}`, { headers: { Authorization: request.headers.authorization } })
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