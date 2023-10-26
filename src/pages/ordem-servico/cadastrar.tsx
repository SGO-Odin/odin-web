import { useRouter } from "next/navigation";
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import './newServiceOrder.scss'
import LayoutDefault from '@/src/components/layoutDefault';
import { Hero } from '@/src/components/hero';
import { HeroSecundary } from '@/src/components/commons/hero-secundary';
import { TextField } from '@/src/components/textField';
import { Select } from '@/src/components/select';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { MdBuild, MdCancel } from 'react-icons/md';
import { ButtonsPrimary } from '@/src/components/buttons/primary';
import { parse, format } from 'date-fns';
import { ButtonsSecundary } from "@/src/components/buttons/secundary";
import { Search } from "@/src/components/search";
import { TablesCustom } from "@/src/components/tablesCustom";
import CardTotal from "@/src/components/commons/card-total";
import TablePayment from "@/src/components/commons/table-payment";
import Revenue from "@/src/components/commons/revenue";

const rows = [
    { "Ref": "rb20712", Unidade: "PC", "Produto / Serviço": "Armação Acetato Preto", Quantidade: "1", "Val. Unit.": "350.00", "Val. Total": "350.00" },
    { "Ref": "rb20712", Unidade: "PC", "Produto / Serviço": "Lente vs", Quantidade: "1", "Val. Unit.": "350.00", "Val. Total": "350.00" },
];

const columns = ["Ref", "Unidade", "Produto / Serviço", "Quantidade", "Val. Unit.", "Val. Total"];

const sumTotal = rows.reduce((total, item) => {
    const sumValueTotal = parseFloat(item["Val. Total"])
    return total + sumValueTotal
}, 0)

