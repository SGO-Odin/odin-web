import './clientFormTemplate.scss'
import { ButtonsPrimary } from '@/src/components/buttons/primary';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import Address from '@/src/components/commons/address';
import { Hero } from '@/src/components/hero';
import LayoutDefault from '@/src/components/layoutDefault';
import { TextField } from '@/src/components/textField';
import { formatCPF } from '@/src/hook/format-cpf';
import { formatNumberWhatsapp } from '@/src/hook/format-number-whatsapp';
import { sanitalizePhones } from '@/src/hook/sanitalize-phones';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MdCancel, MdPerson } from 'react-icons/md';

interface IClientFormTemplate {
    firsName: string
    setFirsName: Dispatch<SetStateAction<string>>
    lastName: string
    setLastName: Dispatch<SetStateAction<string>>
    cpf: string
    setCpf: Dispatch<SetStateAction<string>>
    rg: string
    setRg: Dispatch<SetStateAction<string>>
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    phones: string
    setPhones: Dispatch<SetStateAction<string>>
    ddd: string
    setDDD: Dispatch<SetStateAction<string>>

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

    handleClient: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    goBack: () => void
    title: string
    paragraph: string
}

export default function ClientFormTemplate({
    firsName,
    setFirsName,
    lastName,
    setLastName,
    cpf,
    setCpf,
    rg,
    setRg,
    email,
    setEmail,
    phones,
    setPhones,
    ddd,
    setDDD,

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

    handleClient,
    goBack,
    title,
    paragraph,
}: IClientFormTemplate) {

    const [errorCPF, setErrorCPF] = useState<string>("")
    const [errorRG, setErrorRG] = useState<string>("")
    const [errorCEP, setErrorCEP] = useState<string>("")
    const [isButton, setIsButton] = useState<boolean>(true)

    const validateCPF = (cpf: string): boolean => {
        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verifica se o CPF não consiste em uma sequência de dígitos iguais
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        const primeiroDigitoVerificador = (soma * 10) % 11;

        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        const segundoDigitoVerificador = (soma * 10) % 11;

        // Verifica se os dígitos verificadores são iguais aos dígitos do CPF
        if (
            primeiroDigitoVerificador === parseInt(cpf.charAt(9)) &&
            segundoDigitoVerificador === parseInt(cpf.charAt(10))
        ) {
            return true;
        }

        return false;
    }

    const validateRG = (rg: string): boolean => {
        if (!rg) return null

        rg = rg.replace(/\D/g, '');

        if (rg.length < 7) {
            return false;
        }

        if (/^(\d)\1+$/.test(rg)) {
            return false;
        }

        // Mais Regras

        return true;
    }

    const formatRg = (value: string): string => {
        if (!value) return null

        rg = value.replace(/\D/g, '');

        if (!rg) return null
        return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    useEffect(() => {
        if (phones) {
            const completedPhone = sanitalizePhones(phones)
            setDDD(completedPhone.substring(0, 2))
        }
    }, [phones])

    useEffect(() => {
        if (cpf.length === 11) {
            if (!validateCPF(cpf)) {
                setErrorCPF("Digite um 'cpf' válido!")
            }
        } else {
            setErrorCPF("")
        }
    }, [cpf])

    useEffect(() => {
        if (rg.length === 10) {
            if (!validateRG(rg)) {
                setErrorRG("Digite um 'rg' válido!")
            }
        } else {
            setErrorRG("")
        }
    }, [rg])

    useEffect(() => {
        if (!errorRG && !errorCEP && !errorCPF) {
            setIsButton(false)
        } else {
            setIsButton(true)
        }
    }, [errorRG, errorCEP, errorCPF])

    return (
        <LayoutDefault>
            <div className="client-form-page">
                <form onSubmit={handleClient} className="client-form-page__form">
                    <Hero
                        isButtonPrymary={false}
                        title={title}
                        paragraph={paragraph}>
                        <div className="client-form-page__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="name"
                                    placeholder="ex: João"
                                    value={firsName}
                                    onChange={(ev) => setFirsName(ev.target.value)}
                                    label="NOME"
                                    id="name"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="lastName"
                                    placeholder="ex: Silva"
                                    value={lastName}
                                    onChange={(ev) => setLastName(ev.target.value)}
                                    label="SOBRENOME"
                                    id="lastName"
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="client-form-page__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="cpf"
                                    placeholder="ex: 00000000000"
                                    value={formatCPF(cpf)}
                                    onChange={(ev) => setCpf(ev.target.value)}
                                    label="CPF"
                                    id="cpf"
                                    required={true}
                                    messageErro={errorCPF}
                                    maxlength={14}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="rg"
                                    placeholder="ex: 0000000000"
                                    value={formatRg(rg)}
                                    onChange={(ev) => setRg(ev.target.value)}
                                    label="RG"
                                    id="rg"
                                    required={true}
                                    messageErro={errorRG}
                                    maxlength={13}
                                />
                            </div>
                        </div>
                        <div className="client-form-page__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="email"
                                    placeholder="ex: exaple@gmail.com"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    label="E-mail"
                                    type='email'
                                    id="email"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="whatsapp"
                                    placeholder="ex: 73912344567"
                                    value={formatNumberWhatsapp(phones)}
                                    onChange={(ev) => setPhones(ev.target.value)}
                                    label="WHATSAPP"
                                    id="whatsapp"
                                    required={true}
                                />
                            </div>
                        </div>
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
                    </Hero>
                    <div className="client-form-page__form__buttons">
                        <div>
                            <ButtonsTertiary onClick={() => goBack()}>
                                <MdCancel size={24} />
                                Cancelar
                            </ButtonsTertiary>
                        </div>
                        <div>
                            <ButtonsPrimary disabled={isButton}>
                                <MdPerson size={24} />
                                Salvar Cliente
                            </ButtonsPrimary>
                        </div>
                    </div>
                </form>
            </div>
        </LayoutDefault>
    );
}