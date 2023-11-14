import { authenticatedUseCases } from '@/src/server/use-cases/authenticated'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    try {
        const { method } = req
        if (method === 'POST') {
            const response = await authenticatedUseCases.authenticated(req)
            return res.status(200).json({ message: "ok", data: response })
        }

        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}