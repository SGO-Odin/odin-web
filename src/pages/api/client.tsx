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
            const { firsName, lastName, cpf, rg, email, sanitalizePhone, ddd, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city } = req.body

            const data: IClient = {
                "firstName": firsName,
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
                                "state": {
                                    "name": stateName,
                                    "acronym": acronym,
                                    "isFederalDistrict": isFederalDistrict
                                },
                                "genericZipCode": zipCode
                            }
                        },
                        "type": publicPlaceType
                    },
                    "number": number,
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

            if (process.env.PRODUTION_DOMAIN) {

                res.status(500).json({ message: "Method not allowed." })
            } else if (process.env.DEVELOPMENT_DOMAIN) {

                const response = await clientUseCases.createClient(data)
                return res.status(201).json({ message: "ok", data: response })
            }
        }

        if (method === 'GET') {

            if (req.query?.id) {
                const data: IClient[] = await lerArquivoJSON(fileName)
                const brand: IClient = data.find((item) => item.id == Number(req.query?.id))
                res.json(brand)
            } else {
                if (process.env.PRODUTION_DOMAIN) {

                    res.status(500).json({ message: "Method not allowed." })
                } else if (process.env.DEVELOPMENT_DOMAIN) {

                    const response = await clientUseCases.getAllClients()
                    return res.status(200).json({ response })

                }
            }

        }

        // if (method === 'PUT') {
        //     const { firsName, lastName, cpf, rg, email, whatsapp, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city, id } = req.body

        //     const data: IClient[] = await lerArquivoJSON(fileName)
        //     !!data && data.map((item) => {
        //         if (item._id == id) {
        //             item.firsName = firsName
        //             item.lastName = lastName
        //             item.cpf = cpf
        //             item.rg = rg
        //             item.email = email
        //             item.whatsapp = whatsapp
        //             item.zipCode = zipCode
        //             item.acronym = acronym
        //             item.stateName = stateName
        //             item.isFederalDistrict = isFederalDistrict
        //             item.publicPlaceName = publicPlaceName
        //             item.publicPlaceType = publicPlaceType
        //             item.district = district
        //             item.number = number
        //             item.complement = complement
        //             item.reference = reference
        //             item.city = city
        //         }
        //     })
        //     await gravarArquivoJSON(data, fileName)

        //     res.json(true)
        // }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const data: IClient[] = await lerArquivoJSON(fileName)

                const brand = data.filter(item => item.id !== Number(req.query?.id));

                await gravarArquivoJSON(brand, fileName)
                res.json(true);
            }
        }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}