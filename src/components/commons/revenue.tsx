import { MdBuild, MdOutlineCalendarMonth } from "react-icons/md";
import { TextField } from "../textField";
import './revenue.scss'
import { Dispatch, SetStateAction } from "react";
import CardRevenue from "./card-revenue";

interface IRevenue {
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

    dateRegister: string
    setDateRegister: Dispatch<SetStateAction<string>>
    addition: string
    setAddition: Dispatch<SetStateAction<string>>
    isButton: "1" | "2" | "3"
    setIsButton: Dispatch<SetStateAction<"1" | "2" | "3">>

    formatarSequenciaNumericaParaData(value: string): string
}

export default function Revenue({
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

    dateRegister,
    setDateRegister,
    addition,
    setAddition,
    isButton,
    setIsButton
}: IRevenue) {
    return (
        <div className="container-revenue">
            <aside className="container-revenue__aside">
                <button type="button" onClick={() => setIsButton("1")} className={`container-revenue__aside__button ${isButton === '1' ? 'active' : ''}`}>
                    <span className="icon">
                        <MdBuild size={24} />
                    </span>
                    Nova Receita
                </button>
                <button type="button" onClick={() => setIsButton("2")} className={`container-revenue__aside__button ${isButton === '2' ? 'active' : ''}`}>
                    <span className="icon">
                        <MdOutlineCalendarMonth size={24} />
                    </span>
                    25 / 11 / 2018
                </button>
                <button type="button" onClick={() => setIsButton("3")} className={`container-revenue__aside__button ${isButton === '3' ? 'active' : ''}`}>
                    <span className="icon">
                        <MdOutlineCalendarMonth size={24} />
                    </span>
                    25 / 11 / 2017
                </button>
            </aside>
            <section className="container-revenue__revenue">
                <div className="container-revenue__revenue__inputs">
                    <TextField
                        name="dateRegister"
                        value={dateRegister}
                        type="date"
                        onChange={(ev) => setDateRegister(ev.target.value)}
                        label="DATA DE REGISTRO:"
                        id="dateRegister"

                    />
                </div>
                <CardRevenue
                    title="Longe"
                    skewerOD={skewerFarOD}
                    setSkewerOD={setSkewerFarOD}
                    cylindricalOD={cylindricalFarOD}
                    setCylindricalOD={setCylindricalFarOD}
                    axisOD={axisFarOD}
                    setAxisOD={setAxisFarOD}
                    DNPOD={DNPFarOD}
                    setDNPOD={setDNPFarOD}
                    heightOD={heightFarOD}
                    setHeightOD={setHeightFarOD}
                    skewerOE={skewerFarOE}
                    setSkewerOE={setSkewerFarOE}
                    cylindricalOE={cylindricalFarOE}
                    setCylindricalOE={setCylindricalFarOE}
                    axisOE={axisFarOE}
                    setAxisOE={setAxisFarOE}
                    DNPOE={DNPFarOE}
                    setDNPOE={setDNPFarOE}
                    heightOE={heightFarOE}
                    setHeightOE={setHeightFarOE}
                />
                <CardRevenue
                    title="Perto"
                    skewerOD={skewerNearOD}
                    setSkewerOD={setSkewerNearOD}
                    cylindricalOD={cylindricalNearOD}
                    setCylindricalOD={setCylindricalNearOD}
                    axisOD={axisNearOD}
                    setAxisOD={setAxisNearOD}
                    DNPOD={DNPNearOD}
                    setDNPOD={setDNPNearOD}
                    heightOD={heightNearOD}
                    setHeightOD={setHeightNearOD}
                    skewerOE={skewerNearOE}
                    setSkewerOE={setSkewerNearOE}
                    cylindricalOE={cylindricalNearOE}
                    setCylindricalOE={setCylindricalNearOE}
                    axisOE={axisNearOE}
                    setAxisOE={setAxisNearOE}
                    DNPOE={DNPNearOE}
                    setDNPOE={setDNPNearOE}
                    heightOE={heightNearOE}
                    setHeightOE={setHeightNearOE}
                />
                <div className="container-revenue__revenue__inputs">
                    <TextField
                        name="addition"
                        placeholder="0.3"
                        value={addition}
                        onChange={(ev) => setAddition(ev.target.value)}
                        label="ADIÇÃO"
                        id="addition"
                    />
                </div>
            </section>
        </div>
    );
}
