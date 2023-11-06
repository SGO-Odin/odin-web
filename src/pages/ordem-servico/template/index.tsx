import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './serviceOrderFormTemplate.scss'
import LayoutDefault from '@/src/components/layoutDefault';
import { Hero } from '@/src/components/hero';
import { HeroSecundary } from '@/src/components/commons/hero-secundary';
import { TextField } from '@/src/components/textField';
import { Select } from '@/src/components/select';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { MdBuild, MdCancel, MdDelete, MdOutlineEdit, MdPayments } from 'react-icons/md';
import { ButtonsPrimary } from '@/src/components/buttons/primary';
import { ButtonsSecundary } from "@/src/components/buttons/secundary";
import CardTotal from "@/src/components/commons/card-total";
import TablePayment from "@/src/components/commons/table-payment";
import Prescription from "@/src/components/commons/prescription";
import { IClient, IPayment, IPrescription, IProduct, IServiceOrderProducts } from '@/src/interface/datas';
import axios from 'axios';
import { formatNumberWhatsapp } from '@/src/hook/format-number-whatsapp';
import { formatCPF } from '@/src/hook/format-cpf';
import { numberValidation } from '@/src/hook/validation-number';
import Head from '@/src/components/table/head';
import RowItem from '@/src/components/table/body/rowItem';
import { handleFormatNumber } from '@/src/hook/format-number';
import { v4 as uuid } from "uuid";
import { handlePercent } from '@/src/hook/percent';
import { IItemSelect, IPaymentFormTemplate } from '@/src/interface/utils';
import typeCard from '@/src/data/typeCard.json'


interface IRowsProductTable {
    _id: number
    ref: string
    unidade: string
    produto: string
    quantidade: string
    valueUnit: string
    valueTot: string
}

type IListPaymentType = typeof typeCard[0]

interface IServiceOrderFormTemplate {
    isButton: string
    setIsButton: Dispatch<SetStateAction<string>>

    numberOS: string
    setNumberOS: Dispatch<SetStateAction<string>>
    dateRegister: string
    setDateRegister: Dispatch<SetStateAction<string>>
    hourRegister: string
    setHourRegister: Dispatch<SetStateAction<string>>
    client: number
    setClient: Dispatch<SetStateAction<number>>

    idProduct: number
    setIdProduct: Dispatch<SetStateAction<number>>
    quantity: string
    setQuantity: Dispatch<SetStateAction<string>>
    coast: string
    setCoast: Dispatch<SetStateAction<string>>

    dataProduct: IRowsProductTable[]
    setDataProduct: Dispatch<SetStateAction<IRowsProductTable[]>>
    serviceOrderProducts: IServiceOrderProducts[]
    setServiceOrderProducts: Dispatch<SetStateAction<IServiceOrderProducts[]>>

    percentDiscount: string
    setPercentDiscount: Dispatch<SetStateAction<string>>
    discount: string
    setDiscount: Dispatch<SetStateAction<string>>
    percentAdditional: string
    setPercentAdditional: Dispatch<SetStateAction<string>>
    additional: string
    setAdditional: Dispatch<SetStateAction<string>>
    valueTotal: string
    setValueTotal: Dispatch<SetStateAction<string>>
    valueAmount: string
    setValueAmount: Dispatch<SetStateAction<string>>

    type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX'
    setType: Dispatch<SetStateAction<'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX'>>
    dateRelease: string
    setDateRelease: Dispatch<SetStateAction<string>>
    parcelNumber: string
    setParcelNumber: Dispatch<SetStateAction<string>>
    paymentDown: string
    setPaymentDown: Dispatch<SetStateAction<string>>

    payment: IPayment[],
    setPayment: Dispatch<SetStateAction<IPayment[]>>

