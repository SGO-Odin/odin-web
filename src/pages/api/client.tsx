import { IClient } from '@/src/server/entities/client'
import { clientUseCases } from '@/src/server/use-cases/client'
import { gravarArquivoJSON, lerArquivoJSON } from '@/src/service/save'
import type { NextApiRequest, NextApiResponse } from 'next'

const fileName = './src/data/client.json'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { method } = req


        if (method === 'POST') {
            const { firstName, lastName, cpf, rg, email, sanitalizePhone, ddd, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city } = req.body

            const data: IClient = {
                "firstName": firstName,
                "lastName": lastName,
                "cpf": cpf,
                "rg": rg,
                "address": {
                    "publicPlace": {
                        "name": publicPlaceName,
                        "district": {
                            "name": district,
                            "city": {
                                "name": city,
                                "stateAcronym": acronym
                            }
                        },
                        "type": publicPlaceType
                    },
                    "number": Number(number),
                    "genericZipCode": zipCode,
                    "reference": reference,
                    "complement": complement
                },
                "emails": [email],
                "phones": [
                    {
                        "ddd": ddd,
                        "number": sanitalizePhone,
                        "isMain": false
                    }
                ]
            }

            const response = await clientUseCases.createClient(data, req)
            return res.status(201).json({ message: "ok", data: response })
        }

        if (method === 'GET') {

            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await clientUseCases.getById(id, req)
                return res.status(200).json({ response })
            } else {
                const response = await clientUseCases.getAllClients(req)
                return res.status(200).json({ response })
            }
        }

        // if (method === 'DELETE') {
        //     if (req.query?.id) {
        //         const id: number = Number(req.query?.id)

        //         const response = await clientUseCases.inactivateById(id)
        //         return res.status(response)

        //     }
        // }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ message: "Server Error." })
    }
}