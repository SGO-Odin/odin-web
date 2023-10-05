import './newClient.scss'
import { ButtonsPrimary } from '@/src/components/buttons/primary';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { Hero } from '@/src/components/hero';
import LayoutDefault from '@/src/components/layoutDefault';
import { TextField } from '@/src/components/textField';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { MdCancel, MdPerson } from 'react-icons/md';
import { Modal } from '@/src/components/modal';

export default function NewClient() {
    const { push } = useRouter();
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

    const handleNewClient = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`name ${name}`)
        console.log(`lastName ${lastName}`)
        console.log(`cpf ${cpf}`)
        console.log(`rg ${rg}`)
        console.log(`email ${email}`)
        console.log(`whatsapp ${whatsapp}`)
        console.log(`street ${street}`)
        console.log(`district ${district}`)
        console.log(`city ${city}`)
        console.log(`uf ${uf}`)
        console.log(`number ${number}`)
        console.log(`cep ${cep}`)

        // const data = { supplier, isActive }
        // create
        // await axios.post('#', data)

        setIsOpenModal(!isOpenModal)

        // reset
        setName("")
        setLastName("")
        setCpf("")
        setRg("")
        setEmail("")
        setWhatsapp("")
        setStreet("")
        setDistrict("")
        setCity("")
        setUf("")
        setNumber("")
        setCep("")

    }

    const goBack = () => {
        push('/cliente')
    }

    return (
        <LayoutDefault>
            <div className="new-client">
                <form onSubmit={handleNewClient} className="new-client__form">
                    <Hero
                        isButtonPrymary={false}
                        title="Cadastrar Cliente"
                        paragraph={`Registre informações importantes sobre os clientes, simplificando o gerenciamento e a personalização do atendimento.`}>
                        <div className="new-client__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="name"
                                    placeholder="ex: João"
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
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
                        <div className="new-client__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="cpf"
                                    placeholder="ex: 000.000.000-00"
                                    value={cpf}
                                    onChange={(ev) => setCpf(ev.target.value)}
                                    label="CPF"
                                    id="cpf"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="rg"
                                    placeholder="ex: 00.000.000-00"
                                    value={rg}
                                    onChange={(ev) => setRg(ev.target.value)}
                                    label="RG"
                                    id="rg"
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="new-client__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="email"
                                    placeholder="ex: exaple@gmail.com"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    label="E-mail"
                                    id="email"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="whatsapp"
                                    placeholder="ex: +55 (73) 9 1234-4567"
                                    value={whatsapp}
                                    onChange={(ev) => setWhatsapp(ev.target.value)}
                                    label="WHATSAPP"
                                    id="whatsapp"
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="new-client__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="street"
                                    placeholder="ex: Av. Roberto Dinamite"
                                    value={street}
                                    onChange={(ev) => setStreet(ev.target.value)}
                                    label="RUA"
                                    id="street"
                                    required={true}
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
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="new-client__form__content__inputs">
                            <div className="new-client__form__content__inputs">
                                <div className="input">
                                    <TextField
                                        name="city"
                                        placeholder="ex: Rio de Janeiro"
                                        value={city}
                                        onChange={(ev) => setCity(ev.target.value)}
                                        label="CIDADE"
                                        id="city"
                                        required={true}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="uf"
                                        placeholder="ex: RJ"
                                        value={uf}
                                        onChange={(ev) => setUf(ev.target.value)}
                                        label="UF"
                                        id="uf"
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="new-client__form__content__inputs">
                                <div className="input">
                                    <TextField
                                        name="number"
                                        placeholder="ex: 10"
                                        value={number}
                                        onChange={(ev) => setNumber(ev.target.value)}
                                        label="NÚMERO"
                                        id="number"
                                        required={true}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="cep"
                                        placeholder="ex: 20921-060"
                                        value={cep}
                                        onChange={(ev) => setCep(ev.target.value)}
                                        label="CEP"
                                        id="cep"
                                        required={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </Hero>
                    <div className="new-client__form__buttons">
                        <div>
                            <ButtonsTertiary onClick={() => goBack()}>
                                <MdCancel size={24} />
                                Cancelar
                            </ButtonsTertiary>
                        </div>
                        <div>
                            <ButtonsPrimary>
                                <MdPerson size={24} />
                                Salvar Fornecedor
                            </ButtonsPrimary>
                        </div>
                    </div>
                </form>
            </div>
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} title={`O Cliente ${name} ${lastName}`} paragraph={`${name} ${lastName} foi salvo com sucesso! clique em 'Criar OS' para iniciar uma nova Ordem de Serviço para esse cliente ou em 'Consultar Cliente' para voltar a tela de consulta de cliente.`}>
                <ButtonsTertiary onClick={() => goBack()}>Consultar Cliente</ButtonsTertiary>
                <ButtonsPrimary>Criar OS</ButtonsPrimary>
            </Modal>
        </LayoutDefault>
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
        props: {

        }
    }
}