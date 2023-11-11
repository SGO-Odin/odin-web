import { brandsUseCases } from '@/src/server/use-cases/brand'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    try {
        const { method } = req
        if (method === 'POST') {
            const response = await brandsUseCases.createBrands(req.body)
            return res.status(201).json({ message: "ok", data: response })
        }

        if (method === 'GET') {
            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await brandsUseCases.getById(id)
                return res.status(200).json({ response })

            } else {
                const response = await brandsUseCases.getAllBrands()
                return res.status(200).json({ response })

            }

        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await brandsUseCases.inactivateById(id)
                return res.status(response)
            }
        }

        if (method === 'PUT') {
            const response = await brandsUseCases.updateBrand(req.body)
            return res.status(200).json({ response })

        }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}