import { IBrands, IOrderService } from '@/src/interface/datas'
import { gravarArquivoJSON, lerArquivoJSON } from '@/src/service/save'
import type { NextApiRequest, NextApiResponse } from 'next'

const fileName = './src/data/service-order.json'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req


    if (method === 'POST') {
        const { number, client, dicountValue, additionalValue, prescription, products, dateRegister, hourRegister, payment } = req.body


        const status: 'OPENED' | 'CLOSED' | 'CANCELED' = 'OPENED'

        try {
            const dados: IOrderService[] = await lerArquivoJSON(fileName)
            const _id = (dados.length + 1)
            const data = { _id, number, client, dicountValue, additionalValue, prescription, products, dateRegister, hourRegister, payment, status }
            dados.push(data)
            await gravarArquivoJSON(dados, fileName)
            res.json(data)
        } catch (error) {
            console.log("Error ao Salvar Dados")
            const _id = 1
            const data: IOrderService = { _id, number, client, dicountValue, additionalValue, prescription, products, dateRegister, hourRegister, payment, status }
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
        const { number, client, dicountValue, additionalValue, prescription, products, dateRegister, hourRegister, payment, status, id } = req.body

        const data: IOrderService[] = await lerArquivoJSON(fileName)
        !!data && data.map((item) => {
            if (item._id == id) {
                item.number = number
                item.client = client
                item.dicountValue = dicountValue
                item.additionalValue = additionalValue
                item.prescription = prescription
                item.products = products
                item.dateRegister = dateRegister
                item.hourRegister = hourRegister
                item.payment = payment
                item.status = status
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