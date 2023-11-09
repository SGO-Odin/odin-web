import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientFormTemplate from "../template";

export default function EditClientPage() {

    return <h1>Manutenção</h1>

    // const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    // const [firsName, setFirsName] = useState<string>("")
    // const [lastName, setLastName] = useState<string>("")
    // const [cpf, setCpf] = useState<string>("")
    // const [rg, setRg] = useState<string>("")
    // const [email, setEmail] = useState<string>("")
    // const [whatsapp, setWhatsapp] = useState<string>("")

    // // Endereço
    // const [zipCode, setZipCode] = useState<string>("")
    // const [acronym, setAcronym] = useState<string>("")
    // const [stateName, setStateName] = useState<string>("")
    // const [isFederalDistrict, setIsFederalDistrict] = useState<boolean>(false)
    // const [publicPlaceName, setPublicPlaceName] = useState<string>("")
    // const [publicPlaceType, setPublicPlaceType] = useState<string>("STREET")
    // const [district, setDistrict] = useState<string>("")
    // const [number, setNumber] = useState<string>("")
    // const [complement, setComplement] = useState<string>("")
    // const [reference, setReference] = useState<string>("")
    // const [city, setCity] = useState<string>("")

    // const router = useRouter()
    // const { id } = router.query

    // useEffect(() => {
    //     if (id) {
    //         axios.get('/api/client?id=' + id)
    //             .then(response => {
    //                 setFirsName(response.data.firsName)
    //                 setLastName(response.data.lastName)
    //                 setCpf(response.data.cpf)
    //                 setRg(response.data.rg)
    //                 setEmail(response.data.email)
    //                 setWhatsapp(response.data.whatsapp)

    //                 setAcronym(response.data.uf)
    //                 setStateName(response.data.stateName)
    //                 setIsFederalDistrict(response.data.isFederalDistrict)
    //                 setPublicPlaceName(response.data.street)
    //                 setPublicPlaceType(response.data.publicPlaceType)
    //                 setComplement(response.data.complement)
    //                 setReference(response.data.reference)
    //                 setDistrict(response.data.district)
    //                 setCity(response.data.city)
    //                 setNumber(response.data.number)
    //                 setZipCode(response.data.cep)
    //             })
    //     }
    // }, [id])

    // const handleUpdateClient = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     const data = { firsName, lastName, cpf, rg, email, whatsapp, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }
    //     // update
    //     await axios.put('/api/client', { ...data, id })

    //     goBack()
    // }

    // const goBack = () => {
    //     router.push('/cliente')
    // }

    // return (
    //     <ClientFormTemplate
    //         firsName={firsName}
    //         setFirsName={setFirsName}
    //         lastName={lastName}
    //         setLastName={setLastName}
    //         cpf={cpf}
    //         setCpf={setCpf}
    //         rg={rg}
    //         setRg={setRg}
    //         email={email}
    //         setEmail={setEmail}
    //         whatsapp={whatsapp}
    //         setWhatsapp={setWhatsapp}

    //         zipCode={zipCode}
    //         setZipCode={setZipCode}
    //         acronym={acronym}
    //         setAcronym={setAcronym}
    //         stateName={stateName}
    //         setStateName={setStateName}
    //         isFederalDistrict={isFederalDistrict}
    //         setIsFederalDistrict={setIsFederalDistrict}
    //         publicPlaceName={publicPlaceName}
    //         setPublicPlaceName={setPublicPlaceName}
    //         publicPlaceType={publicPlaceType}
    //         setPublicPlaceType={setPublicPlaceType}
    //         district={district}
    //         setDistrict={setDistrict}
    //         number={number}
    //         setNumber={setNumber}
    //         complement={complement}
    //         setComplement={setComplement}
    //         reference={reference}
    //         setReference={setReference}
    //         city={city}
    //         setCity={setCity}

    //         handleClient={handleUpdateClient}
    //         goBack={goBack}
    //         title={`Editar dados de ${firsName} ${lastName}`}
    //         paragraph={"Atualize detalhes de contato, preferências e mais para melhorar o atendimento."} />
    // );
}