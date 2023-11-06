export interface IBrands {
    _id: number
    brands: string
    isActive: boolean
}

export interface ISupplier {
    _id: number
    companyName: string
    tradingName: string
    isLaboratory: boolean

    zipCode: string
    acronym: string
    stateName: string
    isFederalDistrict: boolean
    publicPlaceName: string
    publicPlaceType: string
    district: string
    number: string
    complement: string
    reference: string
    city: string
}

export interface IProduct {
    _id: number
    cost: string
    selling: string
    stockMin: string
    stockCurrent: string
    location: string
    reference: string
    nameProduct: string
    unit: string
    brands: number
    supplier: number
    isActive: boolean
    isStockControl: boolean
    isService: boolean
}

export interface IClient {
    _id: number
    firsName: string
    lastName: string
    cpf: string
    rg: string
    email: string
    whatsapp: string

    zipCode: string
    acronym: string
    stateName: string
    isFederalDistrict: boolean
    publicPlaceName: string
    publicPlaceType: string
    district: string
    number: string
    complement: string
    reference: string
    city: string
}

export interface IOrderService {
    _id?: number
    number: string;
    client: number;
    dicountValue: string;
    additionalValue: string;
    prescription: IPrescription[];
    status?: 'OPENED' | 'CLOSED' | 'CANCELED'
    products: IServiceOrderProducts[];
    dateRegister: string;
    hourRegister: string;
    payment: IPayment[];
}

export interface IPayment {
    _id: number
    type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null
    amount: string
    installments: string
    date: string
}

export interface IServiceOrderProducts {
    idProduct: number
    quantity: string
    salesPrice: string
}

export interface IPrescription {
    expirationDate: string
    additional: string
    problems: IVisionProblem[]
}

export interface IVisionProblem {
    type: 'FAR' | 'NEAR'
    positionOfEyes: 'RIGHT' | 'LEFT'
    spherical: string
    cylinder: string
    axis: string
    npd: string
    height: string
}

export interface IRowsProductTable {
    _id: number
    ref: string
    unidade: string
    produto: string
    quantidade: string
    valueUnit: string
    valueTot: string
}