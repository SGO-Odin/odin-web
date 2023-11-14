import { GetServerSideProps } from 'next';
import './newSale.scss'
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LayoutDefault from '@/src/components/layoutDefault';
import { Hero } from '@/src/components/hero';
import { HeroSecundary } from '@/src/components/commons/hero-secundary';
import { TextField } from '@/src/components/textField';
import { Select } from '@/src/components/select'
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { MdAttachMoney, MdCancel } from 'react-icons/md';
import { ButtonsPrimary } from '@/src/components/buttons/primary';
import axios from 'axios';
import { ICreateServiceOrderRes, IServiceOrder } from '@/src/server/entities/service-order';
import { IItemSelect } from '@/src/interface/utils';
import { handleFormatDateBR } from '@/src/hook/format-date-br';
import { IClient } from '@/src/server/entities/client';
import { IProduct } from '@/src/server/entities/product';
import ProductServiceCard from '@/src/components/commons/product-service-card';
import { IPayment, IRowsProductTable } from '@/src/interface/datas';
import MethodPaymentCard from '@/src/components/commons/method-payment-card';
import typeCard from '@/src/data/typeCard.json'
import { v4 as uuid } from "uuid";
import { handlePercent } from '@/src/hook/percent';
import { IProductCommon } from '@/src/server/entities/commons';
import { ICreateSaleReq, IPayments } from '@/src/server/entities/sale';
import Head from 'next/head';

const columns = ["Ref", "Unidade", "Produto / Serviço", "Quantidade", "Val. Unit.", "Val. Total"];

