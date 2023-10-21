import { IBrands } from '@/src/interface/datas'
import { gravarArquivoJSON, lerArquivoJSON } from '@/src/service/save'
import type { NextApiRequest, NextApiResponse } from 'next'

const fileName = './src/data/brands.json'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req


    if (method === 'POST') {
        const { brands, isActive } = req.body


        try {
            const dados: IBrands[] = await lerArquivoJSON(fileName)
            const _id = (dados.length + 1)
            const data = { _id, brands, isActive }
            dados.push(data)
            await gravarArquivoJSON(dados, fileName)
            res.json(data)
        } catch (error) {
            console.log("Error ao Salvar Dados")
            const _id = 1
            const data: IBrands = { _id, brands, isActive }
            await gravarArquivoJSON([data], fileName)
            res.json(data)
        }
    }

    if (method === 'GET') {

        if (req.query?.id) {
            const data: IBrands[] = await lerArquivoJSON(fileName)
            const brand: IBrands = data.find((item) => item._id == Number(req.query?.id))
            res.json(brand)
        } else {
            res.json(await lerArquivoJSON(fileName))
        }

    }

    if (method === 'PUT') {
        const { brands, isActive, id } = req.body

        const data: IBrands[] = await lerArquivoJSON(fileName)
        data.map((item) => {
            if (item._id == id) {
                item.brands = brands
                item.isActive = isActive
            }
        })
        await gravarArquivoJSON(data, fileName)

        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            const data: IBrands[] = await lerArquivoJSON(fileName)

            const brand = data.filter(item => item._id !== Number(req.query?.id));

            await gravarArquivoJSON(brand, fileName)
            res.json(true);
        }
    }
}