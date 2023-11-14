import './clientTemplate.scss'
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import LayoutDefault from "@/src/components/layoutDefault";
import { Search } from "@/src/components/search";
import RowItem from '@/src/components/table/body/rowItem';
import Head from '@/src/components/table/head';
import { useRouter } from "next/navigation";
import { MdPerson, MdSearch } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatNumberWhatsapp } from '@/src/hook/format-number-whatsapp';
import { IClient } from '@/src/server/entities/client';
import { parseCookies } from 'nookies';


const columns = ["Id", "Nome", "Whatsapp", "E-mail", "CPF"];

export const ClientTemplate = () => {
    const { push } = useRouter();
    const [client, setClient] = useState<IClient[]>([])

    const { 'odinauth.token': token } = parseCookies()
    const _header = { headers: { "Authorization": `Bearer ${token}` } }

    useEffect(() => {
        axios.get('/api/client', _header)
            .then(response => {
                console.log(response.data.response)
                setClient(response.data.response)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }, [])

    const maskCPF = (cpf: string): string => {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length < 7) {
            throw new Error('CPF inválido.');
        }

        const cpfMascarado = cpf.replace(/^(\d{7})/, (_, grupo1) => '*'.repeat(grupo1.length));

        return `${cpfMascarado.slice(0, 3)}.${cpfMascarado.slice(3, 6)}.${cpfMascarado.slice(6, 9)}-${cpfMascarado.slice(9)}`;
    }

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
                        <Head columns={columns} isButton={false} />
                        <tbody className="body">
                            {!!client && client.map((item) => (
                                <tr key={item.id} className='body__row'>
                                    <RowItem label={item.id.toString()} isActive={null} />
                                    <RowItem label={`${item.firstName} ${item.lastName}`} isActive={null} />
                                    <RowItem label={formatNumberWhatsapp(`${item.phones[0]}`)} isActive={null} />
                                    <RowItem label={item.emails[0]} isActive={null} />
                                    <RowItem label={maskCPF(item.cpf)} isActive={null} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutDefault>
    );
}
