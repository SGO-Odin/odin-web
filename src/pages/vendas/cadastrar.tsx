import { GetServerSideProps } from 'next';
import './newSale.scss'
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { parse, format } from 'date-fns';
import LayoutDefault from '@/src/components/layoutDefault';
import { Hero } from '@/src/components/hero';
import { HeroSecundary } from '@/src/components/commons/hero-secundary';
import { TextField } from '@/src/components/textField';
import { Select } from '@/src/components/select';
import { Search } from '@/src/components/search';
import { ButtonsSecundary } from '@/src/components/buttons/secundary';
import { TablesCustom } from '@/src/components/tablesCustom';
import CardTotal from '@/src/components/commons/card-total';
import TablePayment from '@/src/components/commons/table-payment';
import Revenue from '@/src/components/commons/prescription';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { MdAttachMoney, MdBuild, MdCancel } from 'react-icons/md';
import { ButtonsPrimary } from '@/src/components/buttons/primary';

const rows = [
    { "Ref": "rb20712", Unidade: "PC", "Produto / Serviço": "Armação Acetato Preto", Quantidade: "1", "Val. Unit.": "350.00", "Val. Total": "350.00" },
    { "Ref": "rb20712", Unidade: "PC", "Produto / Serviço": "Lente vs", Quantidade: "1", "Val. Unit.": "350.00", "Val. Total": "350.00" },
];

const columns = ["Ref", "Unidade", "Produto / Serviço", "Quantidade", "Val. Unit.", "Val. Total"];

const sumTotal = rows.reduce((total, item) => {
    const sumValueTotal = parseFloat(item["Val. Total"])
    return total + sumValueTotal
}, 0)

export default function NewSale() {
    const { push } = useRouter();

    const [dateRegister, setDateRegister] = useState<string>("")
    const [hourRegister, setHourRegister] = useState<string>("")
    const [orderService, setOrderService] = useState<string>("")

    const [search, setSearch] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("")
    const [coast, setCoast] = useState<string>("")

    const [percentDiscount, setPercentDiscount] = useState<string>("0")
    const [discount, setDiscount] = useState<string>("0")
    const [percentAdditional, setPercentAdditional] = useState<string>("0")
    const [additional, setAdditional] = useState<string>("0")
    const [valueTotal, setValueTotal] = useState<string>(`${sumTotal}` || "0")
    const [valueAmount, setValueAmount] = useState<string>(valueTotal || "0")

    const [client, setClient] = useState<string>("")

    const [methodPayment, setMethodPayment] = useState<string>("")
    const [dateRelease, setDateRelease] = useState<string>("")
    const [parcelNumber, setParcelNumber] = useState<string>("")
    const [paymentDown, setPaymentDown] = useState<string>("")

    const handleNewServiceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(`dateRegister ${dateRegister}`) //
        console.log(`hourRegister ${hourRegister}`)
        console.log(`orderService ${orderService}`)
        console.log("============================")

        console.log(`search ${search}`)
        console.log(`quantity ${quantity}`)
        console.log(`coast ${coast}`)
        console.log(`valueAmount ${valueAmount}`)
        console.log("============================")

        console.log(`client ${client}`)

        console.log(`methodPayment ${methodPayment}`)
        console.log(`dateRelease ${dateRelease}`) //
        console.log(`parcelNumber ${parcelNumber}`)
        console.log(`paymentDown ${paymentDown}`)
        console.log("============================")
        // const data = { brands, isActive }
        // create
        // await axios.post('#', data)

        // reset

        goBack()
    }

    const goBack = () => {
        push('/vendas')
    }
    return (
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
                                    name="orderService"
                                    value={orderService}
                                    placeholder={"Pesquisar Ordem de Serviçoa"}
                                    onChange={(ev) => setOrderService(ev.target.value)}
                                    label="IMPORTAR O.S."
                                    id="orderService" />
                            </div>
                        </div>
                    </div>
                    <div className="sale-template__form__content">
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
                    </div>
                    <div className="sale-template__form__content">
                        <HeroSecundary title="Finalização" />
                        <div className="sale-template__form__content__inputs">
                            <div className="input">
                                <Select
                                    name="client"
                                    value={client}
                                    onChange={(ev) => setClient(ev.target.value)}
                                    label="CLIENTE"
                                    id="client" />
                            </div>
                        </div>
                        <HeroSecundary title="Forma de pagamento" />
                        <div className="sale-template__form__content__inputs">
                            <div className="input">
                                <Select
                                    name="methodPayment"
                                    value={methodPayment}
                                    onChange={(ev) => setMethodPayment(ev.target.value)}
                                    label="FORMA DE PAGAMENTO"
                                    id="methodPayment" />
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
                        <TablePayment rows={["Dinheiro", "- R$100,00", "Lançamento dia 01 / 06 / 2023"]} />
                    </div>
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