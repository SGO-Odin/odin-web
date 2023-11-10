import { ButtonsEdit } from '@/src/components/buttons/edit';
import './clientTemplate.scss'
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import LayoutDefault from "@/src/components/layoutDefault";
import { Search } from "@/src/components/search";
import RowItem from '@/src/components/table/body/rowItem';
import Head from '@/src/components/table/head';
import { useRouter } from "next/navigation";
import { MdDelete, MdOutlineEdit, MdPerson, MdSearch } from "react-icons/md";
import { ButtonsDelete } from '@/src/components/buttons/delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatNumberWhatsapp } from '@/src/hook/format-number-whatsapp';
import { IClient } from '@/src/server/entities/client';


const columns = ["Id", "Nome", "Whatsapp", "E-mail"];

export const ClientTemplate = () => {
    const { push } = useRouter();
    const [client, setClient] = useState<IClient[]>([])

    useEffect(() => {
        axios.get('/api/client')
            .then(response => {
                setClient(response.data.response)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }, [])

    const handlePushNewClient = () => {
        push("/cliente/cadastrar");
    };

    return (
        <LayoutDefault>
            <Hero
                isButtonPrymary={true}
                title="Consultar Cliente"
                paragraph={`Encontre e acesse informações dos clientes cadastrados, facilitando o atendimento e a gestão de relacionamentos.`}
                buttonIcon={<MdPerson size={24} />}
                buttonLabel="Cadastrar Cliente"
                onClick={handlePushNewClient}>
                <div className="client__filters">
                    <div>
                        <Search placeholder="ex: João" />
                    </div>
                    <div>
                        <ButtonsTertiary>
                            Buscar
                            <MdSearch size={24} />
                        </ButtonsTertiary>
                    </div>
                </div>
            </Hero>
            <div className="container-table">
                <div className="container-table__content">
                    <table className="table">
                        <Head columns={columns} isButton={true} />
                        <tbody className="body">
                            {!!client && client.map((item) => (
                                <tr key={item.id} className='body__row'>
                                    <RowItem label={item.id.toString()} isActive={null} />
                                    <RowItem label={`${item.firstName} ${item.lastName}`} isActive={null} />
                                    <RowItem label={formatNumberWhatsapp(`${item.phones[0]}`)} isActive={null} />
                                    <RowItem label={item.emails[0]} isActive={null} />
                                    <td className={'row buttons'}>
                                        {/* <div>
                                            <ButtonsEdit href={`/cliente/editar?id=${item.id}`}>
                                                <MdOutlineEdit size={24} />
                                            </ButtonsEdit>
                                        </div> */}
                                        <div>
                                            <ButtonsDelete href={`/cliente/deletar?id=${item.id}`}>
                                                Excluir
                                                <MdDelete size={24} />
                                            </ButtonsDelete>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutDefault>
    );
}