    // Dados da Receita Longe OD
    skewerFarOD: string
    setSkewerFarOD: Dispatch<SetStateAction<string>>
    cylindricalFarOD: string
    setCylindricalFarOD: Dispatch<SetStateAction<string>>
    axisFarOD: string
    setAxisFarOD: Dispatch<SetStateAction<string>>
    DNPFarOD: string
    setDNPFarOD: Dispatch<SetStateAction<string>>
    heightFarOD: string
    setHeightFarOD: Dispatch<SetStateAction<string>>

    // Dados da Receita Longe OE
    skewerFarOE: string
    setSkewerFarOE: Dispatch<SetStateAction<string>>
    cylindricalFarOE: string
    setCylindricalFarOE: Dispatch<SetStateAction<string>>
    axisFarOE: string
    setAxisFarOE: Dispatch<SetStateAction<string>>
    DNPFarOE: string
    setDNPFarOE: Dispatch<SetStateAction<string>>
    heightFarOE: string
    setHeightFarOE: Dispatch<SetStateAction<string>>

    // Dados da Receita Perto OD
    skewerNearOD: string
    setSkewerNearOD: Dispatch<SetStateAction<string>>
    cylindricalNearOD: string
    setCylindricalNearOD: Dispatch<SetStateAction<string>>
    axisNearOD: string
    setAxisNearOD: Dispatch<SetStateAction<string>>
    DNPNearOD: string
    setDNPNearOD: Dispatch<SetStateAction<string>>
    heightNearOD: string
    setHeightNearOD: Dispatch<SetStateAction<string>>

    // Dados da Receita Perto OE
    skewerNearOE: string
    setSkewerNearOE: Dispatch<SetStateAction<string>>
    cylindricalNearOE: string
    setCylindricalNearOE: Dispatch<SetStateAction<string>>
    axisNearOE: string
    setAxisNearOE: Dispatch<SetStateAction<string>>
    DNPNearOE: string
    setDNPNearOE: Dispatch<SetStateAction<string>>
    heightNearOE: string
    setHeightNearOE: Dispatch<SetStateAction<string>>

    addition: string
    setAddition: Dispatch<SetStateAction<string>>
    datePrescription: string
    setDatePrescription: Dispatch<SetStateAction<string>>

    prescription: IPrescription[]
    setPrescription: Dispatch<SetStateAction<IPrescription[]>>

    handleServiceOrder: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    goBack: () => void
    title: string
    paragraph: string
}

const columns = ["Ref", "Unidade", "Produto / Serviço", "Quantidade", "Val. Unit.", "Val. Total"];

