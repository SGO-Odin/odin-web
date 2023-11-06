import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientFormTemplate from "../template";

export default function EditClientPage() {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [cpf, setCpf] = useState<string>("")
    const [rg, setRg] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [whatsapp, setWhatsapp] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [uf, setUf] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [cep, setCep] = useState<string>("")

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/client?id=' + id)
            .then(response => {
                setName(response.data.name)
                setLastName(response.data.lastName)
                setCpf(response.data.cpf)
                setRg(response.data.rg)
                setEmail(response.data.email)
                setWhatsapp(response.data.whatsapp)
                setStreet(response.data.street)
                setDistrict(response.data.district)
                setCity(response.data.city)
                setUf(response.data.uf)
                setNumber(response.data.number)
                setCep(response.data.cep)
            })
    }, [id])

    const handleUpdateClient = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { name, lastName, cpf, rg, email, whatsapp, street, district, city, uf, number, cep }
        // update
        await axios.put('/api/client', { ...data, id })

        goBack()
    }

    const goBack = () => {
        router.push('/cliente')
    }

    return (
        <ClientFormTemplate
            name={name}
            setName={setName}
            lastName={lastName}
            setLastName={setLastName}
            cpf={cpf}
            setCpf={setCpf}
            rg={rg}
            setRg={setRg}
            email={email}
            setEmail={setEmail}
            whatsapp={whatsapp}
            setWhatsapp={setWhatsapp}
            street={street}
            setStreet={setStreet}
            district={district}
            setDistrict={setDistrict}
            city={city}
            setCity={setCity}
            uf={uf}
            setUf={setUf}
            number={number}
            setNumber={setNumber}
            cep={cep}
            setCep={setCep}
            handleClient={handleUpdateClient}
            goBack={goBack}
            title={`Editar dados de ${name} ${lastName}`}
            paragraph={"Atualize detalhes de contato, preferências e mais para melhorar o atendimento."} />
    );
}