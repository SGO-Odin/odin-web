import { IClient } from '@/src/interface/datas'
import { gravarArquivoJSON, lerArquivoJSON } from '@/src/service/save'
import type { NextApiRequest, NextApiResponse } from 'next'

const fileName = './src/data/client.json'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req


    if (method === 'POST') {
        const { firsName, lastName, cpf, rg, email, whatsapp, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city } = req.body


        try {

            const dados: IClient[] = await lerArquivoJSON(fileName)
            const _id = (dados.length + 1)
            const data = { _id, firsName, lastName, cpf, rg, email, whatsapp, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }
            dados.push(data)
            await gravarArquivoJSON(dados, fileName)

            res.json(data)
        } catch (error) {

            console.log("Error... Irei tentar novamente sua anta!")
            const _id = 1
            const data: IClient = { _id, firsName, lastName, cpf, rg, email, whatsapp, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }
            await gravarArquivoJSON([data], fileName)

            res.json(data)
        } finally {
            console.log("Error ao Salvar Dados")
        }
    }

    if (method === 'GET') {

        if (req.query?.id) {
            const data: IClient[] = await lerArquivoJSON(fileName)
            const brand: IClient = data.find((item) => item._id == Number(req.query?.id))
            res.json(brand)
        } else {
            res.json(await lerArquivoJSON(fileName))
        }

    }

    if (method === 'PUT') {
        const { firsName, lastName, cpf, rg, email, whatsapp, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city, id } = req.body

        const data: IClient[] = await lerArquivoJSON(fileName)
        data.map((item) => {
            if (item._id == id) {
                item.firsName = firsName
                item.lastName = lastName
                item.cpf = cpf
                item.rg = rg
                item.email = email
                item.whatsapp = whatsapp
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
            const data: IClient[] = await lerArquivoJSON(fileName)

            const brand = data.filter(item => item._id !== Number(req.query?.id));

            await gravarArquivoJSON(brand, fileName)
            res.json(true);
        }
    }
}