import { handleFormatNumber } from "@/src/hook/format-number";
import { ButtonsSecundary } from "../buttons/secundary";
import { Select } from "../select";
import { TextField } from "../textField";
import { HeroSecundary } from "./hero-secundary";
import TablePayment from "./table-payment";
import { numberValidation } from "@/src/hook/validation-number";
import { IItemSelect } from "@/src/interface/utils";
import { Dispatch, SetStateAction } from "react";
import { IPayment } from "@/src/interface/datas";
import './method-payment-card.scss'

interface IMethodPaymentCard {
    currentTypeCard: number
    handleTypeCard: (typeCard: number) => void
    optionsTypeCard: IItemSelect[]
    paymentDown: string
    setPaymentDown: Dispatch<SetStateAction<string>>
    dateRelease: string
    setDateRelease: Dispatch<SetStateAction<string>>
    parcelNumber: string
    setParcelNumber: Dispatch<SetStateAction<string>>
    type: "" | "CREDIT_CARD" | "DEBIT_CARD" | "MONEY" | "PIX"
    handleDataPayment: () => void
    isInforPayment: boolean
    totalPaid: string
    percentTotalPaid: string
    remainingAmount: string
    percentRemainingAmount: string
    payment: IPayment[]
    handleDeleteRowPayment?: (_id: number) => void
}

export default function MethodPaymentCard({
    currentTypeCard,
    handleTypeCard,
    optionsTypeCard,
    paymentDown,
    setPaymentDown,
    dateRelease,
    setDateRelease,
    parcelNumber,
    setParcelNumber,
    type,
    handleDataPayment,
    isInforPayment,
    totalPaid,
    percentTotalPaid,
    remainingAmount,
    percentRemainingAmount,
    payment,
    handleDeleteRowPayment,
}: IMethodPaymentCard) {
    return (
        <div className="method-payment-card__form__content">
            <HeroSecundary title="Forma de pagamento" />
            <div className="method-payment-card__form__content__inputs">
                <div className="input">
                    <Select
                        item={currentTypeCard}
                        setItem={handleTypeCard}
                        placeholder='Selecione um tipo Pagameto'
                        label="FORMA DE PAGAMENTO::"
                        options={optionsTypeCard} />
                </div>
                <div className="input">
                    <TextField
                        name="paymentDown"
                        placeholder='0,00'
                        value={handleFormatNumber(paymentDown)}
                        onChange={(ev) => setPaymentDown(ev.target.value)}
                        label="VALOR (R$):"
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
                        id="dateRelease" />
                </div>
                <div className="input">
                    <TextField
                        name="parcelNumber"
                        placeholder="ex: 5"
                        value={parcelNumber}
                        onChange={(ev) => setParcelNumber(numberValidation(ev.target.value))}
                        label="QTD. PARCELAS:"
                        id="parcelNumber"
                        disabled={type != 'CREDIT_CARD' ? true : false} />
                </div>
                <div className="input">
                    <ButtonsSecundary onClick={handleDataPayment} type='button'>
                        Registrar
                    </ButtonsSecundary>
                </div>
            </div>
            {isInforPayment && (
                <div className="method-payment-card__form__content__data">
                    <div className="method-payment-card__form__content__data__hero">
                        <span><strong>TOTAL PAGO (R$):</strong></span>
                        <span>R$ {handleFormatNumber(totalPaid)}</span>
                        <span>% {percentTotalPaid}</span>
                    </div>
                    <div className="method-payment-card__form__content__data__hero">
                        <span><strong>RESTANTE DO MONTANTE (R$):</strong></span>
                        <span>R$ {handleFormatNumber(remainingAmount)}</span>
                        <span>% {percentRemainingAmount}</span>
                    </div>
                </div>
            )}
            {isInforPayment && (<HeroSecundary title="" />)}
            {isInforPayment && (<TablePayment rows={payment} onClick={handleDeleteRowPayment} />)}
        </div>
    );
}
