import { ICreatePurveyorReq, IPurveyor } from '@/src/server/entities/purveyor'
import { purveyorUseCases } from '@/src/server/use-cases/purveyor'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { method } = req


        if (method === 'POST') {
            const { companyName, tradingName, isLaboratory, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city } = req.body

            const data: ICreatePurveyorReq = {
                "tradingName": tradingName,
                "companyName": companyName,
                "isLaboratory": isLaboratory,
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
                    "number": number,
                    "genericZipCode": zipCode,
                    "reference": reference,
                    "complement": complement
                },
                "emails": [],
                "phones": [
                    {
                        "ddd": "00",
                        "number": "900000000",
                        "isMain": false
                    }
                ]
            }

            const response = await purveyorUseCases.createPurveyor(data)
            return res.status(201).json({ message: "ok", data: response })

        }

        if (method === 'GET') {

            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await purveyorUseCases.getById(id)
                return res.status(200).json({ response })
            } else {
                const response = await purveyorUseCases.getAllPurveyors()
                return res.status(200).json({ response })
            }

        }

        if (method === 'PUT') {
            return res.status(503).json({ message: "Method not allowed." })
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const id: number = Number(req.query?.id)

                const response = await purveyorUseCases.inactivateById(id)
                return res.status(response)
            }
        }
        return res.status(503).json({ message: "Method not allowed." })
    } catch (e: any) {
        return res.status(500).json({ message: "Server Error." })
    }
}