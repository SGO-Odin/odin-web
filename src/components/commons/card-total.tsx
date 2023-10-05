import { MdPercent } from 'react-icons/md';
import './card-total.scss'
import { FaBrazilianRealSign } from 'react-icons/fa6';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormatNumberReais } from '@/src/hook/format-number-reais';

interface ICardTotal {
    valueTotal: string
    setValueTotal: Dispatch<SetStateAction<string>>
    valueAmount: string
    setValueAmount: Dispatch<SetStateAction<string>>

    percentDiscount: string
    setPercentDiscount: Dispatch<SetStateAction<string>>
    discount: string
    setDiscount: Dispatch<SetStateAction<string>>
    percentAdditional: string
    setPercentAdditional: Dispatch<SetStateAction<string>>
    additional: string
    setAdditional: Dispatch<SetStateAction<string>>
}

export default function CardTotal({
    valueTotal,
    setValueTotal,
    valueAmount,
    setValueAmount,
    percentDiscount,
    setPercentDiscount,
    discount,
    setDiscount,
    percentAdditional,
    setPercentAdditional,
    additional,
    setAdditional }: ICardTotal) {

    const handleUpdateValueAmount = () => {
        if (additional != "" && discount != "") {
            setValueAmount(((parseFloat(valueTotal) + parseFloat(additional)) - parseFloat(discount)).toString())
        } else if (additional != "") {
            setValueAmount((parseFloat(valueTotal) + parseFloat(additional)).toString())
        } else {
            setValueAmount((parseFloat(valueTotal) - parseFloat(discount)).toString())
        }
    }

    useEffect(() => {
        if (additional != "") {
            setPercentAdditional(((parseFloat(additional) / parseFloat(valueTotal)) * 100).toFixed(2).toString())
        } else {
            setPercentAdditional("0")
        }
        handleUpdateValueAmount()
    }, [additional])

    useEffect(() => {
        if (percentAdditional != "") {
            setAdditional(((parseFloat(valueTotal) * parseFloat(percentAdditional)) / 100).toFixed(2).toString())
        } else {
            setAdditional("0")
        }
        handleUpdateValueAmount()
    }, [percentAdditional])

    useEffect(() => {
        if (discount != "") {
            setPercentDiscount(((parseFloat(discount) / parseFloat(valueTotal)) * 100).toFixed(2).toString())
        } else {
            setDiscount("0")
        }
        handleUpdateValueAmount()
    }, [discount])

    useEffect(() => {
        if (percentDiscount != "") {
            setDiscount(((parseFloat(valueTotal) * parseFloat(percentDiscount)) / 100).toFixed(2).toString())
        } else {
            setDiscount("0")
        }
        handleUpdateValueAmount()
    }, [percentDiscount])

    return (
        <div className="card-total">
            <div className="card-total__container">
                <span className="card-total__container__text">
                    VALOR TOTAL:
                </span>
                <span className="card-total__container__text">
                    {`${useFormatNumberReais(Number(valueTotal))}`}
                </span>
            </div>
            <div className="card-total__container">
                <span className="card-total__container__text">DESCONTO:</span>
                <label htmlFor="percent-discount" className="card-total__container__input">
                    <MdPercent size={24} />
                    <input value={percentDiscount} onChange={(ev) => setPercentDiscount(ev.target.value)} type="text" name="percent-discount" id="percent-discount" className="card-total__container__input__text" />
                </label>
                <label htmlFor="discount" className="card-total__container__input">
                    <FaBrazilianRealSign size={24} />
                    <input value={discount} onChange={(ev) => setDiscount(ev.target.value)} type="text" name="discount" id="discount" className="card-total__container__input__text" />
                </label>
            </div>
            <div className="card-total__container">
                <span className="card-total__container__text">ACRÉCIMO:</span>
                <label htmlFor="percent-additional" className="card-total__container__input">
                    <MdPercent size={24} />
                    <input value={percentAdditional} onChange={(ev) => setPercentAdditional(ev.target.value)} type="text" name="percent-additional" id="percent-additional" className="card-total__container__input__text" />
                </label>
                <label htmlFor="additional" className="card-total__container__input">
                    <FaBrazilianRealSign size={24} />
                    <input value={additional} onChange={(ev) => setAdditional(ev.target.value)} type="text" name="additional" id="additional" className="card-total__container__input__text" />
                </label>
            </div>
            <div className="card-total__container">
                <span className="card-total__container__text">VALOR LIQUIDO:</span>
                <span className="card-total__container__text">{`${useFormatNumberReais(Number(valueAmount))}`}</span>
            </div>
        </div>
    );
}
