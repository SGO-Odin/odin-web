import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IOrderService, IPayment, IPrescription, IRowsProductTable, IServiceOrderProducts, IVisionProblem } from "@/src/interface/datas";
import ServiceOrderFormTemplate from "../template";
import { IPaymentFormTemplate } from "@/src/interface/utils";
import typeCard from '@/src/data/typeCard.json'
import { v4 as uuid } from "uuid";

export default function EditServiceOrderPage() {
    const router = useRouter()
    const { id } = router.query

    const [isButton, setIsButton] = useState<string>('')

    const [numberOS, setNumberOS] = useState<string>("")
    const [dateRegister, setDateRegister] = useState<string>("")
    const [hourRegister, setHourRegister] = useState<string>("")
    const [idClient, setIdClient] = useState<number>(null)

    const [idProduct, setIdProduct] = useState<number>(null)
    const [quantity, setQuantity] = useState<string>("")
    const [coast, setCoast] = useState<string>("")

    const [dataProduct, setDataProduct] = useState<IRowsProductTable[]>([])
    const [serviceOrderProducts, setServiceOrderProducts] = useState<IServiceOrderProducts[]>([])

    const [percentDiscount, setPercentDiscount] = useState<string>("")
    const [discount, setDiscount] = useState<string>("")
    const [percentAdditional, setPercentAdditional] = useState<string>("")
    const [additional, setAdditional] = useState<string>("")
    const [valueTotal, setValueTotal] = useState<string>("")
    const [valueAmount, setValueAmount] = useState<string>("")

    const [type, setType] = useState<'CREDIT_CARD' | 'DEBIT_CARD' | 'MONEY' | 'PIX' | null>(null)
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
    const [datePrescription, setDatePrescription] = useState<string>("")

    const [prescription, setPrescription] = useState<IPrescription[]>([])

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/service-order?id=' + id)
            .then(response => {
                setNumberOS(response.data.number)
                setDateRegister(response.data.dateRegister)
                setHourRegister(response.data.hourRegister)
                setIdClient(response.data.client)

                setServiceOrderProducts(response.data.products)

                setDiscount(response.data.dicountValue)
                setAdditional(response.data.additionalValue)

                setPayment(response.data.payment)

                setPrescription(response.data.prescription)
                setIsButton(response.data.prescription[response.data.prescription.length - 1].expirationDate)

                // Define Rows Product
                axios.get('/api/product').then(product => {
                    const jokerList = []
                    response.data.products.forEach((item) => {

                        const jokerDataProduct = product.data.find((product) => product._id === item.idProduct ? product : null)

                        if (jokerDataProduct) {
                            const response = dataProduct.find((response) => response._id === jokerDataProduct._id ? response : null)

                            if (!response) {
                                const data: IRowsProductTable = {
                                    _id: jokerDataProduct._id,
                                    ref: jokerDataProduct.reference,
                                    unidade: jokerDataProduct.unit,
                                    produto: jokerDataProduct.nameProduct,
                                    quantidade: item.quantity,
                                    valueUnit: jokerDataProduct.selling,
                                    valueTot: item.salesPrice,
                                }

                                jokerList.push(data)
                            }

                        }
                    })
                    setDataProduct(jokerList)
                })
            })



    }, [id])

    const handleAddPrescription = () => {
        const dataVisionProblem: IVisionProblem[] = [
            {
                type: 'FAR',
                positionOfEyes: 'RIGHT',
                spherical: skewerFarOD,
                cylinder: cylindricalFarOD,
                axis: axisFarOD,
                npd: DNPFarOD,
                height: heightFarOD,
            },
            {
                type: 'FAR',
                positionOfEyes: 'LEFT',
                spherical: skewerFarOE,
                cylinder: cylindricalFarOE,
                axis: axisFarOE,
                npd: DNPFarOE,
                height: heightFarOE,
            },
            {
                type: 'NEAR',
                positionOfEyes: 'RIGHT',
                spherical: skewerNearOD,
                cylinder: cylindricalNearOD,
                axis: axisNearOD,
                npd: DNPNearOD,
                height: heightNearOD,
            },
            {
                type: 'NEAR',
                positionOfEyes: 'LEFT',
                spherical: skewerNearOE,
                cylinder: cylindricalNearOE,
                axis: axisNearOE,
                npd: DNPNearOE,
                height: heightNearOE,
            },
        ]

        const dataPrescription: IPrescription = {
            expirationDate: datePrescription,
            additional: addition,
            problems: dataVisionProblem
        }

        return dataPrescription
    }

    const sanitizeData = (data: string): string => {
        return data.replace(/\D/g, '')
    }

    const handleUpdateServiceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let data: IOrderService;
        if (isButton === '') {
            data = {
                number: numberOS,
                client: idClient,
                dicountValue: sanitizeData(discount),
                additionalValue: sanitizeData(additional),
                prescription: [...prescription, handleAddPrescription()],
                products: serviceOrderProducts,
                dateRegister: dateRegister,
                hourRegister: hourRegister,
                payment: payment
            }
        } else {
            data = {
                number: numberOS,
                client: idClient,
                dicountValue: sanitizeData(discount),
                additionalValue: sanitizeData(additional),
                prescription: prescription,
                products: serviceOrderProducts,
                dateRegister: dateRegister,
                hourRegister: hourRegister,
                payment: payment
            }
        }

        // // update
        await axios.put('/api/service-order', { ...data, id })

        goBack()
    }

    useEffect(() => {
        if (isButton === '') {
            // Dados da Receita Longe OD
            setSkewerFarOD(" ")
            setCylindricalFarOD(" ")
            setAxisFarOD(" ")
            setDNPFarOD(" ")
            setHeightFarOD(" ")

            // Dados da Receita Longe OE
            setSkewerFarOE(" ")
            setCylindricalFarOE(" ")
            setAxisFarOE(" ")
            setDNPFarOE(" ")
            setHeightFarOE(" ")

            // Dados da Receita Perto OD
            setSkewerNearOD(" ")
            setCylindricalNearOD(" ")
            setAxisNearOD(" ")
            setDNPNearOD(" ")
            setHeightNearOD(" ")

            // Dados da Receita Perto OE
            setSkewerNearOE(" ")
            setCylindricalNearOE(" ")
            setAxisNearOE(" ")
            setDNPNearOE(" ")
            setHeightNearOE(" ")

            setAddition(" ")
            setDatePrescription(" ")
        } else {
            const currentPrescription = prescription.find((item) => item.expirationDate == isButton ? item : null)

            if (currentPrescription) {
                setAddition(currentPrescription.additional)
                setDatePrescription(currentPrescription.expirationDate)

                currentPrescription.problems.map((item) => {
                    if (item.type == 'FAR' && item.positionOfEyes == 'RIGHT') {
                        // Dados da Receita Longe OD
                        setSkewerFarOD(item.spherical)
                        setCylindricalFarOD(item.cylinder)
                        setAxisFarOD(item.axis)
                        setDNPFarOD(item.npd)
                        setHeightFarOD(item.height)
                    } else if (item.type == 'FAR' && item.positionOfEyes == 'LEFT') {
                        // Dados da Receita Longe OD
                        setSkewerFarOE(item.spherical)
                        setCylindricalFarOE(item.cylinder)
                        setAxisFarOE(item.axis)
                        setDNPFarOE(item.npd)
                        setHeightFarOE(item.height)
                    } else if (item.type == 'NEAR' && item.positionOfEyes == 'RIGHT') {
                        // Dados da Receita Longe OD
                        setSkewerNearOD(item.spherical)
                        setCylindricalNearOD(item.cylinder)
                        setAxisNearOD(item.axis)
                        setDNPNearOD(item.npd)
                        setHeightNearOD(item.height)
                    } else if (item.type == 'NEAR' && item.positionOfEyes == 'LEFT') {
                        // Dados da Receita Longe OD
                        setSkewerNearOE(item.spherical)
                        setCylindricalNearOE(item.cylinder)
                        setAxisNearOE(item.axis)
                        setDNPNearOE(item.npd)
                        setHeightNearOE(item.height)
                    }
                })
            }
        }

    }, [isButton])

    const goBack = () => {
        router.push('/ordem-servico')
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

            handleServiceOrder={handleUpdateServiceOrder}
            goBack={goBack}
            title={`Editar O.S. ${numberOS}`}
            paragraph={"Atualize detalhes, como data, produtos e notas, para manter registros precisos e eficientes."}

            prescription={prescription}
            setPrescription={setPrescription}
        />
    );
}