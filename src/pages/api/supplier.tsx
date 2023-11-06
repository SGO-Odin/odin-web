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
        const { companyName, tradingName, isLaboratory, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city } = req.body

        try {
            const dados: ISupplier[] = await lerArquivoJSON(fileName)
            const _id = (dados.length + 1)
            const data = { _id, companyName, tradingName, isLaboratory, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }
            dados.push(data)
            await gravarArquivoJSON(dados, fileName)
            res.json(data)
        } catch (error) {
            console.log("Error ao Salvar Dados")
            const _id = 1
            const data = { _id, companyName, tradingName, isLaboratory, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }
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
        const { companyName, tradingName, isLaboratory, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city, id } = req.body

        const data: ISupplier[] = await lerArquivoJSON(fileName)
        data.map((item) => {
            if (item._id == id) {
                item.companyName = companyName
                item.tradingName = tradingName
                item.isLaboratory = isLaboratory
                item.zipCode = zipCode
                item.acronym = acronym
                item.stateName = stateName
                item.isFederalDistrict = isFederalDistrict
                item.publicPlaceName = publicPlaceName
                item.publicPlaceType = publicPlaceType
                item.district = district
                item.number = number
                item.complement = complement
                item.reference = reference
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