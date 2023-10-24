import LayoutDefault from "@/src/components/layoutDefault";
import "../newSupplier.scss";
import { TextField } from "@/src/components/textField";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { MdCancel, MdLocalShipping } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from "react";
import { Hero } from "@/src/components/hero";
import { Toggle } from "@/src/components/toggle";

interface ISupplierFormTemplate {
    companyName: string
    setCompanyName: Dispatch<SetStateAction<string>>
    businessName: string
    setBusinessName: Dispatch<SetStateAction<string>>
    isLaboratory: boolean
    setIsLaboratory: Dispatch<SetStateAction<boolean>>
    zipCode: string
    setzipCode: Dispatch<SetStateAction<string>>
    address: string
    setAddress: Dispatch<SetStateAction<string>>
    district: string
    setDistrict: Dispatch<SetStateAction<string>>
    numberAddress: string
    setnumberAddress: Dispatch<SetStateAction<string>>
    complement: string
    setComplement: Dispatch<SetStateAction<string>>
    city: string
    setCity: Dispatch<SetStateAction<string>>
    handleSupplier: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    goBack: () => void
    title: string
    paragraph: string
}

export default function SupplierFormTemplate({
    companyName,
    setCompanyName,
    businessName,
    setBusinessName,
    isLaboratory,
    setIsLaboratory,
    zipCode,
    setzipCode,
    address,
    setAddress,
    district,
    setDistrict,
    numberAddress,
    setnumberAddress,
    complement,
    setComplement,
    city,
    setCity,
    handleSupplier,
    goBack,
    title,
    paragraph
}: ISupplierFormTemplate) {

    return (
        <LayoutDefault>
            <div className="newSupplier">
                <form onSubmit={handleSupplier} className="newSupplier__form">
                    <Hero
                        isButtonPrymary={false}
                        title={title}
                        paragraph={paragraph}>
                        <div className="newSupplier__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="companyName"
                                    placeholder=""
                                    value={companyName}
                                    onChange={(ev) => setCompanyName(ev.target.value)}
                                    label="NOME FANTASIA"
                                    id="companyName"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="businessName"
                                    placeholder=""
                                    value={businessName}
                                    onChange={(ev) => setBusinessName(ev.target.value)}
                                    label="RAZÃO SOCIAL"
                                    id="businessName"
                                    required={true}
                                />
                            </div>
                            <div className="newSupplier__form__content__inputs">
                                <Toggle
                                    label="LABORATÓRIO"
                                    name="toggle-supplier"
                                    id="toggle-supplier"
                                    isActive={isLaboratory}
                                    onChange={(ev) => setIsLaboratory(ev.target.checked)} />
                            </div>
                        </div>
                    </Hero>
                    <div className="newSupplier__form__content">
                        <header className="newSupplier__form__content__header">
                            <h2 className="newSupplier__form__content__header__title">
                                Endereço
                            </h2>
                            <hr className="menu__mobile__line" />
                        </header>
                        <div className="newSupplier__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="zipCode"
                                    placeholder=""
                                    value={zipCode}
                                    onChange={(ev) => setzipCode(ev.target.value)}
                                    label="CEP"
                                    id="zipCode"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="address"
                                    placeholder=""
                                    value={address}
                                    onChange={(ev) => setAddress(ev.target.value)}
                                    label="ENDEREÇO"
                                    id="address"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="district"
                                    placeholder=""
                                    value={district}
                                    onChange={(ev) => setDistrict(ev.target.value)}
                                    label="BAIRRO"
                                    id="district"
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="newSupplier__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="numberAddress"
                                    placeholder=""
                                    value={numberAddress}
                                    onChange={(ev) => setnumberAddress(ev.target.value)}
                                    label="NÚMERO"
                                    id="numberAddress"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="complement"
                                    placeholder=""
                                    value={complement}
                                    onChange={(ev) => setComplement(ev.target.value)}
                                    label="COMPLEMENTO"
                                    id="complement"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="city"
                                    placeholder=""
                                    value={city}
                                    onChange={(ev) => setCity(ev.target.value)}
                                    label="CIDADE"
                                    id="city"
                                    required={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="newSupplier__form__buttons">
                        <div>
                            <ButtonsTertiary onClick={() => goBack()}>
                                <MdCancel size={24} />
                                Cancelar
                            </ButtonsTertiary>
                        </div>
                        <div>
                            <ButtonsPrimary>
                                <MdLocalShipping size={24} />
                                Salvar Fornecedor
                            </ButtonsPrimary>
                        </div>
                    </div>
                </form>
            </div>
        </LayoutDefault>
    );
}