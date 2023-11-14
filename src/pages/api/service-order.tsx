import { ICreateServiceOrderReq } from '@/src/server/entities/service-order'
import { serviceOrderUseCases } from '@/src/server/use-cases/service-order'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { method } = req


        if (method === 'POST') {

            const response = await serviceOrderUseCases.createServiceOrder(req.body, req)
            return res.status(201).json({ message: "ok", data: response })

        }

        if (method === 'GET') {

            if (req.query?.id) {
                const { id, client } = req.query

                if (client) {
                    const response = await serviceOrderUseCases.getAllServiceOrder(req, Number(id))
                    return res.status(200).json({ response })
                } else {
                    const response = await serviceOrderUseCases.getById(Number(id), req)
                    return res.status(200).json({ response })
                }
            } else {
                const response = await serviceOrderUseCases.getAllServiceOrder(req)
                return res.status(200).json({ response })
            }

        }

        if (method === 'PUT') {
            return res.status(503).json({ message: "Method not allowed." })
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await serviceOrderUseCases.inactivateById(id, req)
                return res.status(204).json({ message: response })
            }
        }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}