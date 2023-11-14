import { ICreateProductReq } from '@/src/server/entities/product'
import { productUseCases } from '@/src/server/use-cases/product'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { method } = req


        if (method === 'POST') {
            const { cost, selling, stockMin, stockCurrent, location, reference, nameProduct, unit, brands, purveyor, isActive, isStockControl, isService } = req.body

            const data: ICreateProductReq = {
                'reference': reference,
                'name': nameProduct,
                'unitType': unit,
                'brand': brands,
                'purveyor': purveyor,
                'isActive': isActive,
                'inventoryControl': isStockControl,
                'purchaseCost': Number(cost.replace(/\D/g, '')),
                'currentSalePrice': Number(selling.replace(/\D/g, '')),
                'currentStock': Number(stockCurrent),
                'minStock': Number(stockMin),
                'location': location,
            }

            console.log(data)
            const response = await productUseCases.createProduct(data, req)
            return res.status(201).json({ message: "ok", data: response })

        }

        if (method === 'GET') {

            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await productUseCases.getById(id, req)
                return res.status(200).json({ response })
            } else {
                const response = await productUseCases.getAllProducts(req)
                return res.status(200).json({ response })
            }

        }

        if (method === 'PUT') {
            return res.status(503).json({ message: "Method not allowed." })
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await productUseCases.inactivateById(id, req)
                return res.status(204).json({ message: response })
            }
        }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}