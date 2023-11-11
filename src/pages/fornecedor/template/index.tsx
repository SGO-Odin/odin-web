import LayoutDefault from "@/src/components/layoutDefault";
import "./add-purveyor.scss";
import { TextField } from "@/src/components/textField";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { MdCancel, MdLocalShipping } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { Hero } from "@/src/components/hero";
import { Toggle } from "@/src/components/toggle";
import Address from "@/src/components/commons/address";

interface IPurveyorFormTemplate {
    companyName: string
    setCompanyName: Dispatch<SetStateAction<string>>
    tradingName: string
    setTradingName: Dispatch<SetStateAction<string>>
    isLaboratory: boolean
    setIsLaboratory: Dispatch<SetStateAction<boolean>>

    zipCode: string
    setZipCode: Dispatch<SetStateAction<string>>
    acronym: string
    setAcronym: Dispatch<SetStateAction<string>>
    stateName: string
    setStateName: Dispatch<SetStateAction<string>>
    isFederalDistrict: boolean
    setIsFederalDistrict: Dispatch<SetStateAction<boolean>>
    publicPlaceName: string
    setPublicPlaceName: Dispatch<SetStateAction<string>>
    publicPlaceType: string
    setPublicPlaceType: Dispatch<SetStateAction<string>>
    district: string
    setDistrict: Dispatch<SetStateAction<string>>
    number: string
    setNumber: Dispatch<SetStateAction<string>>
    complement: string
    setComplement: Dispatch<SetStateAction<string>>
    reference: string
    setReference: Dispatch<SetStateAction<string>>
    city: string
    setCity: Dispatch<SetStateAction<string>>

    handleSupplier: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    goBack: () => void
    title: string
    paragraph: string
}

export default function PurveyorFormTemplate({
    companyName,
    setCompanyName,
    tradingName,
    setTradingName,
    isLaboratory,
    setIsLaboratory,

    zipCode,
    setZipCode,
    acronym,
    setAcronym,
    stateName,
    setStateName,
    isFederalDistrict,
    setIsFederalDistrict,
    publicPlaceName,
    setPublicPlaceName,
    publicPlaceType,
    setPublicPlaceType,
    district,
    setDistrict,
    number,
    setNumber,
    complement,
    setComplement,
    reference,
    setReference,
    city,
    setCity,

    handleSupplier,
    goBack,
    title,
    paragraph
}: IPurveyorFormTemplate) {
    return (
        <LayoutDefault>
            <div className="add-purveyor">
                <form onSubmit={handleSupplier} className="add-purveyor__form">
                    <Hero
                        isButtonPrymary={false}
                        title={title}
                        paragraph={paragraph}>
                        <div className="add-purveyor__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="tradingName"
                                    placeholder="Digite o nome fantasia"
                                    value={tradingName}
                                    onChange={(ev) => setTradingName(ev.target.value)}
                                    label="NOME FANTASIA"
                                    id="tradingName"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="companyName"
                                    placeholder="Digite a razão social"
                                    value={companyName}
                                    onChange={(ev) => setCompanyName(ev.target.value)}
                                    label="RAZÃO SOCIAL"
                                    id="companyName"
                                    required={true}
                                />
                            </div>
                            <div className="add-purveyor__form__content__inputs">
                                <Toggle
                                    label="LABORATÓRIO"
                                    name="toggle-supplier"
                                    id="toggle-supplier"
                                    isActive={isLaboratory}
                                    onChange={(ev) => setIsLaboratory(ev.target.checked)} />
                            </div>
                        </div>
                    </Hero>
                    <div className="add-purveyor__form__content">
                        <header className="add-purveyor__form__content__header">
                            <h2 className="add-purveyor__form__content__header__title">
                                Endereço
                            </h2>
                            <hr className="menu__mobile__line" />
                        </header>
                        <Address
                            zipCode={zipCode}
                            setZipCode={setZipCode}
                            acronym={acronym}
                            setAcronym={setAcronym}
                            stateName={stateName}
                            setStateName={setStateName}
                            isFederalDistrict={isFederalDistrict}
                            setIsFederalDistrict={setIsFederalDistrict}
                            publicPlaceName={publicPlaceName}
                            setPublicPlaceName={setPublicPlaceName}
                            publicPlaceType={publicPlaceType}
                            setPublicPlaceType={setPublicPlaceType}
                            district={district}
                            setDistrict={setDistrict}
                            number={number}
                            setNumber={setNumber}
                            complement={complement}
                            setComplement={setComplement}
                            reference={reference}
                            setReference={setReference}
                            city={city}
                            setCity={setCity}
                        />
                    </div>
                    <div className="add-purveyor__form__buttons">
                        <div>
                            <ButtonsTertiary type="button" onClick={() => goBack()}>
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