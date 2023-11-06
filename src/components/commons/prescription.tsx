import { MdBuild } from "react-icons/md";
import { TextField } from "../textField";
import './prescription.scss'
import { Dispatch, SetStateAction } from "react";
import { handleFormatNumber } from "@/src/hook/format-number";
import CardPrescription from "./card-prescription";
import { IPrescription } from "@/src/interface/datas";
import ButtonPrescription from "./button-prescription";

interface IPrescriptionComponents {
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

    datePrescription: string
    setDatePrescription: Dispatch<SetStateAction<string>>
    addition: string
    setAddition: Dispatch<SetStateAction<string>>
    isButton: string
    setIsButton: Dispatch<SetStateAction<string>>

    prescription: IPrescription[]
    setPrescription: Dispatch<SetStateAction<IPrescription[]>>
}

export default function Prescription({
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

    datePrescription,
    setDatePrescription,
    addition,
    setAddition,
    isButton,
    setIsButton,

    prescription,
    setPrescription,
}: IPrescriptionComponents) {
    return (
        <div className="container-prescription">
            <aside className="container-prescription__aside">
                <ButtonPrescription isButton={isButton} setIsButton={setIsButton} />
                {prescription.map((item) => (
                    <ButtonPrescription key={item.expirationDate} isButton={isButton} setIsButton={setIsButton} expirationDate={item.expirationDate} />
                ))}
            </aside>
            <section className="container-prescription__revenue">
                <div className="container-prescription__revenue__inputs">
                    <TextField
                        name="dateRegister"
                        value={datePrescription}
                        type="date"
                        onChange={(ev) => setDatePrescription(ev.target.value)}
                        label="DATA DE REGISTRO:"
                        id="dateRegister"

                    />
                </div>
                <CardPrescription
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
                <CardPrescription
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
                <div className="container-prescription__revenue__inputs">
                    <TextField
                        name="addition"
                        placeholder="0.3"
                        value={handleFormatNumber(addition)}
                        onChange={(ev) => setAddition(ev.target.value)}
                        label="ADIÇÃO"
                        id="addition"
                    />
                </div>
            </section>
        </div>
    );
}
