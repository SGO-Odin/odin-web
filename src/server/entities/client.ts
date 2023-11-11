import { IAddress, IPhones } from "./commons"

export interface IClient {
    id?: number
    firstName: string,
    lastName: string,
    cpf: string,
    rg: string,
    address: IAddress,
    emails?: string[],
    phones: IPhones[]
}
export interface ICreateClientReq {
    firstName: string,
    lastName: string,
    cpf: string,
    rg: string,
    address: IAddress,
    emails?: string[],
    phones: IPhones[]
}