import { saleUseCases } from '@/src/server/use-cases/sale'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    try {
        const { method } = req
        if (method === 'POST') {
            const response = await saleUseCases.createSale(req.body)
            return res.status(201).json({ message: "ok", data: response })
        }

        if (method === 'GET') {
            const response = await saleUseCases.getAllSale()
            return res.status(200).json({ response })
        }

        if (method === 'DELETE') {
            return res.status(503).json({ message: "Method not allowed." })
        }

        if (method === 'PUT') {
            return res.status(503).json({ message: "Method not allowed." })
        }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}