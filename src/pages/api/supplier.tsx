import { ISupplier } from '@/src/interface/datas'
import { gravarArquivoJSON, lerArquivoJSON } from '@/src/service/save'
import type { NextApiRequest, NextApiResponse } from 'next'

const fileName = './src/data/supplier.json'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req


    if (method === 'POST') {
        const { companyName, businessName, isLaboratory, zipCode, address, district, numberAddress, complement, city } = req.body

        try {
            const dados: ISupplier[] = await lerArquivoJSON(fileName)
            const _id = (dados.length + 1)
            const data = { _id, companyName, businessName, isLaboratory, zipCode, address, district, numberAddress, complement, city }
            dados.push(data)
            await gravarArquivoJSON(dados, fileName)
            res.json(data)
        } catch (error) {
            console.log("Error ao Salvar Dados")
            const _id = 1
            const data = { _id, companyName, businessName, isLaboratory, zipCode, address, district, numberAddress, complement, city }
            await gravarArquivoJSON([data], fileName)
            res.json(data)
        }
    }

    if (method === 'GET') {

        if (req.query?.id) {
            const data: ISupplier[] = await lerArquivoJSON(fileName)
            const supplier: ISupplier = data.find((item) => item._id == Number(req.query?.id))
            res.json(supplier)
        } else {
            res.json(await lerArquivoJSON(fileName))
        }

    }

    if (method === 'PUT') {
        const { companyName, businessName, isLaboratory, zipCode, address, district, numberAddress, complement, city, id } = req.body

        const data: ISupplier[] = await lerArquivoJSON(fileName)
        data.map((item) => {
            if (item._id == id) {
                item.companyName = companyName
                item.businessName = businessName
                item.isLaboratory = isLaboratory
                item.zipCode = zipCode
                item.address = address
                item.district = district
                item.numberAddress = numberAddress
                item.complement = complement
                item.city = city
            }
        })
        await gravarArquivoJSON(data, fileName)

        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            const data: ISupplier[] = await lerArquivoJSON(fileName)

            const supplier = data.filter(item => item._id !== Number(req.query?.id));

            await gravarArquivoJSON(supplier, fileName)
            res.json(true);
        }
    }
}