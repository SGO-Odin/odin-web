import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientFormTemplate from "../template";
import { sanitalizePhones } from "@/src/hook/sanitalize-phones";

export default function EditClientPage() {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [cpf, setCpf] = useState<string>("")
    const [rg, setRg] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phones, setPhones] = useState<string>("")
    const [ddd, setDDD] = useState<string>("")

    // Endereço
    const [zipCode, setZipCode] = useState<string>("")
    const [acronym, setAcronym] = useState<string>("")
    const [stateName, setStateName] = useState<string>("")
    const [isFederalDistrict, setIsFederalDistrict] = useState<boolean>(false)
    const [publicPlaceName, setPublicPlaceName] = useState<string>("")
    const [publicPlaceType, setPublicPlaceType] = useState<string>("STREET")
    const [district, setDistrict] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [complement, setComplement] = useState<string>("")
    const [reference, setReference] = useState<string>("")
    const [city, setCity] = useState<string>("")

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            axios.get('/api/client?id=' + id)
                .then(response => {
                    console.log(response.data.response.address)
                    setFirstName(response.data.response.firstName)
                    setLastName(response.data.response.lastName)
                    setCpf(response.data.response.cpf)
                    setRg(response.data.response.rg)
                    setEmail(response.data.response.emails[0])
                    setPhones(response.data.response.phones[0])

                    setAcronym(response.data.response.uf)
                    setStateName(response.data.response.stateName)
                    setIsFederalDistrict(response.data.response.isFederalDistrict)
                    setPublicPlaceName(response.data.response.street)
                    setPublicPlaceType(response.data.response.publicPlaceType)
                    setComplement(response.data.response.complement)
                    setReference(response.data.response.reference)
                    setDistrict(response.data.response.district)
                    setCity(response.data.response.city)
                    setNumber(response.data.response.number)
                    setZipCode(response.data.response.genericZipCode)
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
        }
    }, [id])

    const handleUpdateClient = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const sanitalizePhone = sanitalizePhones(phones).substring(2)

        const data = { firstName, lastName, cpf, rg, email, sanitalizePhone, ddd, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }

        // update
        await axios.put('/api/client', { ...data, id })

        goBack()
    }

    const goBack = () => {
        router.push('/cliente')
    }

    return (
        <ClientFormTemplate
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            cpf={cpf}
            setCpf={setCpf}
            rg={rg}
            setRg={setRg}
            email={email}
            setEmail={setEmail}
            phones={phones}
            setPhones={setPhones}
            ddd={ddd}
            setDDD={setDDD}

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

            handleClient={handleUpdateClient}
            goBack={goBack}
            title={`Editar dados de ${firstName} ${lastName}`}
            paragraph={"Atualize detalhes de contato, preferências e mais para melhorar o atendimento."} />
    );
}