export default function ServiceOrderFormTemplate({
    isButton,
    setIsButton,

    numberOS,
    setNumberOS,
    dateRegister,
    setDateRegister,
    hourRegister,
    setHourRegister,
    client,
    setClient,

    idProduct,
    setIdProduct,
    quantity,
    setQuantity,
    coast,
    setCoast,

    dataProduct,
    setDataProduct,
    serviceOrderProducts,
    setServiceOrderProducts,

    percentDiscount,
    setPercentDiscount,
    discount,
    setDiscount,
    percentAdditional,
    setPercentAdditional,
    additional,
    setAdditional,
    valueTotal,
    setValueTotal,
    valueAmount,
    setValueAmount,

    payment,
    setPayment,

    type,
    setType,
    dateRelease,
    setDateRelease,
    parcelNumber,
    setParcelNumber,
    paymentDown,
    setPaymentDown,

    // Dados da Receita Longe OD
    skewerFarOD,
    setSkewerFarOD,
    cylindricalFarOD,
    setCylindricalFarOD,
    axisFarOD,
    setAxisFarOD,
    DNPFarOD,
    setDNPFarOD,
    heightFarOD,
    setHeightFarOD,

    // Dados da Receita Longe OE
    skewerFarOE,
    setSkewerFarOE,
    cylindricalFarOE,
    setCylindricalFarOE,
    axisFarOE,
    setAxisFarOE,
    DNPFarOE,
    setDNPFarOE,
    heightFarOE,
    setHeightFarOE,

    // Dados da Receita Perto OD
    skewerNearOD,
    setSkewerNearOD,
    cylindricalNearOD,
    setCylindricalNearOD,
    axisNearOD,
    setAxisNearOD,
    DNPNearOD,
    setDNPNearOD,
    heightNearOD,
    setHeightNearOD,

    // Dados da Receita Perto OE
    skewerNearOE,
    setSkewerNearOE,
    cylindricalNearOE,
    setCylindricalNearOE,
    axisNearOE,
    setAxisNearOE,
    DNPNearOE,
    setDNPNearOE,
    heightNearOE,
    setHeightNearOE,
    addition,
    setAddition,
    datePrescription,
    setDatePrescription,

    prescription,
    setPrescription,

    handleServiceOrder,
    goBack,
    title,
    paragraph
}: IServiceOrderFormTemplate) {

    const [optionsClient, setOptionsClient] = useState<IItemSelect[]>([])
    const [optionsProduct, setOptionsProduct] = useState<IItemSelect[]>([])
    const [optionsTypeCard, setOptionsTypeCard] = useState<IItemSelect[]>(typeCard || [])
    const [currentTypeCard, setCurrentTypeCard] = useState<number>(null)

    const [cpf, setCPF] = useState<string>("")
    const [whatsapp, setWhatsapp] = useState<string>("")
    const [totalPaid, setTotalPaid] = useState<string>("")
    const [percentTotalPaid, setPercentTotalPaid] = useState<string>("")
    const [remainingAmount, setRemainingAmount] = useState<string>("")
    const [percentRemainingAmount, setPercentRemainingAmount] = useState<string>("")

    const [isInforPayment, setIsInforPayment] = useState<boolean>(false)

    const [listClient, setListClient] = useState<IClient[]>([])
    const [listProduct, setListProduct] = useState<IProduct[]>([])

    const handleTypeCard = (typeCard: number): void => {
        const dataTypeCard = optionsTypeCard.filter((item) => item._id === typeCard)[0]
        /**
         * @typedef {object} ITypeCard
         * @property {number} _id
         * @property {string} name
         * @property {'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null} value
         */

        /**@type {ITypeCard} */
        let JokerITypeCard;

        if (dataTypeCard) {
            JokerITypeCard = dataTypeCard.value
            setType(JokerITypeCard)
            setCurrentTypeCard(dataTypeCard._id)
        } else {
            setCurrentTypeCard(null)
        }
    }

    const handleDataProduct = (): void => {
        const dataCurrentProduct: IProduct = listProduct.find((item) => item._id === idProduct ? item : null)
        const data: IRowsProductTable = {
            _id: dataCurrentProduct._id,
            ref: dataCurrentProduct.reference,
            unidade: dataCurrentProduct.unit,
            produto: dataCurrentProduct.nameProduct,
            quantidade: quantity,
            valueUnit: dataCurrentProduct.selling,
            valueTot: coast,
        }
        setDataProduct([...dataProduct, data])
        setServiceOrderProducts([...serviceOrderProducts, { idProduct: idProduct, quantity: quantity, salesPrice: coast }])

        setQuantity("")
        setCoast("")
        setIdProduct(null)
    }

    const handleDeleteRowProduct = (_id: number): void => {
        const clearList = dataProduct.filter(item => item._id !== _id)
        const clearListServiceOrder = serviceOrderProducts.filter(item => item.idProduct !== _id)

        if (handleVerifyDebit(clearList) >= 0) {
            setServiceOrderProducts(clearListServiceOrder)
            setDataProduct(clearList)
        }
    }

    const calculateInstallmentDates = (dataLancamento: string, numParcelas: number): string[] => {
        const dataInicial = new Date(dataLancamento);
        const mesesRecebimento: string[] = [dataLancamento];

        if (isNaN(dataInicial.getTime())) {
            // Verifica se a data de lançamento é válida, se não for, retorna um array vazio.
            return [];
        }

        if (numParcelas <= 1) {
            // Se houver apenas uma parcela, retorna um array com a data de lançamento.
            return mesesRecebimento;
        }

        // Calcula as datas dos demais meses de recebimento
        for (let i = 1; i < numParcelas; i++) {
            const dataParcela = new Date(dataInicial);
            dataParcela.setMonth(dataParcela.getMonth() + i);
            mesesRecebimento.push(dataParcela.toISOString().slice(0, 10));
        }

        return mesesRecebimento;
    }

    const handleDataPayment = (): void => {
        /**
         * @typedef {object} ITypeCard
         * @property {number} _id
         * @property {string} name
         * @property {'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null} value
         */

        /**@type {ITypeCard} */
        let dataCurrentPayment;
        dataCurrentPayment = typeCard.find((item) => item.value === type ? item : null)

        if (!paymentDown) return null
        const paymont = paymentDown.replace(/\D/g, '');

        if (dataCurrentPayment && Number(paymont) <= handleVerifyDebit()) {

            /** @enum {'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null} */
            const typePayment: 'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null = dataCurrentPayment.value

            if (parcelNumber) {
                const dateParcel = calculateInstallmentDates(dateRelease, Number(parcelNumber))
                let totalData: IPayment[] = []


                for (let i = 0; i < Number(parcelNumber); i++) {
                    const data: IPayment = {
                        _id: uuid(),
                        type: typePayment,
                        amount: (Number(paymont) / Number(parcelNumber)).toString(),
                        date: dateParcel[i],
                        installments: `${i + 1}/${parcelNumber}`
                    }
                    totalData.push(data)
                }
                setPayment([...payment, ...totalData])

            } else {
                const data: IPayment = {
                    _id: uuid(),
                    type: typePayment,
                    amount: paymont,
                    date: dateRelease,
                    installments: '1'
                }
                setPayment([...payment, data])
            }

            handleTypeCard(null)
            setPaymentDown(' ')
            setDateRelease('')
            setParcelNumber('')
        }
    }

    const handleDeleteRowPayment = (_id: number) => {

        const clearList = payment.filter(item => item._id !== _id)

        setPayment(clearList)
    }

    /**
     * 
     * Calcular o valor faltante a ser pago VALOR DEVIDO (totalDebit) - VALOR PAGO (totalPayment)
     */
    const handleVerifyDebit = (list: IRowsProductTable[] = null): number => {
        const totalPayment = payment.reduce((acumulador, objeto) => {
            if (!objeto.amount) return null
            const value = objeto.amount.replace(/\D/g, '');

            return acumulador + Number(value)
        }, 0)

        if (list) {
            if (!additional || !discount) return null

            const jokerAdditional = additional.replace(/\D/g, '');
            const jokerDiscount = discount.replace(/\D/g, '');

            /**
             * Verifica o valor devido de acordo com um parâmetro recebido (list) (Serve para Verificação de Exclusão de Pagamento da Tabela)
             * Não é permitido excluir um item se o valor final ficar negativo
             */
            const totalDebit = list.reduce((acumulador, objeto) => {
                if (!objeto.valueUnit) return null
                const value = objeto.valueUnit.replace(/\D/g, ''); // Retira qualquer caracter não numerico

                return acumulador + (Number(objeto.quantidade) * Number(value))
            }, 0)

            return ((Number(totalDebit) + Number(jokerAdditional)) - Number(jokerDiscount)) - Number(totalPayment)
        }

        return Number(valueAmount) - Number(totalPayment)
    }


    useEffect(() => {
        axios.get('/api/client').then(response => {
            const listSelectClient = response.data.map(function (item) {
                const data: IItemSelect = {
                    _id: item._id,
                    name: `${item.firsName} ${item.lastName}`
                }
                return data
            })
            setOptionsClient(listSelectClient)
            setListClient(response.data)
        })

        axios.get('/api/product').then(response => {
            const listSelectProduct = response.data.map(function (item) {
                const data: IItemSelect = {
                    _id: item._id,
                    name: item.nameProduct
                }
                return data
            })

            setOptionsProduct(listSelectProduct)
            setListProduct(response.data)
        })
    }, [])

    useEffect(() => {
        if (client) {
            const currentClient: IClient = listClient.find((item) => item._id === client ? item : null)

            if (currentClient) {
                setCPF(currentClient.cpf)
                setWhatsapp(currentClient.whatsapp)
            }
        }
    }, [client])

    useEffect(() => {
        if (Number(quantity) >= 1) {
            const dataCurrentProduct: IProduct = listProduct.find((item) => item._id === idProduct ? item : null)
            if (dataCurrentProduct.selling) {
                if (!dataCurrentProduct.selling) return null
                const value = dataCurrentProduct.selling.replace(/\D/g, ''); // Retira qualquer caracter não numerico

                const total = Number(value) * Number(quantity)
                setCoast(total.toString())
            }
        } else if (idProduct !== null && Number(quantity) < 1) {
            setQuantity('1')
        }
    }, [idProduct, quantity])


    useEffect(() => {
        if (dataProduct.length > 0) {
            const total = dataProduct.reduce((acumulador, objeto) => {
                if (!objeto.valueUnit) return null
                const value = objeto.valueUnit.replace(/\D/g, ''); // Retira qualquer caracter não numerico

                return acumulador + (Number(objeto.quantidade) * Number(value))
            }, 0)
            setValueTotal(total.toString())
        } else {
            setValueTotal('0')
        }
    }, [dataProduct])

    /**
     * Calcular Débito Faltante da Sessão de Forma de Pagamento
     */
    useEffect(() => {
        if (payment.length > 0) {
            const remaining = handleVerifyDebit()
            const totalPaid = (Number(valueAmount) - remaining).toString()

            setTotalPaid(totalPaid)
            setPercentTotalPaid(handlePercent(totalPaid, valueAmount))

            setRemainingAmount(remaining.toString())
            setPercentRemainingAmount(handlePercent((remaining).toString(), valueAmount))

            setIsInforPayment(true)
        } else {
            setIsInforPayment(false)
        }

    }, [payment, valueAmount])

    return (
        <LayoutDefault>
            <div className="service-order-template">
                <form onSubmit={handleServiceOrder} className="service-order-template__form">
                    <Hero
                        isButtonPrymary={false}
                        title={title}
                        paragraph={paragraph}>
                    </Hero>
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Nova Ordem de Serviço - Dados Principais" />
                        <div className="service-order-template__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="numberOS"
                                    placeholder="501"
                                    value={numberOS}
                                    onChange={(ev) => setNumberOS(numberValidation(ev.target.value))}
                                    label="N° DA OS:"
                                    id="numberOS"
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="dateRegister"
                                    value={dateRegister}
                                    type="date"
                                    onChange={(ev) => setDateRegister(ev.target.value)}
                                    label="DATA DE REGISTRO:"
                                    id="dateRegister"
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="hourRegister"
                                    type="time"
                                    value={hourRegister}
                                    onChange={(ev) => setHourRegister(ev.target.value)}
                                    label="HORA DE REGISTRO:"
                                    id="hourRegister"
                                />
                            </div>
                            <div className="input">
                                <Select
                                    item={client}
                                    setItem={setClient}
                                    placeholder='Selecione um cliente...'
                                    label="CLIENTE:"
                                    options={optionsClient} />
                            </div>
                        </div>
                        <HeroSecundary title="Dados do cliente" />
                        {client && (
                            <div className="service-order-template__form__content__data">
                                <div className="service-order-template__form__content__data__hero">
                                    <span><strong>CPF:</strong></span>
                                    <span>{formatCPF(cpf)}</span>
                                </div>
                                <div className="service-order-template__form__content__data__hero">
                                    <span><strong>TEL:</strong></span>
                                    <span>{formatNumberWhatsapp(whatsapp)}</span>
                                </div>
                                {/* <div className="service-order-template__form__content__data__hero">
                                    <span><strong>CLIENTE DESDE:</strong></span>
                                    <span>25 / 11 / 2007</span>
                                </div> */}
                            </div>
                        )}
                    </div>
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Produtos e Serviços" />
                        <div className="service-order-template__form__content__inputs">
                            <div className="input">
                                <div>
                                    <Select
                                        item={idProduct}
                                        setItem={setIdProduct}
                                        placeholder='ex: Ray Ban'
                                        label="PESQUISAR PRODUTOS:"
                                        options={optionsProduct} />
                                </div>
                            </div>
                            <div className="input">
                                <TextField
                                    name="quantity"
                                    placeholder="ex: 5"
                                    value={quantity}
                                    onChange={(ev) => setQuantity(numberValidation(ev.target.value))}
                                    label="QUANTIDADE:"
                                    id="quantity"
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="coast"
                                    placeholder='R$ 0,00'
                                    value={handleFormatNumber(coast)}
                                    onChange={(ev) => setCoast(ev.target.value)}
                                    label="VALOR:"
                                    id="coast"
                                    disabled={true} />
                            </div>
                            <div className="input">
                                <ButtonsSecundary type='button' onClick={handleDataProduct}>
                                    Adicionar Item
                                </ButtonsSecundary>
                            </div>
                        </div>
                        <div className="container-table__content">
                            <table className="table">
                                <Head columns={columns} isButton={true} />
                                <tbody className="body">
                                    {dataProduct.map((item, index) => (
                                        <tr key={index} className='body__row'>
                                            <RowItem label={item.ref} isActive={null} />
                                            <RowItem label={item.unidade} isActive={null} />
                                            <RowItem label={item.produto} isActive={null} />
                                            <RowItem label={item.quantidade} isActive={null} />
                                            <RowItem label={handleFormatNumber(item.valueUnit)} isActive={null} />
                                            <RowItem label={handleFormatNumber(item.valueTot)} isActive={null} />
                                            <td className={'row buttons'}>
                                                <button onClick={() => handleDeleteRowProduct(item._id)} type='button'>
                                                    <MdDelete size={24} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <CardTotal
                            valueTotal={valueTotal}
                            valueAmount={valueAmount}
                            setValueTotal={setValueTotal}
                            setValueAmount={setValueAmount}
                            percentAdditional={percentAdditional}
                            percentDiscount={percentDiscount}
                            setPercentAdditional={setPercentAdditional}
                            setPercentDiscount={setPercentDiscount}
                            additional={additional}
                            discount={discount}
                            setAdditional={setAdditional}
                            setDiscount={setDiscount} />
                    </div>
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Forma de pagamento" />
                        <div className="service-order-template__form__content__inputs">
                            <div className="input">
                                <Select
                                    item={currentTypeCard}
                                    setItem={handleTypeCard}
                                    placeholder='Selecione um tipo Pagameto'
                                    label="FORMA DE PAGAMENTO::"
                                    options={optionsTypeCard} />
                            </div>
                            <div className="input">
                                <TextField
                                    name="paymentDown"
                                    placeholder='0,00'
                                    value={handleFormatNumber(paymentDown)}
                                    onChange={(ev) => setPaymentDown(ev.target.value)}
                                    label="VALOR (R$):"
                                    id="paymentDown"
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="dateRelease"
                                    value={dateRelease}
                                    type="date"
                                    onChange={(ev) => setDateRelease(ev.target.value)}
                                    label="DATA LAN. CAIXA:"
                                    id="dateRelease" />
                            </div>
                            <div className="input">
                                <TextField
                                    name="parcelNumber"
                                    placeholder="ex: 5"
                                    value={parcelNumber}
                                    onChange={(ev) => setParcelNumber(numberValidation(ev.target.value))}
                                    label="QTD. PARCELAS:"
                                    id="parcelNumber"
                                    disabled={type != 'CREDIT_CARD' ? true : false} />
                            </div>
                            <div className="input">
                                <ButtonsSecundary onClick={handleDataPayment} type='button'>
                                    Registrar
                                </ButtonsSecundary>
                            </div>
                        </div>
                        {isInforPayment && (
                            <div className="service-order-template__form__content__data">
                                <div className="service-order-template__form__content__data__hero">
                                    <span><strong>TOTAL PAGO (R$):</strong></span>
                                    <span>R$ {handleFormatNumber(totalPaid)}</span>
                                    <span>% {percentTotalPaid}</span>
                                </div>
                                <div className="service-order-template__form__content__data__hero">
                                    <span><strong>RESTANTE DO MONTANTE (R$):</strong></span>
                                    <span>R$ {handleFormatNumber(remainingAmount)}</span>
                                    <span>% {percentRemainingAmount}</span>
                                </div>
                            </div>
                        )}
                        {isInforPayment && (<HeroSecundary title="" />)}
                        {isInforPayment && (<TablePayment rows={payment} onClick={handleDeleteRowPayment} />)}
                    </div>
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Dados da Receita" />
                        <Prescription
                            skewerFarOD={skewerFarOD}
                            setSkewerFarOD={setSkewerFarOD}
                            cylindricalFarOD={cylindricalFarOD}
                            setCylindricalFarOD={setCylindricalFarOD}
                            axisFarOD={axisFarOD}
                            setAxisFarOD={setAxisFarOD}
                            DNPFarOD={DNPFarOD}
                            setDNPFarOD={setDNPFarOD}
                            heightFarOD={heightFarOD}
                            setHeightFarOD={setHeightFarOD}
                            skewerFarOE={skewerFarOE}
                            setSkewerFarOE={setSkewerFarOE}
                            cylindricalFarOE={cylindricalFarOE}
                            setCylindricalFarOE={setCylindricalFarOE}
                            axisFarOE={axisFarOE}
                            setAxisFarOE={setAxisFarOE}
                            DNPFarOE={DNPFarOE}
                            setDNPFarOE={setDNPFarOE}
                            heightFarOE={heightFarOE}
                            setHeightFarOE={setHeightFarOE}

                            skewerNearOD={skewerNearOD}
                            setSkewerNearOD={setSkewerNearOD}
                            cylindricalNearOD={cylindricalNearOD}
                            setCylindricalNearOD={setCylindricalNearOD}
                            axisNearOD={axisNearOD}
                            setAxisNearOD={setAxisNearOD}
                            DNPNearOD={DNPNearOD}
                            setDNPNearOD={setDNPNearOD}
                            heightNearOD={heightNearOD}
                            setHeightNearOD={setHeightNearOD}
                            skewerNearOE={skewerNearOE}
                            setSkewerNearOE={setSkewerNearOE}
                            cylindricalNearOE={cylindricalNearOE}
                            setCylindricalNearOE={setCylindricalNearOE}
                            axisNearOE={axisNearOE}
                            setAxisNearOE={setAxisNearOE}
                            DNPNearOE={DNPNearOE}
                            setDNPNearOE={setDNPNearOE}
                            heightNearOE={heightNearOE}
                            setHeightNearOE={setHeightNearOE}

                            datePrescription={datePrescription}
                            setDatePrescription={setDatePrescription}
                            addition={addition}
                            setAddition={setAddition}
                            isButton={isButton}
                            setIsButton={setIsButton}

                            prescription={prescription}
                            setPrescription={setPrescription}
                        />
                    </div>
                    <div className="service-order-template__form__buttons">
                        <div>
                            <ButtonsTertiary onClick={() => goBack()}>
                                <MdCancel size={24} />
                                Cancelar
                            </ButtonsTertiary>
                        </div>
                        <div>
                            <ButtonsPrimary>
                                <MdBuild size={24} />
                                Salvar O.S.
                            </ButtonsPrimary>
                        </div>
                    </div>
                </form>
            </div >
        </LayoutDefault >
    );
}