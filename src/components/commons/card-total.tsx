import { MdPercent } from 'react-icons/md'
import './card-total.scss'
import { FaBrazilianRealSign } from 'react-icons/fa6'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { handleFormatNumber } from '@/src/hook/format-number'
import { handlePercent } from '@/src/hook/percent'

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
        if (!additional || !discount) return null
        const valueAdditional = additional.replace(/\D/g, '') // Retira qualquer caracter não numerico
        const valueDiscount = discount.replace(/\D/g, '') // Retira qualquer caracter não numerico

        let calc


        if (valueAdditional != "" && valueDiscount != "") {
            calc = (Number(valueTotal) + Number(valueAdditional)) - Number(valueDiscount)
        } else if (valueAdditional != "") {
            calc = Number(valueTotal) + Number(valueAdditional)
        } else if (valueDiscount != "") {
            calc = Number(valueTotal) - Number(valueDiscount)
        } else {
            calc = valueTotal
        }
        setValueAmount(calc.toString())
    }

    useEffect(() => {

        if (valueTotal) {
            const value = valueTotal.replace(/\D/g, '') // Retira qualquer caracter não numerico

            if (Number(value) > 0) {
                handleUpdateValueAmount()
            } else {
                setAdditional('')
                setDiscount('')
                handleUpdateValueAmount()
            }
        }
    }, [valueTotal])

    useEffect(() => {
        if (additional != "") {
            setPercentAdditional(handlePercent(additional, valueTotal))
        } else {
            setPercentAdditional("")
        }
        handleUpdateValueAmount()
    }, [additional, valueTotal])

    useEffect(() => {
        if (discount != "") {
            setPercentDiscount(handlePercent(discount, valueTotal))
        } else {
            setPercentDiscount("")
        }
        handleUpdateValueAmount()
    }, [discount, valueTotal])


    return (
        <div className="card-total">
            <div className="card-total__container">
                <span className="card-total__container__text">
                    VALOR TOTAL:
                </span>
                <span className="card-total__container__text">
                    {`${handleFormatNumber(valueTotal)}`}
                </span>
            </div>
            <div className="card-total__container">
                <span className="card-total__container__text">DESCONTO:</span>
                <label htmlFor="percent-discount" className="card-total__container__input">
                    <MdPercent size={24} />
                    <input placeholder='0' value={percentDiscount} onChange={(ev) => setPercentDiscount(ev.target.value)} type="text" name="percent-discount" id="percent-discount" className="card-total__container__input__text" disabled={true} />
                </label>
                <label htmlFor="discount" className="card-total__container__input">
                    <FaBrazilianRealSign size={24} />
                    <input placeholder='0' value={handleFormatNumber(discount)} onChange={(ev) => setDiscount(ev.target.value)} type="text" name="discount" id="discount" className="card-total__container__input__text" />
                </label>
            </div>
            <div className="card-total__container">
                <span className="card-total__container__text">ACRÉCIMO:</span>
                <label htmlFor="percent-additional" className="card-total__container__input">
                    <MdPercent size={24} />
                    <input placeholder='0' value={percentAdditional} onChange={(ev) => setPercentAdditional(ev.target.value)} type="text" name="percent-additional" id="percent-additional" className="card-total__container__input__text" disabled={true} />
                </label>
                <label htmlFor="additional" className="card-total__container__input">
                    <FaBrazilianRealSign size={24} />
                    <input placeholder='0' value={handleFormatNumber(additional)} onChange={(ev) => setAdditional(ev.target.value)} type="text" name="additional" id="additional" className="card-total__container__input__text" />
                </label>
            </div>
            <div className="card-total__container">
                <span className="card-total__container__text">VALOR LIQUIDO:</span>
                <span className="card-total__container__text">{`${handleFormatNumber(`${valueAmount}`)}`}</span>
            </div>
        </div>
    )
}
