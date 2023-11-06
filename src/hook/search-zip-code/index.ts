import axios from "axios"
import { Dispatch, SetStateAction } from "react"

interface ISearchZipCode {
    cep: string
    setErrorCEP: Dispatch<SetStateAction<string>>
    setStreet: Dispatch<SetStateAction<string>>
    setDistrict: Dispatch<SetStateAction<string>>
    setCity: Dispatch<SetStateAction<string>>
    setUf: Dispatch<SetStateAction<string>>

}

export const searchZipCode = ({ cep, setErrorCEP, setStreet, setDistrict, setCity, setUf }: ISearchZipCode): void => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            if (res.data.erro) {
                setErrorCEP(`Forneça um CEP válido!`)
            } else {
                setErrorCEP("")
                setStreet(res.data.logradouro)
                setDistrict(res.data.bairro)
                setCity(res.data.localidade)
                setUf(res.data.uf)
            }
        })
        .catch(error => {
            console.log(`Error CEP (0001): ${error.toJSON()}`)
        })
}