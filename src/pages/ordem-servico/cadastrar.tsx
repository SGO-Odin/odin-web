import { useRouter } from "next/navigation";
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import ServiceOrderFormTemplate from "./template"
import { IPayment, IRowsProductTable } from "@/src/interface/datas";
import axios from "axios";
import { ICreateServiceOrderReq, ICreateServiceOrderRes, IPrescription, IProductServiceOrder, IVisionProblems } from "@/src/server/entities/service-order";

export default function NewServiceOrder() {
    const { push } = useRouter();
    const [isButton, setIsButton] = useState<string>('')

    const [numberOS, setNumberOS] = useState<string>("")
    const [dateRegister, setDateRegister] = useState<string>("")
    const [hourRegister, setHourRegister] = useState<string>("")
    const [idClient, setIdClient] = useState<number>(null)

    const [idProduct, setIdProduct] = useState<number>(null)
    const [quantity, setQuantity] = useState<string>("")
    const [coast, setCoast] = useState<string>("")

    const [dataProduct, setDataProduct] = useState<IRowsProductTable[]>([])
    const [serviceOrderProducts, setServiceOrderProducts] = useState<IProductServiceOrder[]>([])

    const [percentDiscount, setPercentDiscount] = useState<string>("")
    const [discount, setDiscount] = useState<string>("")
    const [percentAdditional, setPercentAdditional] = useState<string>("")
    const [additional, setAdditional] = useState<string>("")
    const [valueTotal, setValueTotal] = useState<string>("")
    const [valueAmount, setValueAmount] = useState<string>("")

    const [type, setType] = useState<'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | ''>('')
    const [dateRelease, setDateRelease] = useState<string>("")
    const [parcelNumber, setParcelNumber] = useState<string>("")
    const [paymentDown, setPaymentDown] = useState<string>("")

    const [payment, setPayment] = useState<IPayment[]>([])

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
    const [prescription, setPrescription] = useState<IPrescription>(null)
    const [datePrescription, setDatePrescription] = useState<string>("")

    const [orderServiceClient, setOrderServiceClient] = useState<ICreateServiceOrderRes[]>([])

    const handleAddPrescription = (): IPrescription => {
        const dataVisionProblem: IVisionProblems[] = [
            {
                type: 'FAR',
                positionOfEyes: 'RIGHT',
                spherical: Number(sanitizeData(skewerFarOD)),
                cylinder: Number(sanitizeData(cylindricalFarOD)),
                axis: Number(sanitizeData(axisFarOD)),
                npd: Number(sanitizeData(DNPFarOD)),
                height: Number(sanitizeData(heightFarOD)),
            },
            {
                type: 'FAR',
                positionOfEyes: 'LEFT',
                spherical: Number(sanitizeData(skewerFarOE)),
                cylinder: Number(sanitizeData(cylindricalFarOE)),
                axis: Number(sanitizeData(axisFarOE)),
                npd: Number(sanitizeData(DNPFarOE)),
                height: Number(sanitizeData(heightFarOE)),
            },
            {
                type: 'NEAR',
                positionOfEyes: 'RIGHT',
                spherical: Number(sanitizeData(skewerNearOD)),
                cylinder: Number(sanitizeData(cylindricalNearOD)),
                axis: Number(sanitizeData(axisNearOD)),
                npd: Number(sanitizeData(DNPNearOD)),
                height: Number(sanitizeData(heightNearOD)),
            },
            {
                type: 'NEAR',
                positionOfEyes: 'LEFT',
                spherical: Number(sanitizeData(skewerNearOE)),
                cylinder: Number(sanitizeData(cylindricalNearOE)),
                axis: Number(sanitizeData(axisNearOE)),
                npd: Number(sanitizeData(DNPNearOE)),
                height: Number(sanitizeData(heightNearOE)),
            },
        ]

        const dataPrescription: IPrescription = {
            expirationDate: dateRegister,
            additional: Number(sanitizeData(addition)),
            visionProblems: dataVisionProblem
        }

        return dataPrescription
    }

    const sanitizeData = (data: string): string => {
        if (!data) return null
        return data.replace(/\D/g, '')
    }

    const handleNewServiceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const data: ICreateServiceOrderReq = {
            number: Number(numberOS),
            client: idClient,
            discountValue: Number(sanitizeData(discount)),
            additionalValue: Number(sanitizeData(additional)),
            prescription: handleAddPrescription(),
            products: serviceOrderProducts
        }

        // const data: ICreateServiceOrderReq = {
        //     number: Number(numberOS),
        //     client: idClient,
        //     discountValue: Number(sanitizeData(discount)),
        //     additionalValue: Number(sanitizeData(additional)),
        //     prescription: handleAddPrescription(),
        //     products: serviceOrderProducts,
        //     dateRegister: dateRegister,
        //     hourRegister: hourRegister,
        //     payment: payment
        // }

        // create
        await axios.post('/api/service-order', data)
            .then((response) => {

                // GoBack()
                if (response.status == 201) goBack()
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    const goBack = () => {
        push('/ordem-servico')
    }

    return (
        <ServiceOrderFormTemplate
            isButton={isButton}
            setIsButton={setIsButton}

            numberOS={numberOS}
            setNumberOS={setNumberOS}
            dateRegister={dateRegister}
            setDateRegister={setDateRegister}
            hourRegister={hourRegister}
            setHourRegister={setHourRegister}
            client={idClient}
            setClient={setIdClient}

            idProduct={idProduct}
            setIdProduct={setIdProduct}
            quantity={quantity}
            setQuantity={setQuantity}
            coast={coast}
            setCoast={setCoast}

            dataProduct={dataProduct}
            setDataProduct={setDataProduct}
            serviceOrderProducts={serviceOrderProducts}
            setServiceOrderProducts={setServiceOrderProducts}

            percentDiscount={percentDiscount}
            setPercentDiscount={setPercentDiscount}
            discount={discount}
            setDiscount={setDiscount}
            percentAdditional={percentAdditional}
            setPercentAdditional={setPercentAdditional}
            additional={additional}
            setAdditional={setAdditional}
            valueTotal={valueTotal}
            setValueTotal={setValueTotal}
            valueAmount={valueAmount}
            setValueAmount={setValueAmount}

            type={type}
            setType={setType}
            dateRelease={dateRelease}
            setDateRelease={setDateRelease}
            parcelNumber={parcelNumber}
            setParcelNumber={setParcelNumber}
            paymentDown={paymentDown}
            setPaymentDown={setPaymentDown}

            payment={payment}
            setPayment={setPayment}

            // Dados da Receita Longe OD
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

            // Dados da Receita Longe OE
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

            // Dados da Receita Perto OD
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

            // Dados da Receita Perto OE
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

            addition={addition}
            setAddition={setAddition}
            datePrescription={datePrescription}
            setDatePrescription={setDatePrescription}

            handleServiceOrder={handleNewServiceOrder}
            goBack={goBack}
            title={"Cadastrar O.S."}
            paragraph={"Registre e acompanhe os pedidos dos clientes de forma organizada e eficiente."}

            prescription={prescription}
            setPrescription={setPrescription}

            orderServiceClient={orderServiceClient}
            setOrderServiceClient={setOrderServiceClient}
        />
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