export default function NewSale() {
    const { push } = useRouter();

    const [dateRegister, setDateRegister] = useState<string>('')
    const [hourRegister, setHourRegister] = useState<string>('')

    const [quantity, setQuantity] = useState<string>('')
    const [coast, setCoast] = useState<string>('')

    const [idProduct, setIdProduct] = useState<number>(null)
    const [dataProduct, setDataProduct] = useState<IRowsProductTable[]>([])
    const [serviceOrderProducts, setServiceOrderProducts] = useState<IProductCommon[]>([])

    const [percentDiscount, setPercentDiscount] = useState<string>('')
    const [discount, setDiscount] = useState<string>('')
    const [percentAdditional, setPercentAdditional] = useState<string>('')
    const [additional, setAdditional] = useState<string>('')
    const [valueTotal, setValueTotal] = useState<string>('')
    const [valueAmount, setValueAmount] = useState<string>('')

    const [client, setClient] = useState<number>()

    const [methodPayment, setMethodPayment] = useState<string>('')
    const [dateRelease, setDateRelease] = useState<string>('')
    const [parcelNumber, setParcelNumber] = useState<string>('')
    const [paymentDown, setPaymentDown] = useState<string>('')

    const [orderServiceClient, setOrderServiceClient] = useState<ICreateServiceOrderRes[]>([])
    const [optionsServiceOrders, setOptionsServiceOrders] = useState<IItemSelect[]>([])

    const [optionsClient, setOptionsClient] = useState<IItemSelect[]>([])
    const [optionsProduct, setOptionsProduct] = useState<IItemSelect[]>([])
    const [listClient, setListClient] = useState<IClient[]>([])
    const [listProduct, setListProduct] = useState<IProduct[]>([])

    const [selectedServiceOrder, setSelectedServiceOrder] = useState<number>(null)

    // Payment
    const [serviceOrderPayment, setServiceOrderPayment] = useState<IPayments[]>([])

    const [payment, setPayment] = useState<IPayment[]>([])
    const [totalPaid, setTotalPaid] = useState<string>("")
    const [percentTotalPaid, setPercentTotalPaid] = useState<string>("")
    const [type, setType] = useState<'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | ''>('')
    const [isInforPayment, setIsInforPayment] = useState<boolean>(false)
    const [optionsTypeCard, setOptionsTypeCard] = useState<IItemSelect[]>(typeCard || [])
    const [currentTypeCard, setCurrentTypeCard] = useState<number>(null)
    const [remainingAmount, setRemainingAmount] = useState<string>("")
    const [percentRemainingAmount, setPercentRemainingAmount] = useState<string>("")

    const handleNewServiceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: ICreateSaleReq = {
            clientId: client,
            serviceOrderId: !!selectedServiceOrder ? selectedServiceOrder : null,
            saleProducts: serviceOrderProducts,
            salePayments: serviceOrderPayment
        }

        axios.post('/api/sale', data)
            .then((response) => {

                // GoBack()
                if (response.status == 201) goBack()
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    const goBack = () => {
        push('/vendas')
    }

    const handleDataProduct = (): void => {
        const dataCurrentProduct: IProduct = listProduct.find((item) => item.id === idProduct ? item : null)
        const data: IRowsProductTable = {
            _id: dataCurrentProduct.id,
            ref: dataCurrentProduct.reference,
            unidade: dataCurrentProduct.unit,
            produto: dataCurrentProduct.name,
            quantidade: quantity,
            valueUnit: `${dataCurrentProduct.currentSalePrice}`,
            valueTot: coast,
        }
        setDataProduct([...dataProduct, data])
        setServiceOrderProducts([...serviceOrderProducts, { productId: idProduct, quantity: Number(quantity) }])

        setQuantity('')
        setCoast(' ')
        setIdProduct(null)
    }

    const handleDeleteRowProduct = (_id: number): void => {
        const clearList = dataProduct.filter(item => item._id !== _id)
        const clearListServiceOrder = serviceOrderProducts.filter(item => item.productId !== _id)

        setServiceOrderProducts(clearListServiceOrder)
        setDataProduct(clearList)
    }

    //** Payments */
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

        if (dataCurrentPayment && (Number(paymont) * Number(parcelNumber)) <= handleVerifyDebit()) {

            /** @enum {'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null} */
            const typePayment: 'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null = dataCurrentPayment.value

            if (parcelNumber) {
                const dateParcel = calculateInstallmentDates(dateRelease, Number(parcelNumber))
                let totalData: IPayment[] = []


                for (let i = 0; i < Number(parcelNumber); i++) {
                    const data: IPayment = {
                        _id: uuid(),
                        type: typePayment,
                        amount: paymont,
                        date: dateParcel[i],
                        installments: `${i + 1}/${parcelNumber}`
                    }
                    totalData.push(data)
                }
                setPayment([...payment, ...totalData])
                setServiceOrderPayment([...serviceOrderPayment, { payment: { type: typePayment, amount: Number(paymont), quantityInstallments: parcelNumber } }])

            } else {
                const data: IPayment = {
                    _id: uuid(),
                    type: typePayment,
                    amount: paymont,
                    date: dateRelease,
                    installments: '1'
                }
                setPayment([...payment, data])
                setServiceOrderPayment([...serviceOrderPayment, { payment: { type: typePayment, amount: Number(paymont), quantityInstallments: parcelNumber } }])
            }

            handleTypeCard(null)
            setPaymentDown(' ')
            setDateRelease('')
            setParcelNumber('')
        }
    }

    //** UseEffects */
    useEffect(() => {

        axios.get('/api/client')
            .then(response => {
                if (response.status == 200) {
                    const listSelectClient = response.data.response.reduce(function (data: IItemSelect[], item: IClient) {
                        data.push({
                            _id: item.id,
                            name: item.firstName
                        })
                        return data
                    }, [])

                    setOptionsClient(listSelectClient)
                    setListClient(response.data.response)
                }
            })
            .catch((error) => {
                console.log(error.response.data)
            })

        axios.get('/api/product').then(response => {
            const listSelectProduct = response.data.response.reduce(function (data: IItemSelect[], item: IProduct) {
                data.push({
                    _id: item.id,
                    name: item.name
                })
                return data
            }, [])

            setOptionsProduct(listSelectProduct)
            setListProduct(response.data.response)
        })
    }, [])

    useEffect(() => {
        if (selectedServiceOrder) {
            const currentServiceOrder: ICreateServiceOrderRes = orderServiceClient.find((item) => item.id === selectedServiceOrder ? item : null)

            if (currentServiceOrder) {
                const listServiceOrderProduct = currentServiceOrder.products.reduce(function (data: IRowsProductTable[], item) {
                    data.push({
                        _id: item.product.id,
                        ref: item.product.reference,
                        unidade: item.product.unit,
                        produto: item.product.name,
                        quantidade: (item.quantity).toString(),
                        valueUnit: `${item.product.currentSalePrice}`,
                        valueTot: (item.salePrice).toString(),
                    })
                    return data
                }, [])

                const selectedServiceOrderproduct = currentServiceOrder.products.reduce(function (data, item) {
                    data.push({
                        productId: item.product.id,
                        quantity: item.quantity
                    })
                    return data
                }, [])

                setDataProduct([...dataProduct, ...listServiceOrderProduct])
                setServiceOrderProducts([...serviceOrderProducts, ...selectedServiceOrderproduct])
            }
        } else {
            setDataProduct([])
            setServiceOrderProducts([])
        }
    }, [selectedServiceOrder])

    useEffect(() => {
        if (client) {
            axios.get(`/api/service-order?id=${client}`)
                .then(response => {
                    if (response.status == 200) {
                        const listServiceOrder = response.data.response.reduce(function (data: IItemSelect[], item: IServiceOrder) {
                            data.push({
                                _id: item.id,
                                name: `${handleFormatDateBR(item.prescription.createdOn, 'DATE')} ${handleFormatDateBR(item.prescription.createdOn, 'HOUR')}`
                            })
                            return data
                        }, [])

                        setOptionsServiceOrders(listServiceOrder)
                        setOrderServiceClient(response.data.response)
                        setSelectedServiceOrder(null)
                    }

                })
                .catch((error) => {
                    console.log(error.response.data)
                })
        }
    }, [client])

    useEffect(() => {
        if (Number(quantity) >= 1) {
            const dataCurrentProduct: IProduct = listProduct.find((item) => item.id === idProduct ? item : null)
            if (dataCurrentProduct.currentSalePrice) {

                let value = '0'
                if (dataCurrentProduct.currentSalePrice) {
                    value = `${dataCurrentProduct.currentSalePrice}`.replace(/\D/g, ''); // Retira qualquer caracter não numerico
                }
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

                let value = '0'
                if (objeto.valueUnit) {
                    value = objeto.valueUnit.replace(/\D/g, ''); // Retira qualquer caracter não numerico
                }
                return acumulador + (Number(objeto.quantidade) * Number(value))
            }, 0)
            setValueTotal(total.toString())
        } else {
            setValueTotal('0')
        }
    }, [dataProduct])

    //** UseEffects Payment */
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
        <>
            <Head>
                <title>Cadastrar Vendas | ODIN</title>
            </Head>
            <LayoutDefault>

                <div className="sale-template">
                    <form onSubmit={handleNewServiceOrder} className="sale-template__form">
                        <Hero
                            isButtonPrymary={false}
                            title="Cadastrar Venda"
                            paragraph={`Registre novas transações de forma rápida e precisa, mantendo o controle das operações comerciais.`}>
                        </Hero>
                        <div className="sale-template__form__content">
                            <HeroSecundary title="Dados Principais" />
                            <div className="sale-template__form__content__inputs">
                                <div className="input">
                                    <Select
                                        item={client}
                                        setItem={setClient}
                                        placeholder='Selecione um cliente...'
                                        label="CLIENTE:"
                                        options={optionsClient} />
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
                                        item={selectedServiceOrder}
                                        setItem={setSelectedServiceOrder}
                                        placeholder='Pesquisar Ordem de Serviçoa'
                                        label="IMPORTAR O.S."
                                        options={optionsServiceOrders} />
                                </div>
                            </div>
                        </div>
                        <ProductServiceCard
                            idProduct={idProduct}
                            setIdProduct={setIdProduct}
                            optionsProduct={optionsProduct}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            coast={coast}
                            setCoast={setCoast}
                            handleDataProduct={handleDataProduct}
                            dataProduct={dataProduct}
                            handleDeleteRowProduct={handleDeleteRowProduct}

                            valueTotal={valueTotal}
                            setValueTotal={setValueTotal}
                            valueAmount={valueAmount}
                            setValueAmount={setValueAmount}
                            percentDiscount={percentDiscount}
                            setPercentDiscount={setPercentDiscount}
                            discount={discount}
                            setDiscount={setDiscount}
                            percentAdditional={percentAdditional}
                            setPercentAdditional={setPercentAdditional}
                            additional={additional}
                            setAdditional={setAdditional}
                        />
                        {/* <div className="sale-template__form__content">
                        <HeroSecundary title="Produtos e Serviços" />
                        <div className="sale-template__form__content__inputs">
                            <div className="input">
                                <div>
                                    <Search
                                        label="PESQUISAR PRODUTOS:"
                                        isLabel={true}
                                        value={search}
                                        onChange={(ev) => setSearch(ev.target.value)}
                                        placeholder="ex: Ray Ban" />
                                </div>
                            </div>
                            <div className="input">
                                <TextField
                                    name="quantity"
                                    placeholder=""
                                    value={quantity}
                                    onChange={(ev) => setQuantity(ev.target.value)}
                                    label="QUANTIDADE:"
                                    id="quantity"
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="coast"
                                    value={coast}
                                    onChange={(ev) => setCoast(ev.target.value)}
                                    label="VALOR:"
                                    id="coast" />
                            </div>
                            <div className="input">
                                <ButtonsSecundary>
                                    Adicionar Item
                                </ButtonsSecundary>
                            </div>
                        </div>
                        <TablesCustom
                            data={rows}
                            columns={columns}
                            isButton={true}
                            typeButton={"two"}
                        />
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
                    </div> */}
                        {/* <div className="sale-template__form__content">
                        <HeroSecundary title="Forma de pagamento" />
                        <div className="sale-template__form__content__inputs">
                            <div className="input">
                            </div>
                            <div className="input">
                                <TextField
                                    name="paymentDown"
                                    value={paymentDown}
                                    onChange={(ev) => setPaymentDown(ev.target.value)}
                                    label="VALOR:"
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
                                    id="dateRelease"
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="parcelNumber"
                                    placeholder=""
                                    value={parcelNumber}
                                    onChange={(ev) => setParcelNumber(ev.target.value)}
                                    label="QTD. PARCELAS:"
                                    id="parcelNumber"
                                />
                            </div>
                            <div className="input">
                                <ButtonsSecundary>
                                    Registrar
                                </ButtonsSecundary>
                            </div>
                        </div>
                        <div className="sale-template__form__content__data">
                            <div className="sale-template__form__content__data__hero">
                                <span><strong>TOTAL:</strong></span>
                                <span>R$ 150,00</span>
                                <span>% 27,27</span>
                            </div>
                            <div className="sale-template__form__content__data__hero">
                                <span><strong>RESTANTE:</strong></span>
                                <span>R$ 400,00</span>
                                <span>% 72,73</span>
                            </div>
                        </div>
                        <HeroSecundary title="" />
                    </div> */}
                        <MethodPaymentCard
                            currentTypeCard={currentTypeCard}
                            handleTypeCard={handleTypeCard}
                            optionsTypeCard={optionsTypeCard}
                            paymentDown={paymentDown}
                            setPaymentDown={setPaymentDown}
                            dateRelease={dateRelease}
                            setDateRelease={setDateRelease}
                            parcelNumber={parcelNumber}
                            setParcelNumber={setParcelNumber}
                            type={type}
                            handleDataPayment={handleDataPayment}
                            isInforPayment={isInforPayment}
                            totalPaid={totalPaid}
                            percentTotalPaid={percentTotalPaid}
                            remainingAmount={remainingAmount}
                            percentRemainingAmount={percentRemainingAmount}
                            payment={payment}
                        />
                        <div className="sale-template__form__buttons">
                            <div>
                                <ButtonsTertiary onClick={() => goBack()}>
                                    <MdCancel size={24} />
                                    Cancelar
                                </ButtonsTertiary>
                            </div>
                            <div>
                                <ButtonsPrimary>
                                    <MdAttachMoney size={24} />
                                    Cadastrar Venda
                                </ButtonsPrimary>
                            </div>
                        </div>
                    </form>
                </div>
            </LayoutDefault>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "odinauth.token": token } = parseCookies(ctx);


    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
        }
    }
}