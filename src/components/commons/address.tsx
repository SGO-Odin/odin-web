import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextField } from "../textField";
import { numberValidation } from "@/src/hook/validation-number";
import axios from "axios";
import './address.scss'


interface IAddress {
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
}



export default function Address({
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
}: IAddress) {
    const [errorZipCode, setErrorZipCode] = useState<string>("")

    const formatCEP = (value: string): string => {
        if (!value) return null
        const formatingZipCode = value.replace(/\D/g, '');

        return formatingZipCode.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    useEffect(() => {
        if (zipCode && zipCode.length >= 8) {
            axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
                .then(res => {
                    if (res.data.erro) {
                        setErrorZipCode(`Forneça um CEP válido!`)
                    } else {
                        setErrorZipCode("")
                        setPublicPlaceName(res.data.logradouro)
                        setDistrict(res.data.bairro)
                        setCity(res.data.localidade)
                        setAcronym(res.data.uf)
                    }
                })
                .catch(error => {
                    console.log(`Error CEP (0001): ${error.toJSON()}`)
                })
        }
    }, [zipCode])

    useEffect(() => {
        if (acronym !== '') {
            setIsFederalDistrict(acronym === 'DF' ? true : false)
        }
    }, [acronym])

    return (
        <div className="container-address">
            <div className="rows">
                <div className="input">
                    <TextField
                        name="publicPlaceName"
                        placeholder="ex: Av. Roberto Dinamite"
                        value={publicPlaceName}
                        onChange={(ev) => setPublicPlaceName(ev.target.value)}
                        label="RUA:"
                        id="publicPlaceName"
                    />
                </div>
                <div className="input">
                    <TextField
                        name="district"
                        placeholder="ex: São Cristovão"
                        value={district}
                        onChange={(ev) => setDistrict(ev.target.value)}
                        label="BAIRRO"
                        id="district"
                    />
                </div>
            </div>
            <div className="rows">
                <div className="rows">
                    <div className="input">
                        <TextField
                            name="city"
                            placeholder="ex: Rio de Janeiro"
                            value={city}
                            onChange={(ev) => setCity(ev.target.value)}
                            label="CIDADE"
                            id="city"
                        />
                    </div>
                    <div className="input">
                        <TextField
                            name="uf"
                            placeholder="ex: RJ"
                            value={acronym}
                            onChange={(ev) => setAcronym(ev.target.value)}
                            label="UF"
                            id="uf"
                            maxlength={2}
                        />
                    </div>
                </div>
                <div className="rows">
                    <div className="input">
                        <TextField
                            name="number"
                            placeholder="ex: 10"
                            value={number}
                            onChange={(ev) => setNumber(numberValidation(ev.target.value, number))}
                            label="NÚMERO"
                            id="number"
                        />
                    </div>
                    <div className="input">
                        <TextField
                            name="cep"
                            placeholder="ex: 20921060"
                            value={formatCEP(zipCode)}
                            onChange={(ev) => setZipCode(ev.target.value)}
                            label="CEP"
                            id="cep"
                            maxlength={9}
                            messageErro={errorZipCode}
                        />
                    </div>
                </div>
            </div>
            <div className="rows">
                <div className="input">
                    <TextField
                        name="complement"
                        placeholder="Digite um complemento..."
                        value={complement}
                        onChange={(ev) => setComplement(ev.target.value)}
                        label="COMPLEMENTO"
                        id="complement"
                        maxlength={250}
                    />
                </div>
                <div className="input">
                    <TextField
                        name="reference"
                        placeholder="Digite uma referência..."
                        value={reference}
                        onChange={(ev) => setReference(ev.target.value)}
                        label="REFERÊNCIA:"
                        maxlength={250}
                        id="reference"
                    />
                </div>
            </div>
        </div>
    );
}
