import { Dispatch, SetStateAction } from "react";
import { TextField } from "../textField";
import './card-revenue.scss'

interface ICardRevenue {
    title: string
    skewerOD: string
    setSkewerOD: Dispatch<SetStateAction<string>>
    cylindricalOD: string
    setCylindricalOD: Dispatch<SetStateAction<string>>
    axisOD: string
    setAxisOD: Dispatch<SetStateAction<string>>
    DNPOD: string
    setDNPOD: Dispatch<SetStateAction<string>>
    heightOD: string
    setHeightOD: Dispatch<SetStateAction<string>>
    skewerOE: string
    setSkewerOE: Dispatch<SetStateAction<string>>
    cylindricalOE: string
    setCylindricalOE: Dispatch<SetStateAction<string>>
    axisOE: string
    setAxisOE: Dispatch<SetStateAction<string>>
    DNPOE: string
    setDNPOE: Dispatch<SetStateAction<string>>
    heightOE: string
    setHeightOE: Dispatch<SetStateAction<string>>
}

export default function CardRevenue({
    title,
    skewerOD,
    setSkewerOD,
    cylindricalOD,
    setCylindricalOD,
    axisOD,
    setAxisOD,
    DNPOD,
    setDNPOD,
    heightOD,
    setHeightOD,
    skewerOE,
    setSkewerOE,
    cylindricalOE,
    setCylindricalOE,
    axisOE,
    setAxisOE,
    DNPOE,
    setDNPOE,
    heightOE,
    setHeightOE,
}: ICardRevenue) {
    return (
        <div className="card-revenue">
            <span className="card-revenue__label">{title}</span>
            <div className="card-revenue__input">
                <span className="card-revenue__input__text">OD:</span>
                <TextField
                    name={skewerOD}
                    placeholder="0.25"
                    value={skewerOD}
                    onChange={(ev) => setSkewerOD(ev.target.value)}
                    label="ESFÉRICO"
                    id={skewerOD}
                />
                <TextField
                    name={cylindricalOD}
                    placeholder="0.25"
                    value={cylindricalOD}
                    onChange={(ev) => setCylindricalOD(ev.target.value)}
                    label="CILÍNDRICO"
                    id={cylindricalOD}
                />
                <TextField
                    name={axisOD}
                    placeholder="0.25"
                    value={axisOD}
                    onChange={(ev) => setAxisOD(ev.target.value)}
                    label="EIXO"
                    id={axisOD}
                />
                <TextField
                    name={DNPOD}
                    placeholder="0.25"
                    value={DNPOD}
                    onChange={(ev) => setDNPOD(ev.target.value)}
                    label="DNP"
                    id={DNPOD}
                />
                <TextField
                    name={heightOD}
                    placeholder="0.25"
                    value={heightOD}
                    onChange={(ev) => setHeightOD(ev.target.value)}
                    label="ALTURA"
                    id={heightOD}
                />
            </div>
            <div className="card-revenue__input">
                <span className="card-revenue__input__text">OE:</span>
                <TextField
                    name={skewerOE}
                    placeholder="0.25"
                    value={skewerOE}
                    onChange={(ev) => setSkewerOE(ev.target.value)}
                    label="ESFÉRICO"
                    id={skewerOE}
                />
                <TextField
                    name={cylindricalOE}
                    placeholder="0.25"
                    value={cylindricalOE}
                    onChange={(ev) => setCylindricalOE(ev.target.value)}
                    label="CILÍNDRICO"
                    id={cylindricalOE}
                />
                <TextField
                    name={axisOE}
                    placeholder="0.25"
                    value={axisOE}
                    onChange={(ev) => setAxisOE(ev.target.value)}
                    label="EIXO"
                    id={axisOE}
                />
                <TextField
                    name={DNPOE}
                    placeholder="0.25"
                    value={DNPOE}
                    onChange={(ev) => setDNPOE(ev.target.value)}
                    label="DNP"
                    id={DNPOE}
                />
                <TextField
                    name={heightOE}
                    placeholder="0.25"
                    value={heightOE}
                    onChange={(ev) => setHeightOE(ev.target.value)}
                    label="ALTURA"
                    id={heightOE}
                />
            </div>
        </div>
    );
}
