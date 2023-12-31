import { GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import ClientFormTemplate from './template';
import axios from 'axios';
import { Modal } from '@/src/components/modal';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { ButtonsPrimary } from '@/src/components/buttons/primary';
import { sanitalizePhones } from '@/src/hook/sanitalize-phones';

export default function NewClient() {
    const { push } = useRouter();
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



    const handleNewClient = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const sanitalizePhone = sanitalizePhones(phones).substring(2)

        const data = { firstName, lastName, cpf, rg, email, sanitalizePhone, ddd, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }

        // // create
        axios.post('/api/client', data)
            .then(res => {
                if (res.status == 201) setIsOpenModal(!isOpenModal)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    const goBack = () => {
        push('/cliente')
    }

    if (isOpenModal) {
        return (
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} title={`O Cliente ${name} ${lastName}`} paragraph={`${name} ${lastName} foi salvo com sucesso! clique em 'Criar OS' para iniciar uma nova Ordem de Serviço para esse cliente ou em 'Consultar Cliente' para voltar a tela de consulta de cliente.`}>
                <ButtonsTertiary onClick={() => goBack()}>Consultar Cliente</ButtonsTertiary>
                <ButtonsPrimary>Criar OS</ButtonsPrimary>
            </Modal>
        )
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

            handleClient={handleNewClient}
            goBack={goBack}
            title={"Cadastrar Cliente"}
            paragraph={"Registre informações importantes sobre os clientes, simplificando o gerenciamento e a personalização do atendimento."} />
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "odinauth.token": token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {}
    }
}