import { IProduct } from '@/src/interface/datas'
import { gravarArquivoJSON, lerArquivoJSON } from '@/src/service/save'
import type { NextApiRequest, NextApiResponse } from 'next'

const fileName = './src/data/product.json'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req


    if (method === 'POST') {
        const { cost, selling, stockMin, stockCurrent, location, reference, nameProduct, unit, brands, supplier, isActive, isStockControl, isService }: IProduct = req.body

        try {
            const dados: IProduct[] = await lerArquivoJSON(fileName)
            const _id = (dados.length + 1)
            const data: IProduct = { _id, cost, selling, stockMin, stockCurrent, location, reference, nameProduct, unit, brands, supplier, isActive, isStockControl, isService }
            dados.push(data)
            await gravarArquivoJSON(dados, fileName)
            res.json(data)
        } catch (error) {
            console.log("Error ao Salvar Dados")
            const _id = 1
            const data: IProduct = { _id, cost, selling, stockMin, stockCurrent, location, reference, nameProduct, unit, brands, supplier, isActive, isStockControl, isService }
            await gravarArquivoJSON([data], fileName)
            res.json(data)
        }
    }

    if (method === 'GET') {

        if (req.query?.id) {
            const data: IProduct[] = await lerArquivoJSON(fileName)
            const brand: IProduct = data.find((item) => item._id == Number(req.query?.id))
            res.json(brand)
        } else {
            res.json(await lerArquivoJSON(fileName))
        }

    }

    if (method === 'PUT') {
        const { id, cost, selling, stockMin, stockCurrent, location, reference, nameProduct, unit, brands, supplier, isActive, isStockControl, isService } = req.body

        const data: IProduct[] = await lerArquivoJSON(fileName)
        !!data && data.map((item) => {
            if (item._id == id) {
                item.cost = cost
                item.selling = selling
                item.stockMin = stockMin
                item.stockCurrent = stockCurrent
                item.location = location
                item.reference = reference
                item.nameProduct = nameProduct
                item.unit = unit
                item.brands = brands
                item.supplier = supplier
                item.isActive = isActive
                item.isStockControl = isStockControl
                item.isService = isService
            }
        })
        await gravarArquivoJSON(data, fileName)

        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            const data: IProduct[] = await lerArquivoJSON(fileName)

            const brand = data.filter(item => item._id !== Number(req.query?.id));

            await gravarArquivoJSON(brand, fileName)
            res.json(true);
        }
    }
}