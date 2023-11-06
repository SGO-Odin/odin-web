import { Dispatch, SetStateAction } from "react";
import { MdBuild, MdOutlineCalendarMonth } from "react-icons/md";
import './button-prescription.scss'

interface IButtonPrescription {
    isButton: string
    setIsButton: Dispatch<SetStateAction<string>>
    expirationDate?: string
}

export default function ButtonPrescription({ isButton, setIsButton, expirationDate }: IButtonPrescription) {
    if (expirationDate) {
        return (
            <button type="button" onClick={() => setIsButton(expirationDate)} className={`button-prescription ${isButton === expirationDate ? 'active' : ''}`}>
                <span className="icon">
                    <MdOutlineCalendarMonth size={16} />
                </span>
                {expirationDate}
            </button>
        );
    }
    return (
        <button type="button" onClick={() => setIsButton('')} className={`button-prescription ${isButton === '' ? 'active' : ''}`}>
            <span className="icon">
                <MdBuild size={16} />
            </span>
            Nova Receita
        </button>
    )
}
