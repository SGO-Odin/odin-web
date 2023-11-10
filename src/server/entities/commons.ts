export interface IAddress {
    publicPlace: PublicPlace,
    number: number,
    genericZipCode: string,
    reference: string,
    complement: string
}

// export interface IState {
//     name: string,
//     acronym: string,
//     isFederalDistrict: boolean
// }

export interface ICity {
    name: string,
    stateAcronym: string,
}

export interface IDistrict {
    name: string,
    city: ICity
}

export interface PublicPlace {
    name: string,
    district: IDistrict,
    type: string
}

export interface IPhones {
    ddd: string,
    number: string,
    isMain: boolean
}