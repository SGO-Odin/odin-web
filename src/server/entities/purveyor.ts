import { IAddress, IPhones } from "./commons"

export interface IPurveyor {
    id?: number
    tradingName: string,
    companyName: string,
    laboratory: boolean,
    address: IAddress,
    emails?: string[],
    phones: IPhones[]
}

export interface ICreatePurveyorReq {
    tradingName: string,
    companyName: string,
    isLaboratory: boolean,
    address: IAddress,
    emails?: string[],
    phones: IPhones[]
}