export default function NewServiceOrder() {
    const { push } = useRouter();
    const [isButton, setIsButton] = useState<"1" | "2" | "3">("1")

    const [numberOS, setNumberOS] = useState<string>("")
    const [dateRegister, setDateRegister] = useState<string>("")
    const [hourRegister, setHourRegister] = useState<string>("")
    const [client, setClient] = useState<string>("")

    const [search, setSearch] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("")
    const [coast, setCoast] = useState<string>("")

    const [percentDiscount, setPercentDiscount] = useState<string>("0")
    const [discount, setDiscount] = useState<string>("0")
    const [percentAdditional, setPercentAdditional] = useState<string>("0")
    const [additional, setAdditional] = useState<string>("0")
    const [valueTotal, setValueTotal] = useState<string>(`${sumTotal}` || "0")
    const [valueAmount, setValueAmount] = useState<string>(valueTotal || "0")

    const [methodPayment, setMethodPayment] = useState<string>("")
    const [dateRelease, setDateRelease] = useState<string>("")
    const [parcelNumber, setParcelNumber] = useState<string>("")
    const [paymentDown, setPaymentDown] = useState<string>("")

    // Dados da Receita Longe OD
    const [skewerFarOD, setSkewerFarOD] = useState<string>("")
    const [cylindricalFarOD, setCylindricalFarOD] = useState<string>("")
    const [axisFarOD, setAxisFarOD] = useState<string>("")
    const [DNPFarOD, setDNPFarOD] = useState<string>("")
    const [heightFarOD, setHeightFarOD] = useState<string>("")

    // Dados da Receita Longe OE
    const [skewerFarOE, setSkewerFarOE] = useState<string>("")
    const [cylindricalFarOE, setCylindricalFarOE] = useState<string>("")
    const [axisFarOE, setAxisFarOE] = useState<string>("")
    const [DNPFarOE, setDNPFarOE] = useState<string>("")
    const [heightFarOE, setHeightFarOE] = useState<string>("")

    // Dados da Receita Perto OD
    const [skewerNearOD, setSkewerNearOD] = useState<string>("")
    const [cylindricalNearOD, setCylindricalNearOD] = useState<string>("")
    const [axisNearOD, setAxisNearOD] = useState<string>("")
    const [DNPNearOD, setDNPNearOD] = useState<string>("")
    const [heightNearOD, setHeightNearOD] = useState<string>("")

    // Dados da Receita Perto OE
    const [skewerNearOE, setSkewerNearOE] = useState<string>("")
    const [cylindricalNearOE, setCylindricalNearOE] = useState<string>("")
    const [axisNearOE, setAxisNearOE] = useState<string>("")
    const [DNPNearOE, setDNPNearOE] = useState<string>("")
    const [heightNearOE, setHeightNearOE] = useState<string>("")

    const [addition, setAddition] = useState<string>("")

    const handleNewServiceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(`numberOS ${numberOS}`)
        console.log(`dateRegister ${dateRegister}`) //
        console.log(`hourRegister ${hourRegister}`)
        console.log(`client ${client}`)
        console.log("============================")

        console.log(`search ${search}`)
        console.log(`quantity ${quantity}`)
        console.log(`coast ${coast}`)
        console.log(`valueAmount ${valueAmount}`)
        console.log("============================")

        console.log(`methodPayment ${methodPayment}`)
        console.log(`dateRelease ${dateRelease}`) //
        console.log(`parcelNumber ${parcelNumber}`)
        console.log(`paymentDown ${paymentDown}`)
        console.log("============================")

        // Dados da Receita Longe OD
        console.log(`skewerFarOD ${skewerFarOD}`)
        console.log(`cylindricalFarOD ${cylindricalFarOD}`)
        console.log(`axisFarOD ${axisFarOD}`)
        console.log(`DNPFarOD ${DNPFarOD}`)
        console.log(`heightFarOD ${heightFarOD}`)

        // Dados da Receita Longe OE

        console.log(`skewerFarOE ${skewerFarOE}`)
        console.log(`cylindricalFarOE ${cylindricalFarOE}`)
        console.log(`axisFarOE ${axisFarOE}`)
        console.log(`DNPFarOE ${DNPFarOE}`)
        console.log(`heightFarOE ${heightFarOE}`)
        // Dados da Receita Perto OD

        console.log(`skewerNearOD ${skewerNearOD}`)
        console.log(`cylindricalNearOD ${cylindricalNearOD}`)
        console.log(`axisNearOD ${axisNearOD}`)
        console.log(`DNPNearOD ${DNPNearOD}`)
        console.log(`heightNearOD ${heightNearOD}`)

        // Dados da Receita Perto OE
        console.log(`skewerNearOE ${skewerNearOE}`)
        console.log(`cylindricalNearOE ${cylindricalNearOE}`)
        console.log(`axisNearOE ${axisNearOE}`)
        console.log(`DNPNearOE ${DNPNearOE}`)
        console.log(`heightNearOE ${heightNearOE}`)

        console.log(`addition ${addition}`)
        console.log(`dateRegister ${dateRegister}`) //
        console.log("============================")
        // const data = { brands, isActive }
        // create
        // await axios.post('#', data)

        // reset

        goBack()
    }

    function formatarSequenciaNumericaParaData(value: string) {
        try {

            const data = parse(value, 'yyyyMMdd', new Date());

            const dataFormatada = format(data, 'dd/MM/yyyy');

            return dataFormatada;
        } catch (error) {
            return null;
        }
    }

    const goBack = () => {
        push('/ordem-servico')
    }
    return (
        <LayoutDefault>

            <div className="service-order-template">
                <form onSubmit={handleNewServiceOrder} className="service-order-template__form">
                    <Hero
                        isButtonPrymary={false}
                        title="Cadastrar O.S."
                        paragraph={`Registre e acompanhe os pedidos dos clientes de forma organizada e eficiente.`}>
                    </Hero>
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Nova Ordem de Serviço - Dados Principais" />
                        <div className="service-order-template__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="numberOS"
                                    placeholder="501"
                                    value={numberOS}
                                    onChange={(ev) => setNumberOS(ev.target.value)}
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
                                    name="client"
                                    value={client}
                                    onChange={(ev) => setClient(ev.target.value)}
                                    label="CLIENTE"
                                    id="client" />
                            </div>
                        </div>
                        <HeroSecundary title="Dados do cliente" />
                        <div className="service-order-template__form__content__data">
                            <div className="service-order-template__form__content__data__hero">
                                <span><strong>CPF:</strong></span>
                                <span>000.000.000-00</span>
                            </div>
                            <div className="service-order-template__form__content__data__hero">
                                <span><strong>TEL:</strong></span>
                                <span>(73) 9 0000 - 0000</span>
                            </div>
                            <div className="service-order-template__form__content__data__hero">
                                <span><strong>CLIENTE DESDE:</strong></span>
                                <span>25 / 11 / 2007</span>
                            </div>
                        </div>
                    </div>
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Produtos e Serviços" />
                        <div className="service-order-template__form__content__inputs">
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
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Forma de pagamento" />
                        <div className="service-order-template__form__content__inputs">
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
                        <div className="service-order-template__form__content__data">
                            <div className="service-order-template__form__content__data__hero">
                                <span><strong>TOTAL:</strong></span>
                                <span>R$ 150,00</span>
                                <span>% 27,27</span>
                            </div>
                            <div className="service-order-template__form__content__data__hero">
                                <span><strong>RESTANTE:</strong></span>
                                <span>R$ 400,00</span>
                                <span>% 72,73</span>
                            </div>
                        </div>
                        <HeroSecundary title="" />
                        <TablePayment rows={["Dinheiro", "- R$100,00", "Lançamento dia 01 / 06 / 2023"]} />
                    </div>
                    <div className="service-order-template__form__content">
                        <HeroSecundary title="Dados da Receita" />
                        <Revenue
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

                            dateRegister={dateRegister}
                            setDateRegister={setDateRegister}
                            addition={addition}
                            setAddition={setAddition}
                            isButton={isButton}
                            setIsButton={setIsButton}
                            formatarSequenciaNumericaParaData={formatarSequenciaNumericaParaData}
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