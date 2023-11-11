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
            const { number, client, discountValue, additionalValue, prescription, products } = req.body

            const data: ICreateServiceOrderReq = {
                'client': client,
                'number': number,
                'discountValue': discountValue,
                'additionalValue': additionalValue,
                'products': products,
                'prescription': prescription
            }

            const response = await serviceOrderUseCases.createServiceOrder(data)
            return res.status(201).json({ message: "ok", data: response })

        }

        if (method === 'GET') {

            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await serviceOrderUseCases.getAllServiceOrder(id)
                return res.status(200).json({ response })
            } else {
                const response = await serviceOrderUseCases.getAllServiceOrder()
                return res.status(200).json({ response })
            }

        }

        if (method === 'PUT') {
            return res.status(503).json({ message: "Method not allowed." })
        }

        if (method === 'DELETE') {
            return res.status(503).json({ message: "Method not allowed." })
        }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}